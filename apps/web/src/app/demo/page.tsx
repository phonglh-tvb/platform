'use client';

import { useState } from 'react';
import { Button } from '@platform/ui';
import '@platform/ui/styles.css';
import type { HealthResponse, MessageResponse } from '@platform/shared-types';
import styles from './page.module.css';

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; body: string }
  | { kind: 'error'; message: string };

export default function DemoPage() {
  const [state, setState] = useState<State>({ kind: 'idle' });

  // `/backend/*` được next.config.js rewrite sang `${API_URL}/api/*`, nên đây
  // vẫn là request cùng origin — không dính CORS.
  async function call<T>(path: string) {
    setState({ kind: 'loading' });
    try {
      const res = await fetch(path);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const body = (await res.json()) as T;
      setState({ kind: 'ok', body: JSON.stringify(body, null, 2) });
    } catch (error) {
      setState({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Lỗi không xác định',
      });
    }
  }

  const busy = state.kind === 'loading';

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Demo thư viện dùng chung</h1>
      <p className={styles.lede}>
        Nút bên dưới đến từ <code>@platform/ui</code>, kiểu dữ liệu của phản hồi
        đến từ <code>@platform/shared-types</code> — cùng những kiểu mà API dùng
        để trả về.
      </p>

      <div className={styles.actions}>
        <Button
          disabled={busy}
          onClick={() => call<MessageResponse>('/backend')}
        >
          GET /backend
        </Button>
        <Button
          variant="secondary"
          disabled={busy}
          onClick={() => call<HealthResponse>('/backend/health')}
        >
          GET /backend/health
        </Button>
        <Button
          variant="secondary"
          disabled={busy}
          onClick={() => setState({ kind: 'idle' })}
        >
          Xoá kết quả
        </Button>
      </div>

      <pre
        className={
          state.kind === 'error'
            ? `${styles.output} ${styles.error}`
            : styles.output
        }
        aria-live="polite"
      >
        {state.kind === 'idle' && 'Bấm một nút để gọi API.'}
        {state.kind === 'loading' && 'Đang gọi…'}
        {state.kind === 'ok' && state.body}
        {state.kind === 'error' && `Lỗi: ${state.message}`}
      </pre>

      <p className={styles.hint}>
        Hai nút đầu đi qua proxy nên cần API chạy ở port 3333 (
        <code>pnpm dev</code> khởi động cả hai). Nếu chỉ chạy mình web, chúng sẽ
        báo lỗi — đó là hành vi đúng.
      </p>
    </main>
  );
}
