import { defineConfig } from 'vite';
import { resolve } from 'path';
import MainConfig from './vite.main.config';

export default defineConfig({
  ...MainConfig,

  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, '../src/renderer/index.ts'),
      formats: [ 'es' ],
      fileName: 'renderer', // XXX
    },
  }
});