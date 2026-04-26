/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';

const hostSetup = {
  port: 4202,
  host: 'localhost',
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command }) => {
  const isLib = command === 'build';

  return {
    root: resolve(__dirname),
    cacheDir: '../../node_modules/.vite/apps/monitor',
    server: hostSetup,
    preview: hostSetup,
    plugins: [react()],

    resolve: {
      tsconfigPaths: true,
    },

    build: {
      outDir: '../../dist/overview',
      emptyOutDir: true,

      ...(isLib
        ? {
            cssCodeSplit: false, // inline css into js
            reportCompressedSize: true,
            commonjsOptions: {
              transformMixedEsModules: true, // transform files that mix ESM and CJS
            },
            lib: {
              entry: resolve(__dirname, 'src/overview.tsx'),
              name: 'overview',
              formats: ['es'],
            },
            rolldownOptions: {
              external: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
              ],
              output: {
                inlineDynamicImports: true,
                chunkFileNames: '[name]-[hash].mjs',
              },
            },
          }
        : {}),
    },

    test: {
      name: '@fedex/overview',
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const,
      },
    },
  };
});
