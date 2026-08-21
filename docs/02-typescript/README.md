# 02 — TypeScript

## Mục lục

_(chưa có file nào)_

## Checklist

### Type system

- [ ] Structural typing — TS so sánh hình dạng, không so sánh tên
- [ ] `interface` vs `type`, khi nào chọn cái nào
- [ ] Union, intersection, literal type, discriminated union
- [ ] `unknown` vs `any` vs `never`
- [ ] Type narrowing: `typeof`, `in`, `instanceof`, type predicate `x is Y`
- [ ] `as const` và readonly

### Generic

- [ ] Generic function / interface / class
- [ ] `extends` để ràng buộc, `keyof`, `typeof`
- [ ] Conditional type, `infer`
- [ ] Mapped type
- [ ] Utility type: `Partial` `Pick` `Omit` `Record` `Awaited` `ReturnType`

### Decorator & metadata

- [ ] Decorator làm gì ở mức JS (nó chỉ là hàm nhận target)
- [ ] `experimentalDecorators` — decorator "legacy" mà NestJS dùng
- [ ] `emitDecoratorMetadata` + `reflect-metadata`: compiler nhét kiểu vào
      runtime để DI đọc được. **Đây là lý do repo không dùng esbuild.**
- [ ] Decorator chuẩn ES2022 khác gì bản legacy

### tsconfig

- [ ] `target` / `module` / `moduleResolution` — bộ ba hay gây lỗi nhất
- [ ] `strict` mở ra những cờ con nào
- [ ] `paths` vs workspaces: hai cách khác nhau để import theo tên
- [ ] `types`, và vì sao thiếu `["node"]` là mất `process`
- [ ] Project references, `composite`, `tsc --build`

## Xem trong repo

| Khái niệm                      | File                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| Config gốc, `customConditions` | [tsconfig.base.json](../../tsconfig.base.json)                                                 |
| Project references             | [tsconfig.json](../../tsconfig.json)                                                           |
| Decorator metadata             | [apps/api/.swcrc](../../apps/api/.swcrc)                                                       |
| Decorator thực tế              | [apps/api/src/app/app.controller.ts](../../apps/api/src/app/app.controller.ts)                 |
| Interface dùng chung           | [libs/shared-types/src/lib/api-contracts.ts](../../libs/shared-types/src/lib/api-contracts.ts) |
| `types: ["node"]`              | [apps/web-e2e/tsconfig.json](../../apps/web-e2e/tsconfig.json)                                 |

Bài tập tốt: sửa `MessageResponse` trong `shared-types` rồi chạy
`pnpm typecheck` — xem TS bắt lỗi ở cả web lẫn api như thế nào. Đó là toàn bộ
giá trị của việc để contract vào lib chung.
