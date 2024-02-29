import * as fs from 'fs';
import { parse } from 'path';
import {
  IConfig, IConfigCache
} from './types';

export class PluginConfigUtil {
  private readonly configPath: string;
  private config: IConfig;

  constructor(configPath: string) {
    this.configPath = configPath;

    if (!fs.existsSync(parse(this.configPath).dir)) {
      fs.mkdirSync(parse(this.configPath).dir);
    }
  }

  getConfig(useCache: boolean = true) {
    if (this.config && useCache) return this.config;
    return this.loadConfig();
  }

  setConfig(newConfig: IConfig) {
    this.config = newConfig;
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), { encoding: 'utf8' });
  }

  private loadConfig(): IConfig {
    const configDefaultCache: IConfigCache = {
      image: false,
      video: false,
      document: false,
      audio: false,
      other: false,
    };
    const configDefault: IConfig = {
      cleanWhenStartUp: false,
      cleanClock: false,
      cleanClockInterval: 1,
      cleanQQNTCache: false,
      cleanCacheAfterDays: 3,
      cacheSettings: configDefaultCache,
    };

    if (!fs.existsSync(this.configPath)) {
      this.config = configDefault;
    } else {
      const fileRaw = fs.readFileSync(this.configPath, 'utf8');
      let fileJson: IConfig = configDefault;

      try {
        fileJson = JSON.parse(fileRaw);
      } catch(e) {
        console.error(e);
        this.config = configDefault;
        return this.config;
      }

      this.config = { ...configDefault, ...fileJson };
    }

    return this.config;
  }
}