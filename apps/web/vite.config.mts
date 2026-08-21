import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/web',
  plugins: [react()],
  resolve: {
    // Mirrors the `@/*` path mapping in tsconfig.json.
    alias: { '@': resolve(import.meta.dirname, 'src') },
  },
  test: {
    name: '@platform/web',
    environment: 'jsdom',
    globals: true,
    include: ['{src,specs}/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    watch: false,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './test-output/vitest/coverage',
    },
  },
});
