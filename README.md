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

Package manager là **pnpm**, phiên bản ghim trong `packageManager` của
`package.json`. Bật corepack một lần là xong, không cần cài pnpm thủ công:

```sh
corepack enable
pnpm install
cp .env.example .env
pnpm dev          # chạy song song web (3000) + api (3333)
```

Riêng lẻ: `pnpm dev:web`, `pnpm dev:api`.

### Vì sao pnpm

Ngoài chuyện nhanh và nhẹ đĩa, [pnpm-workspace.yaml](pnpm-workspace.yaml) bật ba
lớp phòng thủ mà npm CLI không có:

| Cấu hình             | Tác dụng                                                  |
| -------------------- | --------------------------------------------------------- |
| `minimumReleaseAge`  | Package phải publish đủ 24h mới cho cài                   |
| `strictDepBuilds`    | Install **fail** nếu có install script chưa được duyệt    |
| `blockExoticSubdeps` | Chặn transitive dep kéo code từ git repo hoặc tarball URL |

Thêm nữa, `node_modules` của pnpm dựng bằng symlink nên mỗi project chỉ thấy
đúng dependency nó khai báo. Với npm hoisting phẳng, code có thể `import` một
package không hề khai báo và vẫn chạy trên máy — rồi vỡ khi đóng gói.

Cần cài gấp một bản vừa phát hành (bỏ qua khoảng chờ 24h):

```sh
pnpm add <pkg> --config.minimumReleaseAge=0
```

Dependency mới cần chạy install script thì `pnpm install` sẽ fail kèm hướng dẫn;
duyệt bằng `pnpm approve-builds` rồi đọc lại diff của `pnpm-workspace.yaml`
trước khi commit.

## Scripts

| Script           | Việc nó làm                                    |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Dev server cho cả web và api                   |
| `pnpm build`     | Build tất cả project                           |
| `pnpm test`      | Vitest cho mọi project                         |
| `pnpm e2e`       | Playwright (web) + Vitest e2e (api)            |
| `pnpm lint`      | ESLint                                         |
| `pnpm typecheck` | `tsc --build` theo project references          |
| `pnpm affected`  | Chỉ chạy lint/test/build cho phần bị ảnh hưởng |
| `pnpm format`    | Prettier                                       |
| `pnpm graph`     | Mở project graph                               |
| `pnpm docker:up` | `docker compose up --build`                    |

## Git hooks & quy ước commit

Husky cài hook tự động khi `pnpm install` (qua script `prepare`).

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

Libs là pnpm workspace package, được import theo tên (`@platform/shared-types`),
không phải theo path alias. Thêm lib mới:

```sh
pnpm nx g @nx/js:lib libs/my-lib --name=@platform/my-lib
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

Muốn có remote cache và task distribution thì chạy `pnpm nx connect`.

## Vài lệnh Nx hay dùng

```sh
pnpm nx show project @platform/api --web   # xem mọi target của một project
pnpm nx graph                              # đồ thị phụ thuộc
pnpm nx reset                              # xoá cache khi nghi ngờ stale
```
