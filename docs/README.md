# Docs — Sổ tay học lại từ đầu

Ghi chú cá nhân, đi từ JavaScript nền tảng lên tới đúng stack đang chạy trong
repo này. Mỗi thư mục là một chặng; số thứ tự chỉ để giữ thứ tự đọc, không bắt
buộc học tuần tự.

## Cách chia

| Thư mục                               | Nội dung                                      |
| ------------------------------------- | --------------------------------------------- |
| [01-javascript](01-javascript/)       | Ngôn ngữ thuần: scope, `this`, async, module  |
| [02-typescript](02-typescript/)       | Type system, generics, decorator, tsconfig    |
| [03-nodejs](03-nodejs/)               | Runtime, module resolution, npm workspaces    |
| [04-react-nextjs](04-react-nextjs/)   | React 19, Next.js App Router                  |
| [05-nestjs](05-nestjs/)               | DI, module, controller, provider              |
| [06-build-tooling](06-build-tooling/) | Nx, SWC, Vite, ESLint/Prettier                |
| [07-testing](07-testing/)             | Vitest, Testing Library, Playwright           |
| [08-docker-ci](08-docker-ci/)         | Docker multi-stage, GitHub Actions            |
| [09-this-project](09-this-project/)   | Ghi chú riêng repo này + lý do các quyết định |

## Nguyên tắc

**Tách kiến thức chung khỏi ghi chú dự án.** `01`–`08` là thứ mang đi đâu cũng
dùng được, viết một lần đọc nhiều năm. `09` là thứ chỉ đúng với repo này và sẽ
lỗi thời khi refactor — để riêng thì lúc dọn dẹp không phải phân vân.

**Mỗi khái niệm neo vào một file thật.** Học `emitDecoratorMetadata` mà không mở
[apps/api/.swcrc](../apps/api/.swcrc) ra xem thì hôm sau quên. Các README con
đều có cột "xem trong repo" trỏ tới file cụ thể.

**Chỉ tạo file khi thật sự viết.** Các thư mục hiện chỉ có `README.md` làm mục
lục kèm checklist. Học tới đâu thêm file tới đó, rồi tick vào checklist và thêm
một dòng vào bảng mục lục của thư mục đó.

**Đặt tên file:** `kebab-case.md`, tiếng Anh cho tên file (khỏi dấu, khỏi lỗi
path), nội dung tiếng Việt thoải mái. Có thứ tự đọc thì thêm prefix số:
`01-closure.md`.

Bắt đầu một ghi chú mới thì copy [`_template.md`](_template.md).

## Lộ trình gợi ý

1. **01 → 02** trước tiên. Phần lớn thứ khó chịu về sau (module resolution,
   decorator, `dependsOn`) đều là hệ quả của JS/TS nền tảng.
2. **03** để hiểu Node quyết định `import` trỏ vào đâu — chìa khoá để đọc được
   `exports` map trong [libs/shared-types/package.json](../libs/shared-types/package.json).
3. **04** hoặc **05** tuỳ hướng bạn muốn đi trước (frontend / backend).
4. **06 → 08** là tooling, học khi đã có code để build và deploy.
5. **09** viết dần song song, mỗi lần gỡ được một lỗi thì ghi lại.
