import { defineConfig } from 'vite';
import swc from 'unplugin-swc';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/api',
  plugins: [
    // Nest's DI reads design-time type metadata, which esbuild (Vite's default
    // TS transform) cannot emit. SWC can, so it handles the spec files instead.
    swc.vite({
      swcrc: false,
      module: { type: 'es6' },
      jsc: {
        target: 'es2022',
        parser: { syntax: 'typescript', decorators: true, dynamicImport: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
        keepClassNames: true,
        loose: true,
      },
      sourceMaps: true,
    }),
  ],
  test: {
    name: '@platform/api',
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
    watch: false,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './test-output/vitest/coverage',
    },
  },
});
