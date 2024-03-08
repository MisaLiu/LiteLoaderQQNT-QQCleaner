import { defineConfig } from 'electron-vite';
import { defineConfig as defineViteConfig } from 'vite';
import { resolve } from 'path';

const SRC_DIR = resolve(__dirname, './src');
const OUTPUT_DIR = resolve(__dirname, './dist');

const BaseConfig = defineViteConfig({
  root: resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
});

const ViteConfigBuilder = (type: 'main' | 'preload') => defineViteConfig(() => {
  return {
    ...BaseConfig,

    build: {
      minify: true,
      outDir: resolve(OUTPUT_DIR, `./${type}`),
      lib: {
        entry: resolve(SRC_DIR, `./${type}`),
      }
    }
  };
});

export default defineConfig({
  main: ViteConfigBuilder('main'),
  preload: ViteConfigBuilder('preload'),
  renderer: defineViteConfig({
    ...BaseConfig,

    build: {
      outDir: resolve(OUTPUT_DIR, './renderer'),
      minify: 'esbuild',
      lib: {
        entry: resolve(__dirname, './src/renderer/index.ts'),
        formats: [ 'es' ],
      },
      rollupOptions: {
        input: resolve(__dirname, './src/renderer/index.ts'),
        output: {
          format: 'esm',
        }
      }
    }
  })
});
