import * as path from 'path';
import { version as PackageVersion, liteloader_manifest as PluginInfo } from '@/../package.json';
import { ConfigUtil } from './config';

export const PLUGIN_SLUG = PluginInfo.slug;
export const PLUGIN_NAME = PluginInfo.name;
export const PLUGIN_VERSION = PackageVersion;

export const PLUGIN_CONFIG_DIR = path.resolve(global.LiteLoader.plugins['LLQQCleaner'].path.data, 'config.json');

export function getConfigUtil() {
  return new ConfigUtil(PLUGIN_CONFIG_DIR);
}

export function printLog(...args) {
  console.log(...args);
}
