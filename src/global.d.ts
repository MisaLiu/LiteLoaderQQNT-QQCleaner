import type { LLQQCleaner as ILLQQCleaner } from './preload';

declare global {
  const LiteLoader: ILiteLoader;
  const LLQQCleaner: typeof ILLQQCleaner;
}

declare interface ILiteLoader {
  path: ILiteLoaderPath;
  versions: ILiteLoaderVersion;
  os: ILiteLoaderOS;
  package: ILiteLoaderPackage;
  config: {
    LiteLoader: {
      disabled_plugins: string[],
    }
  };
  plugins: Record<string, ILiteLoaderPlugin>;
  api: ILiteLoaderAPI;
}

interface ILiteLoaderPath {
  root: string,
  profile: string,
  data: string,
  plugins: string,
}

interface ILiteLoaderVersion {
  qqnt: string,
  liteloader: string,
  node: string,
  chrome: string,
  electron: string,
}

interface ILiteLoaderOS {
  platform: 'win32' | 'linux' | 'darwin',
}

interface ILiteLoaderPackage {
  liteloader: object,
  qqnt: object,
}

interface ILiteLoaderPlugin {
  manifest: object,
  incompatible: boolean,
  disabled: boolean,
  path: ILiteLoaderPluginPath
}

interface ILiteLoaderPluginPath {
  plugin: string,
  data: string,
  injects: ILiteLoaderPluginPathInject
}

interface ILiteLoaderPluginPathInject {
  main: string,
  renderer: string,
  preload: string,
}

interface ILiteLoaderAPI {
  openPath: (path: string) => void,
  openExternal: (url: string) => void,
  disablePlugin: (slug: string) => void,
  config: ILiteLoaderAPIConfig,
}

interface ILiteLoaderAPIConfig {
  set: (slug: string, new_config: object) => unknown,
  get: (slug: string, default_config?: object) => object,
}