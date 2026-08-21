# 04 — React & Next.js

## Mục lục

_(chưa có file nào)_

## Checklist

### React 19

- [ ] JSX biên dịch thành gì (`jsx: react-jsx` — không cần import React nữa)
- [ ] Component, props, children; composition thay vì kế thừa
- [ ] State và re-render: cái gì làm component chạy lại
- [ ] `useState`, `useEffect` (và khi nào **không** cần `useEffect`)
- [ ] `useMemo` / `useCallback` — và vì sao đừng rắc bừa
- [ ] `useRef`, `useContext`, `useReducer`
- [ ] Rules of Hooks, tại sao không gọi hook trong điều kiện
- [ ] Key trong list, reconciliation
- [ ] Hook mới của 19: `use`, `useOptimistic`, `useActionState`

### Next.js App Router

- [ ] Cấu trúc `app/`: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- [ ] **Server Component vs Client Component** — `'use client'` đặt ở đâu
- [ ] Data fetching trong server component, caching & revalidate
- [ ] Route Handler (`app/api/*/route.ts`) — API ngay trong Next
- [ ] Server Actions
- [ ] `next.config.js`: `rewrites`, `redirects`, `output: 'standalone'`
- [ ] Biến môi trường: `NEXT_PUBLIC_*` lộ ra client, phần còn lại thì không
- [ ] Turbopack vs webpack ở dev

## Xem trong repo

| Khái niệm            | File                                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| Route handler        | [apps/web/src/app/api/hello/route.ts](../../apps/web/src/app/api/hello/route.ts) |
| Rewrite / proxy      | [apps/web/next.config.js](../../apps/web/next.config.js)                         |
| Component dùng chung | [libs/ui/src/lib/button.tsx](../../libs/ui/src/lib/button.tsx)                   |
| Standalone output    | [apps/web/Dockerfile](../../apps/web/Dockerfile)                                 |

Điểm dễ sập bẫy: Next resolve `rewrites()` lúc **build**, nên `API_URL` phải có
mặt khi build chứ không phải khi chạy. Trong Docker nó là build arg — xem
[docker-compose.yml](../../docker-compose.yml).
