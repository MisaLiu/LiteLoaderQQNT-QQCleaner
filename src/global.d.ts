import { IPluginConfig, IPluginStatsExtend } from '@/common/utils/types';

declare module '*?raw' {
  const content: string;
  export default content;
}

declare namespace LLQQCleaner {
  const getConfig: () => Promise<IPluginConfig>;
  const setConfig: (config: IPluginConfig) => Promise<void>;
  const getStats: () => Promise<IPluginStatsExtend>;
}

declare namespace LiteLoader {
  const path: ILiteLoaderPath;
  const versions: ILiteLoaderVersion;
  const os: ILiteLoaderOS;
  const package: ILiteLoaderPackage;
  const config: {
    LiteLoader: {
      disabled_plugins: string[],
    }
  };
  const plugins: Record<string, ILiteLoaderPlugin>;
  const api: ILiteLoaderAPI;

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
}