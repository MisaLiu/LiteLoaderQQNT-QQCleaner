import * as path from 'path';
import { ConfigUtil } from './config';

export const CONFIG_DIR = path.resolve(global.LiteLoader.plugins['LLQQCleaner'].path.data, 'config.json');

export function getConfigUtil() {
  return new ConfigUtil(CONFIG_DIR);
}

export function printLog(...args) {
  console.log(...args);
}
