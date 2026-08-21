# 06 — Nx & build tooling

## Mục lục

_(chưa có file nào)_

## Checklist

### Nx

- [ ] Monorepo giải quyết vấn đề gì, đánh đổi ra sao
- [ ] Project graph — `npm run graph`
- [ ] Target, executor, configuration
- [ ] **Inferred target**: plugin trong `nx.json` tự sinh target, không cần khai
      báo tay. Xem bằng `nx show project <tên> --web`
- [ ] `targetDefaults` và `dependsOn: ["^build"]` (`^` = dependency của tôi)
- [ ] Cache: `inputs` / `outputs` / named input `production`
- [ ] `nx affected` + `nx-set-shas` trong CI
- [ ] TS-solution setup: project references + workspaces thay cho `paths`
- [ ] Generator: `nx g @nx/js:lib ...`

### Compiler / bundler

- [ ] `tsc` chậm nhưng là nguồn chân lý về type
- [ ] **SWC** — viết bằng Rust, có `decoratorMetadata`
- [ ] **esbuild** — nhanh nhất, **không** emit decorator metadata
- [ ] **Vite** — dev server dùng ESM native, build bằng Rollup
- [ ] webpack — vì sao repo này bỏ (xem [09-this-project/decisions.md](../09-this-project/decisions.md))
- [ ] Bundle vs transpile-only: khác biệt và hệ quả lúc deploy

### Chất lượng code

- [ ] ESLint flat config (`eslint.config.mjs`)
- [ ] Prettier, và ranh giới với ESLint
- [ ] `nx format:check` trong CI

## Xem trong repo

| Khái niệm               | File                                                 |
| ----------------------- | ---------------------------------------------------- |
| Plugin + targetDefaults | [nx.json](../../nx.json)                             |
| Target tự viết (SWC)    | [apps/api/package.json](../../apps/api/package.json) |
| Cấu hình SWC            | [apps/api/.swcrc](../../apps/api/.swcrc)             |
| ESLint gốc              | [eslint.config.mjs](../../eslint.config.mjs)         |
| Prettier                | [.prettierrc](../../.prettierrc)                     |

Lệnh hay dùng khi mò:

```sh
npx nx show project @platform/api --web   # target nào ở đâu ra
npx nx graph                              # đồ thị phụ thuộc
npx nx reset                              # nghi cache stale
npx nx run-many -t build --verbose
```
