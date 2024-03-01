import * as path from 'path';
import { existsSync, mkdirSync, appendFile } from 'fs';
import { version as PackageVersion, liteloader_manifest as PluginInfo } from '@/../package.json';
import { PluginConfigUtil } from './config';
import { PluginStatsUtil } from './stats';

export const PLUGIN_SLUG = PluginInfo.slug;
export const PLUGIN_NAME = PluginInfo.name;
export const PLUGIN_VERSION = PackageVersion;

export const PLUGIN_DATA_DIR = global.LiteLoader.plugins[PLUGIN_SLUG].path.data;
export const PLUGIN_CONFIG_DIR = path.resolve(PLUGIN_DATA_DIR, 'config.json');
export const PLUGIN_STATS_DIR = path.resolve(PLUGIN_DATA_DIR, 'data.json');
export const PLUGIN_LOG_DIR = path.resolve(PLUGIN_DATA_DIR, './log');

const pluginStatsUtil = new PluginStatsUtil(PLUGIN_STATS_DIR);

export function log(...args) {
  const { log: writeLogFile } = getConfigUtil().getConfig();
  const currentTime = new Date();
  const currentTimeString = currentTime.toLocaleString();

  console.log(`\x1B[36m[${currentTimeString}][QQCleaner]\x1B[0m`, ...args);

  if (writeLogFile) {
    const currentDateString = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`;

    appendFile(path.resolve(PLUGIN_LOG_DIR, `./${currentDateString}.log`), [
      `[${currentTimeString}][QQCleaner]`,
      ...args,
      '\r\n',
    ].map(e => {
      if (typeof e === 'string') return e;
      else return JSON.stringify(e);
    }).join(' '), () => void 0);
  }
}

export function getConfigUtil() {
  return new PluginConfigUtil(PLUGIN_CONFIG_DIR);
}

export function getPluginStats() {
  return {
    ...pluginStatsUtil.getStats(),
    pluginVersion: PLUGIN_VERSION,
    pluginLogDir: PLUGIN_LOG_DIR,
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

// Init plugin log dir
if (!existsSync(PLUGIN_LOG_DIR)) {
  mkdirSync(PLUGIN_LOG_DIR);
}
