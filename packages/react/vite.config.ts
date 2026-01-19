/// <reference types="vitest" />

import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: 'true',
    __SERVER__: 'false',
    __TEST__: 'true',
  },
  plugins: [
    {
      name: 'ts-paths',
      enforce: 'pre',
    },
    react(),
  ],
  optimizeDeps: {
    noDiscovery: true,
    include: ['react', 'react-dom', 'react-dom/client'],
  },
  resolve: {
    alias: {
      '$test-utils': path.resolve(__dirname, 'src/test-utils'),
      '@vidstack/react': path.resolve(__dirname, 'src/index.ts'),
    },
  },
  // https://vitest.dev/config
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-utils/setup.ts'],
    testTimeout: 5000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test-utils/**',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/icons.ts',
        'src/globals.d.ts',
      ],
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
  },
});
