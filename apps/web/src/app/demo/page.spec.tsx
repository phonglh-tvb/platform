import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DemoPage from './page.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DemoPage', () => {
  it('renders the shared buttons', () => {
    render(<DemoPage />);

    expect(screen.getByRole('button', { name: 'GET /backend' })).toBeEnabled();
    expect(
      screen.getByRole('button', { name: 'GET /backend/health' }),
    ).toBeEnabled();
    expect(screen.getByText('Bấm một nút để gọi API.')).toBeInTheDocument();
  });

  it('shows the payload returned by the proxy', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Hello API' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    render(<DemoPage />);
    await userEvent.click(screen.getByRole('button', { name: 'GET /backend' }));

    await waitFor(() => {
      expect(screen.getByText(/Hello API/)).toBeInTheDocument();
    });
    expect(globalThis.fetch).toHaveBeenCalledWith('/backend');
  });

  it('reports a failing request instead of throwing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('nope', { status: 502, statusText: 'Bad Gateway' }),
    );

    render(<DemoPage />);
    await userEvent.click(screen.getByRole('button', { name: 'GET /backend' }));

    await waitFor(() => {
      expect(screen.getByText(/502 Bad Gateway/)).toBeInTheDocument();
    });
  });
});
