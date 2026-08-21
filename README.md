# Platform

Nx monorepo: một Next.js app, một NestJS API, và các thư viện dùng chung.

| Project                  | Path                | Mô tả                                    |
| ------------------------ | ------------------- | ---------------------------------------- |
| `@platform/web`          | `apps/web`          | Next.js 16 (App Router), port **3000**   |
| `@platform/api`          | `apps/api`          | NestJS 11, build bằng SWC, port **3333** |
| `@platform/shared-types` | `libs/shared-types` | Contract dùng chung giữa web và api      |
| `@platform/ui`           | `libs/ui`           | React component dùng chung               |
| `@platform/web-e2e`      | `apps/web-e2e`      | Playwright                               |
| `@platform/api-e2e`      | `apps/api-e2e`      | Vitest chạy với API thật                 |

Tooling: **SWC** để build API (không dùng webpack), **Vitest** cho unit test,
**Playwright** cho e2e của web, ESLint + Prettier, TypeScript project references.

Ghi chú học tập và lý do đằng sau các quyết định kỹ thuật nằm ở [docs/](docs/).

## Bắt đầu

```sh
npm install
cp .env.example .env
npm run dev          # chạy song song web (3000) + api (3333)
```

Riêng lẻ: `npm run dev:web`, `npm run dev:api`.

## Scripts

| Script              | Việc nó làm                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server cho cả web và api                   |
| `npm run build`     | Build tất cả project                           |
| `npm test`          | Vitest cho mọi project                         |
| `npm run e2e`       | Playwright (web) + Vitest e2e (api)            |
| `npm run lint`      | ESLint                                         |
| `npm run typecheck` | `tsc --build` theo project references          |
| `npm run affected`  | Chỉ chạy lint/test/build cho phần bị ảnh hưởng |
| `npm run format`    | Prettier                                       |
| `npm run graph`     | Mở project graph                               |
| `npm run docker:up` | `docker compose up --build`                    |

## Git hooks & quy ước commit

Husky cài hook tự động khi `npm install` (qua script `prepare`).

| Hook         | Chạy gì                                                      |
| ------------ | ------------------------------------------------------------ |
| `pre-commit` | `lint-staged` — eslint `--fix` + prettier trên file đã stage |
| `commit-msg` | `commitlint` — kiểm tra định dạng message                    |
| `pre-push`   | `nx affected -t lint typecheck test` so với nhánh upstream   |

Message theo [Conventional Commits](https://www.conventionalcommits.org/), và
**scope là bắt buộc**:

```text
feat(web): thêm trang login
fix(api): sửa lỗi proxy khi API_URL có dấu /
chore(deps): nâng nx lên 23.2
```

Scope hợp lệ = tên thư mục trong `apps/` và `libs/` (`web`, `api`, `ui`,
`shared-types`, `web-e2e`, `api-e2e`), cộng thêm `repo`, `deps`, `ci`, `docs`,
`docker`. Danh sách này đọc từ filesystem trong
[commitlint.config.mjs](commitlint.config.mjs) nên thêm project mới là tự có
scope mới, không phải sửa tay.

Muốn bỏ bắt buộc scope thì xoá rule `scope-empty` trong file đó.

Bỏ qua hook khi thật sự cần: `git commit --no-verify`. Nhưng CI vẫn kiểm lại
commit message trên pull request, nên đừng dựa vào nó.

## Web gọi API như thế nào

`apps/web/next.config.js` rewrite `/backend/*` sang `${API_URL}/api/*`. Phía
client cứ gọi cùng origin — không cần CORS:

```ts
import type { MessageResponse } from '@platform/shared-types';

const res = await fetch('/backend'); // → http://localhost:3333/api
const data: MessageResponse = await res.json();
```

`/api/*` vẫn dành cho route handler của chính Next (xem
`apps/web/src/app/api/hello/route.ts`).

Lưu ý: Next resolve rewrite lúc **build**, nên `API_URL` phải có mặt khi build —
trong Docker nó là build arg.

## Thư viện dùng chung

Libs là npm workspace package, được import theo tên (`@platform/shared-types`),
không phải theo path alias. Thêm lib mới:

```sh
npx nx g @nx/js:lib libs/my-lib --name=@platform/my-lib
```

Rồi khai báo nó vào `dependencies` của app nào cần. Nx tự lo thứ tự build qua
`dependsOn: ["^build"]` trong `nx.json`.

## Docker

```sh
docker compose up --build     # web :3000, api :3333
```

- `apps/api/Dockerfile` dùng `nx prune` để chỉ đưa dependency thật sự cần vào
  image runtime (kèm các workspace lib đã build).
- `apps/web/Dockerfile` dùng Next `output: 'standalone'`.

## CI

`.github/workflows/ci.yml` chạy `nx affected -t lint typecheck test build` rồi
e2e, sau đó build thử hai Docker image trên push vào `main`/`master`.

Muốn có remote cache và task distribution thì chạy `npx nx connect`.

## Vài lệnh Nx hay dùng

```sh
npx nx show project @platform/api --web   # xem mọi target của một project
npx nx graph                              # đồ thị phụ thuộc
npx nx reset                              # xoá cache khi nghi ngờ stale
```
