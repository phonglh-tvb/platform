# 06 — Nx & build tooling

## Mục lục

_(chưa có file nào)_

## Checklist

### Nx

- [ ] Monorepo giải quyết vấn đề gì, đánh đổi ra sao
- [ ] Project graph — `pnpm graph`
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
- [ ] Rule ở mức `warn` **không** làm eslint exit khác 0 — hệ quả với hook
- [ ] Prettier, và ranh giới với ESLint
- [ ] `nx format:check` trong CI

### Git hooks

- [ ] Các hook của git: `pre-commit`, `commit-msg`, `pre-push`
- [ ] husky làm gì (nó chỉ set `core.hooksPath`, xem `git config core.hooksPath`)
- [ ] lint-staged: chỉ chạy trên file đã stage, tự stash phần chưa stage
- [ ] Conventional Commits: `type(scope): subject`
- [ ] commitlint và `scope-enum` / `scope-empty`
- [ ] Vì sao vẫn phải kiểm lại ở CI dù đã có hook (`--no-verify`)

## Xem trong repo

| Khái niệm               | File                                                 |
| ----------------------- | ---------------------------------------------------- |
| Plugin + targetDefaults | [nx.json](../../nx.json)                             |
| Target tự viết (SWC)    | [apps/api/package.json](../../apps/api/package.json) |
| Cấu hình SWC            | [apps/api/.swcrc](../../apps/api/.swcrc)             |
| ESLint gốc              | [eslint.config.mjs](../../eslint.config.mjs)         |
| Prettier                | [.prettierrc](../../.prettierrc)                     |
| Scope suy ra từ thư mục | [commitlint.config.mjs](../../commitlint.config.mjs) |
| Task pre-commit         | [.lintstagedrc.json](../../.lintstagedrc.json)       |
| Hook so với upstream    | [.husky/pre-push](../../.husky/pre-push)             |

Lệnh hay dùng khi mò:

```sh
pnpm nx show project @platform/api --web   # target nào ở đâu ra
pnpm nx graph                              # đồ thị phụ thuộc
pnpm nx reset                              # nghi cache stale
pnpm nx run-many -t build --verbose
```
