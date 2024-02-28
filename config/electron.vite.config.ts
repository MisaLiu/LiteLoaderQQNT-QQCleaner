import { defineConfig } from 'electron-vite';
import { defineConfig as defineViteConfig, UserConfig as ViteUserConfig } from 'vite';
import { resolve } from 'path';
import BaseConfig from './base.config';

const SRC_DIR = resolve(__dirname, '../src');
const OUTPUT_DIR = resolve(__dirname, '../dist');

const ViteConfigBuilder = (type: 'main' | 'preload') => defineViteConfig(() => {
  const config: ViteUserConfig = {
    ...BaseConfig,

    build: {
      outDir: resolve(OUTPUT_DIR, `./${type}`),
      minify: 'esbuild',
      lib: {
        entry: resolve(SRC_DIR, `./${type}`),
        formats: [ 'cjs' ],
      }
    }
  }
  return config;
});

export default defineConfig({
  main: ViteConfigBuilder('main'),
  preload: ViteConfigBuilder('preload'),
  // `renderer.js` will be packed by Vite
});
