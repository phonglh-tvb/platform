# 08 — Docker & CI/CD

## Mục lục

_(chưa có file nào)_

## Checklist

### Docker

- [ ] Image vs container vs layer
- [ ] Mỗi lệnh `Dockerfile` tạo một layer — thứ tự quyết định cache hit
- [ ] Vì sao `COPY package.json pnpm-lock.yaml` rồi `pnpm install` **trước** khi copy source
- [ ] **Multi-stage build**: builder có toàn bộ toolchain, runner thì không
- [ ] `.dockerignore` — không có nó thì `node_modules` local chui vào image
- [ ] `USER node`: đừng chạy bằng root
- [ ] `ARG` (build time) vs `ENV` (runtime) — nhầm chỗ này là hỏng
- [ ] Healthcheck, và `depends_on: condition: service_healthy`
- [ ] Network trong compose: service gọi nhau bằng tên (`http://api:3333`)

### GitHub Actions

- [ ] Workflow / job / step / action
- [ ] Trigger: `push`, `pull_request`
- [ ] `fetch-depth: 0` — Nx affected cần lịch sử git
- [ ] Cache dependency
- [ ] Matrix build
- [ ] Upload artifact khi fail

## Xem trong repo

| Khái niệm             | File                                                       |
| --------------------- | ---------------------------------------------------------- |
| Multi-stage + prune   | [apps/api/Dockerfile](../../apps/api/Dockerfile)           |
| Next standalone       | [apps/web/Dockerfile](../../apps/web/Dockerfile)           |
| Compose + healthcheck | [docker-compose.yml](../../docker-compose.yml)             |
| CI                    | [.github/workflows/ci.yml](../../.github/workflows/ci.yml) |
| Loại trừ              | [.dockerignore](../../.dockerignore)                       |

Chỗ đáng đọc kỹ nhất là `apps/api/Dockerfile`: nó chạy `nx prune @platform/api`
để sinh ra một `pnpm-lock.yaml` rút gọn cùng thư mục `workspace_modules`,
nhờ đó stage runner chỉ `pnpm install --prod` đúng những dependency API cần — không kéo theo
Nx, TypeScript hay React.

Lưu ý: image chưa từng được build thử trên máy này.
