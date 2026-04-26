/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';

const hostSetup = {
  port: 4200,
  host: 'localhost',
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command }) => {
  const isLib = command === 'build';

  return {
    root: resolve(__dirname),
    cacheDir: '../../node_modules/.vite/apps/visibility',
    server: hostSetup,
    preview: hostSetup,
    plugins: [react()],

    resolve: {
      tsconfigPaths: true
    },

    build: {
      outDir: '../../dist/visibility',
      emptyOutDir: true,

      ...(isLib
        ? {
            cssCodeSplit: false, // inline css into js
            reportCompressedSize: true,
            commonjsOptions: {
              transformMixedEsModules: true, // transform files that mix ESM and CJS
            },
            lib: {
              entry: resolve(__dirname, 'src/visibility.tsx'),
              name: 'visibility',
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
      name: '@fedex/visibility',
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
