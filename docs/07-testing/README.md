# 07 — Testing

## Mục lục

_(chưa có file nào)_

## Checklist

### Nền tảng

- [ ] Kim tự tháp test: unit / integration / e2e, tỉ lệ hợp lý
- [ ] AAA (Arrange–Act–Assert)
- [ ] Test double: stub / mock / spy / fake khác nhau chỗ nào
- [ ] Thế nào là một test giòn (brittle) — và cách tránh

### Vitest

- [ ] `describe` / `it` / `expect`, `globals: true`
- [ ] `vi.fn`, `vi.mock`, `vi.spyOn`
- [ ] `beforeEach` / `afterEach`
- [ ] `environment`: `node` cho API, `jsdom` cho web
- [ ] `setupFiles` chạy lúc nào
- [ ] Coverage bằng v8
- [ ] Vì sao API cần `unplugin-swc` (lại là decorator metadata)
- [ ] Khác biệt so với Jest khi migrate

### Testing Library

- [ ] Triết lý: test theo cách người dùng thấy, không test implementation
- [ ] Ưu tiên query: `getByRole` > `getByLabelText` > … > `getByTestId`
- [ ] `getBy` vs `queryBy` vs `findBy`
- [ ] `user-event` thay vì `fireEvent`
- [ ] Matcher của `jest-dom`

### Playwright

- [ ] Locator, auto-waiting
- [ ] `webServer` trong config — tự khởi động app trước khi test
- [ ] Trace, screenshot khi fail
- [ ] `npx playwright install` (chưa cài trên máy này)

## Xem trong repo

| Khái niệm           | File                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Vitest cho Nest     | [apps/api/vite.config.mts](../../apps/api/vite.config.mts)                                 |
| Vitest cho web      | [apps/web/vite.config.mts](../../apps/web/vite.config.mts)                                 |
| Setup jsdom         | [apps/web/vitest.setup.ts](../../apps/web/vitest.setup.ts)                                 |
| Test component      | [libs/ui/src/lib/button.spec.tsx](../../libs/ui/src/lib/button.spec.tsx)                   |
| E2E gọi API thật    | [apps/api-e2e/vite.config.mts](../../apps/api-e2e/vite.config.mts)                         |
| Chờ server sẵn sàng | [apps/api-e2e/src/support/global-setup.ts](../../apps/api-e2e/src/support/global-setup.ts) |

`libs/ui/src/lib/button.spec.tsx` là ví dụ ngắn nhất để đọc: hai test, một cái
kiểm tra render, một cái kiểm tra class theo variant.
