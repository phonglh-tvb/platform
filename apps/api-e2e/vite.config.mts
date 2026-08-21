import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/api-e2e',
  test: {
    name: '@platform/api-e2e',
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
    globalSetup: ['./src/support/global-setup.ts'],
    setupFiles: ['./src/support/test-setup.ts'],
    watch: false,
    // The API is served by a single process; run e2e specs serially against it.
    fileParallelism: false,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './test-output/vitest/coverage',
    },
  },
});
