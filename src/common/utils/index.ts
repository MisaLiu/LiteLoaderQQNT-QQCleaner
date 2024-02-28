import path from 'path';
import { ConfigUtil } from './config';

const CONFIG_DIR = path.resolve(global.LiteLoader.plugins['LLQQCleaner'].path.data, 'config.json');
const CONFIG_UTIL = new ConfigUtil(CONFIG_DIR);


export function printLog(...args) {
  console.log(...args);
}

export {
  CONFIG_DIR,
  CONFIG_UTIL as ConfigUtil
};
