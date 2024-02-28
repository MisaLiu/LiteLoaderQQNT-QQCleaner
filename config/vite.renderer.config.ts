import { defineConfig } from 'vite';
import { resolve } from 'path';
import BaseConfig from './base.config';

export default defineConfig({
  ...BaseConfig,

  build: {
    emptyOutDir: false,
    reportCompressedSize: false,
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, '../src/renderer/index.ts'),
      formats: [ 'es' ],
      fileName: () => 'renderer.js', // XXX
    },
    rollupOptions: {
      output: {
        format: 'esm',
      }
    }
  }
});