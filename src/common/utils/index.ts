import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { version as PackageVersion, liteloader_manifest as PluginInfo } from '@/../package.json';
import { PluginConfigUtil } from './config';
import { PluginDataUtil } from './data';

export const PLUGIN_SLUG = PluginInfo.slug;
export const PLUGIN_NAME = PluginInfo.name;
export const PLUGIN_VERSION = PackageVersion;

export const PLUGIN_BASE_DIR = global.LiteLoader.plugins[PLUGIN_SLUG].path.data;
export const PLUGIN_CONFIG_DIR = path.resolve(PLUGIN_BASE_DIR, 'config.json');
export const PLUGIN_DATA_DIR = path.resolve(PLUGIN_BASE_DIR, 'data.json');

const pluginDataUtil = new PluginDataUtil(PLUGIN_DATA_DIR);

export function getConfigUtil() {
  return new PluginConfigUtil(PLUGIN_CONFIG_DIR);
}

export function getPluginData() {
  return { ...pluginDataUtil.getData(), pluginVersion: PLUGIN_VERSION, pluginDataDir: PLUGIN_DATA_DIR };
}

export function setPluginData(key: string, value: unknown) {
  pluginDataUtil.setData(key, value);
}

export function printLog(...args) {
  console.log(...args);
}

// Init plugin data dir
if (!existsSync(PLUGIN_BASE_DIR)) {
  mkdirSync(PLUGIN_BASE_DIR);
}
