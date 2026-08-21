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

### Package manager

- [ ] `dependencies` vs `devDependencies` vs `peerDependencies`
- [ ] Semver: `^` `~` và cái gì được nâng khi cài lại
- [ ] Lockfile để làm gì, vì sao CI phải dùng `--frozen-lockfile`
- [ ] **Workspaces**: nhiều package trong một repo, link vào `node_modules`
- [ ] Giao thức `workspace:*` — khác gì với ghi số phiên bản
- [ ] `packageManager` + corepack: ghim version cho cả team và CI

### pnpm và chuỗi cung ứng

- [ ] `node_modules` phẳng (npm) vs symlink + content store (pnpm)
- [ ] **Phantom dependency**: import package không khai báo mà vẫn chạy
- [ ] `minimumReleaseAge` — khoảng chờ trước khi cho cài bản mới
- [ ] `allowBuilds` / `strictDepBuilds` — install script không còn chạy tự do
- [ ] `blockExoticSubdeps` — chặn dep kéo từ git/tarball
- [ ] Vụ Shai-Hulud và vì sao khoảng chờ 24h lại hiệu quả đến vậy

## Xem trong repo

| Khái niệm                     | File                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- |
| Workspaces + cấu hình bảo mật | [pnpm-workspace.yaml](../../pnpm-workspace.yaml)                       |
| Ghim version pnpm             | [package.json](../../package.json)                                     |
| `exports` + custom condition  | [libs/shared-types/package.json](../../libs/shared-types/package.json) |
| `workspace:*`                 | [apps/web/package.json](../../apps/web/package.json)                   |
| Đọc env                       | [apps/api/src/app/app.module.ts](../../apps/api/src/app/app.module.ts) |
| Env mẫu                       | [.env.example](../../.env.example)                                     |

Hai thí nghiệm đáng làm:

```sh
ls -la apps/web/node_modules/@platform   # symlink trỏ ngược về libs/
ls apps/api/node_modules                 # chỉ thấy dep api khai báo, không có next/react
```

Cái thứ hai chính là điểm khác biệt lớn nhất so với npm. Với npm hoisting phẳng,
`apps/api` nhìn thấy toàn bộ dependency của cả monorepo, nên `import 'next'`
trong code API vẫn chạy trên máy — rồi vỡ lúc đóng Docker. Xem
[decisions.md](../09-this-project/decisions.md) để biết bug thật kiểu này đã xảy
ra trong repo.
