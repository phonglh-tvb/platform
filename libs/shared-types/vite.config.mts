import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/shared-types',
  test: {
    name: '@platform/shared-types',
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
    watch: false,
    passWithNoTests: true,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './test-output/vitest/coverage',
    },
  },
});
