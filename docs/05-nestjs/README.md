# 05 — NestJS

Nest chỉ thực sự "vào đầu" sau khi hiểu decorator và `reflect-metadata` ở
[02-typescript](../02-typescript/). Nếu thấy DI như phép thuật thì quay lại đó.

## Mục lục

_(chưa có file nào)_

## Checklist

### Cốt lõi

- [ ] Module, `@Module({ imports, controllers, providers, exports })`
- [ ] Controller và routing decorator (`@Get` `@Post` `@Param` `@Body`)
- [ ] Provider & **Dependency Injection**: Nest đọc kiểu tham số constructor từ
      metadata do compiler emit ra
- [ ] Injection scope (default là singleton)
- [ ] Custom provider: `useClass`, `useValue`, `useFactory`, injection token
- [ ] `ConfigModule` và `isGlobal`

### Vòng đời request

- [ ] Middleware → Guard → Interceptor → Pipe → Controller → Exception filter
- [ ] Validation pipe + `class-validator` / DTO
- [ ] Exception filter, HTTP exception chuẩn

### Vận hành

- [ ] `setGlobalPrefix`, versioning
- [ ] CORS: khi nào cần, khi nào proxy là đủ
- [ ] Health check
- [ ] Testing module (`Test.createTestingModule`), mock provider

## Xem trong repo

| Khái niệm               | File                                                                           |
| ----------------------- | ------------------------------------------------------------------------------ |
| Bootstrap, prefix, CORS | [apps/api/src/main.ts](../../apps/api/src/main.ts)                             |
| Module gốc + config     | [apps/api/src/app/app.module.ts](../../apps/api/src/app/app.module.ts)         |
| Controller + health     | [apps/api/src/app/app.controller.ts](../../apps/api/src/app/app.controller.ts) |
| Provider                | [apps/api/src/app/app.service.ts](../../apps/api/src/app/app.service.ts)       |

Ghi chú: API chạy ở port **3333** chứ không phải 3000 (3000 đã là của Next).
Toàn bộ route nằm sau prefix `api` lấy từ `@platform/shared-types` — cả web lẫn
api dùng chung một hằng số nên không lệch nhau được.
