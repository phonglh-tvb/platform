# 03 — Node.js & npm

Phần này quyết định `import '@platform/shared-types'` thực sự trỏ vào file nào.
Học kỹ thì đỡ được rất nhiều giờ debug "Cannot find module".

## Mục lục

_(chưa có file nào)_

## Checklist

### Runtime

- [ ] Event loop của Node và các phase, khác gì event loop trình duyệt
- [ ] `process.env`, `process.argv`, exit code
- [ ] Stream, buffer (đọc lướt cũng được)

### Module resolution

- [ ] Thuật toán resolve của Node: đi ngược lên `node_modules`
- [ ] `"type": "module"` trong package.json đổi cách hiểu file `.js`
- [ ] `.mjs` / `.cjs` — vì sao config trong repo này là `vite.config.mts`
- [ ] Trường `exports` map, `main`, `types`
- [ ] **Conditional exports** và custom condition — repo dùng
      `@platform/source` để IDE nhảy thẳng vào source thay vì `dist`

### npm

- [ ] `dependencies` vs `devDependencies` vs `peerDependencies`
- [ ] Semver: `^` `~` và cái gì được nâng khi `npm install`
- [ ] `package-lock.json` để làm gì, vì sao CI phải dùng `npm ci`
- [ ] **npm workspaces**: nhiều package trong một repo, symlink vào
      `node_modules`
- [ ] `npm audit`, install script và rủi ro của chúng

## Xem trong repo

| Khái niệm                    | File                                                                   |
| ---------------------------- | ---------------------------------------------------------------------- |
| Khai báo workspaces          | [package.json](../../package.json)                                     |
| `exports` + custom condition | [libs/shared-types/package.json](../../libs/shared-types/package.json) |
| Lib phụ thuộc app            | [apps/api/package.json](../../apps/api/package.json)                   |
| Đọc env                      | [apps/api/src/app/app.module.ts](../../apps/api/src/app/app.module.ts) |
| Env mẫu                      | [.env.example](../../.env.example)                                     |

Thí nghiệm đáng làm: chạy `ls -la node_modules/@platform` — sẽ thấy symlink trỏ
ngược về `libs/`. Đó là toàn bộ "phép màu" của npm workspaces.
