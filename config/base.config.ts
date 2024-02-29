import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, '../'),
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    }
  },
});