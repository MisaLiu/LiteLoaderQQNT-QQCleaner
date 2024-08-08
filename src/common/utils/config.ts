import * as fs from 'fs';
import {
  IPluginConfig, IPluginConfigCache, IPluginConfigList
} from './types';

export class PluginConfigUtil {
  private readonly configPath: string;
  private config: IPluginConfig;

  constructor(configPath: string) {
    this.configPath = configPath;
  }

  getConfig(useCache: boolean = true) {
    if (this.config && useCache) return this.config;
    return this.loadConfig();
  }

  setConfig(newConfig: IPluginConfig) {
    this.config = newConfig;
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), { encoding: 'utf8' });
  }

  private loadConfig(): IPluginConfig {
    const configDefaultCache: IPluginConfigCache = {
      image: false,
      video: false,
      document: false,
      audio: false,
      other: false,
    };
    const configDefaultList: IPluginConfigList = {
      list: [],
      mode: 'whitelist',
    };
    const configDefault: IPluginConfig = {
      cleanWhenStartUp: false,
      cleanClock: false,
      cleanClockInterval: 1,
      cleanQQNTCache: false,
      cleanCacheAfterDays: false,
      cleanCacheAfterDaysNumber: 3,
      cacheSettings: configDefaultCache,
      listSettings: configDefaultList,
      log: false,
    };

    if (!fs.existsSync(this.configPath)) {
      this.config = configDefault;
    } else {
      const fileRaw = fs.readFileSync(this.configPath, 'utf8');
      let fileJson: IPluginConfig = configDefault;

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
