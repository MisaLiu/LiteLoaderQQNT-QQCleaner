import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    }
  },
  build: {
    lib: {
      entry: {
        [ 'main' ]: resolve(__dirname, '../src/main/index.ts'),
        [ 'preload' ]: resolve(__dirname, '../src/preload/index.ts'),
      },
      formats: [ 'cjs' ],
      fileName: (format, entryName) => `${entryName}.js`, // XXX
    },
    rollupOptions: {
      external: [ 'electron', 'fs', 'path' ], // NOTE: 记得在这里加入引用的浏览器不兼容模块，否则打包就报错
    }
  }
});