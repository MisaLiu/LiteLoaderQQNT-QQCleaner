import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { version as PackageVersion, liteloader_manifest as PluginInfo } from '@/../package.json';
import { PluginConfigUtil } from './config';
import { PluginStatsUtil } from './stats';

export const PLUGIN_SLUG = PluginInfo.slug;
export const PLUGIN_NAME = PluginInfo.name;
export const PLUGIN_VERSION = PackageVersion;

export const PLUGIN_DATA_DIR = global.LiteLoader.plugins[PLUGIN_SLUG].path.data;
export const PLUGIN_CONFIG_DIR = path.resolve(PLUGIN_DATA_DIR, 'config.json');
export const PLUGIN_STATS_DIR = path.resolve(PLUGIN_DATA_DIR, 'data.json');

const pluginStatsUtil = new PluginStatsUtil(PLUGIN_STATS_DIR);

export function getConfigUtil() {
  return new PluginConfigUtil(PLUGIN_CONFIG_DIR);
}

export function getPluginStats() {
  return {
    ...pluginStatsUtil.getStats(),
    pluginVersion: PLUGIN_VERSION,
  };
}

export function setPluginStats(key: string, value: unknown) {
  pluginStatsUtil.setStats(key, value);
}

export function printLog(...args) {
  console.log(...args);
}

// Init plugin data dir
if (!existsSync(PLUGIN_DATA_DIR)) {
  mkdirSync(PLUGIN_DATA_DIR);
}
