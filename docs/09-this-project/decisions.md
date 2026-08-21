# Quyết định kỹ thuật

Ghi lại lựa chọn và phương án đã loại. Thêm mục mới ở **trên cùng**.

---

## 2026-08-20 — Bỏ webpack, build API bằng SWC

**Chọn:** `@nx/js:swc` + [apps/api/.swcrc](../../apps/api/.swcrc).

**Loại:**

- _webpack_ — chậm, cấu hình nặng, và ở đây không cần bundle: API chạy trên
  server, `node_modules` vẫn nằm cạnh nó.
- _esbuild_ — nhanh nhất nhưng **không emit `decoratorMetadata`**. Không có
  metadata thì NestJS mất khả năng suy ra kiểu tham số constructor, DI gãy. Đây
  là yếu tố quyết định.

**Hệ quả:** build API còn khoảng 200ms. Bốn package webpack đã gỡ khỏi
`package.json`.

**Bẫy đã dính:** `@nx/js:node` (target `serve`) không hiểu option
`stripLeadingPaths` — nó luôn tìm `dist/src/main.js`. Đã bỏ option đó, entry
thật là `apps/api/dist/src/main.js`, và `CMD` trong Dockerfile khớp theo.

---

## 2026-08-20 — Jest → Vitest

**Chọn:** Vitest 3, mỗi project một `vite.config.mts`.

**Lý do:** dùng chung transform pipeline với Vite, chạy nhanh hơn, config gọn
hơn, ESM không phải vật lộn.

**Bẫy đã dính:**

- Nx 23 **không** còn tạo target `test` từ `@nx/vite/plugin`. Vitest đã tách
  sang package riêng — plugin đúng là `"@nx/vitest"` trong
  [nx.json](../../nx.json), executor là `@nx/vitest:test`.
- Spec của Nest cần `unplugin-swc`, cùng lý do decorator metadata ở trên.
- `vite-tsconfig-paths` chết khi gặp `apps/api/dist/workspace_modules/...` vì
  không resolve nổi `extends` từ cây dist đã copy. Đã bỏ hẳn, thay bằng
  `resolve.alias` cho `@`.

---

## 2026-08-20 — API chuyển sang port 3333

**Lý do:** scaffold ban đầu để cả web và api ở 3000, chạy `npm run dev` là đụng
nhau ngay. Next giữ 3000 (mặc định, quen thuộc hơn), API dời sang 3333.

Đã cập nhật đồng bộ: `main.ts`, support file của api-e2e, `.env.example`,
Dockerfile, docker-compose, README.

---

## 2026-08-20 — Web gọi API qua rewrite, không gọi cross-origin

**Chọn:** `/backend/*` → `${API_URL}/api/*` trong
[apps/web/next.config.js](../../apps/web/next.config.js).

**Lý do:** client gọi cùng origin nên khỏi CORS, khỏi lộ URL nội bộ của API ra
trình duyệt. `/api/*` vẫn để dành cho route handler của chính Next.

**Bẫy:** Next resolve rewrite lúc **build**, không phải lúc chạy — nên `API_URL`
phải có mặt khi build. Trong Docker nó là build arg.

---

## 2026-08-20 — Libs emit JS thật, không phải source-only

**Chọn:** `emitDeclarationOnly: false`, `module: nodenext`, xuất ra `dist`.

**Lý do:** API build bằng SWC ở chế độ transpile-only, **không** bundle lib vào.
Lúc chạy Node sẽ đi tìm `dist/index.js` thật — nếu lib chỉ có source thì gãy.

Điều kiện export `@platform/source` vẫn giữ để TypeScript và IDE nhảy thẳng vào
source, nên vừa có DX tốt vừa chạy được ở runtime.
