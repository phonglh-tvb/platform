# 01 — JavaScript nền tảng

Ngôn ngữ thuần, không framework. Đây là phần đầu tư một lần dùng mãi.

## Mục lục

_(chưa có file nào — thêm dòng vào đây khi viết)_

## Checklist

### Scope & closure

- [ ] `var` / `let` / `const` và temporal dead zone
- [ ] Closure là gì, vì sao vòng lặp `var` in ra toàn số cuối
- [ ] Hoisting của function declaration vs function expression

### `this` & prototype

- [ ] 4 cách `this` được bind (default, implicit, explicit, `new`)
- [ ] Arrow function không có `this` riêng — hệ quả khi viết class method
- [ ] Prototype chain, `class` chỉ là cú pháp đường
- [ ] `Object.defineProperty`, property descriptor — nền của decorator

### Bất đồng bộ

- [ ] Call stack → task queue → microtask queue, thứ tự chạy
- [ ] `Promise` states, `then`/`catch`/`finally`
- [ ] `async`/`await` chỉ là syntax sugar của Promise
- [ ] `Promise.all` / `allSettled` / `race` / `any` khác nhau chỗ nào
- [ ] Vì sao `await` trong vòng `for` làm chậm gấp N lần

### Module

- [ ] CommonJS (`require`, `module.exports`) vs ES Module (`import`/`export`)
- [ ] Named vs default export, tại sao nên tránh default
- [ ] Circular dependency xảy ra thế nào ở mỗi hệ

### Cú pháp hiện đại hay dùng

- [ ] Destructuring, spread/rest, optional chaining `?.`, nullish `??`
- [ ] Template literal, tagged template
- [ ] Iterator, generator, `for...of`
- [ ] `Map` / `Set` / `WeakMap` — khi nào hơn object thường

## Xem trong repo

| Khái niệm             | File                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| `async`/`await`       | [apps/api/src/main.ts](../../apps/api/src/main.ts)                                     |
| ESM + top-level code  | [apps/api-e2e/src/support/test-setup.ts](../../apps/api-e2e/src/support/test-setup.ts) |
| CommonJS trong config | [apps/web/next.config.js](../../apps/web/next.config.js)                               |

Điểm đáng chú ý: repo này chạy song song cả hai hệ module. API build ra
CommonJS (xem `module.type` trong [apps/api/.swcrc](../../apps/api/.swcrc)),
còn config và libs dùng ESM. Hiểu chỗ này trước khi đọc `03-nodejs`.
