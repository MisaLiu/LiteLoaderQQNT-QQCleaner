import * as fs from 'fs';
import {
  IPluginStats
} from './types';

export class PluginStatsUtil {
  private readonly dataPath: string;
  private data: IPluginStats;

  constructor(dataPath: string) {
    this.dataPath = dataPath;
  }

  getStats(useCache: boolean = true) {
    if (this.data && useCache) return this.data;
    return this.loadStats();
  }

  setStats(key: string, value: unknown) {
    this.data[key] = value;
    fs.writeFileSync(this.dataPath, JSON.stringify(this.data), { encoding: 'utf8' });
  }

  private loadStats(): IPluginStats {
    const dataDefault: IPluginStats = {
      lastRunTime: NaN,
      cleanedTotal: 0,
    };

    if (!fs.existsSync(this.dataPath)) {
      this.data = dataDefault;
    } else {
      const fileRaw = fs.readFileSync(this.dataPath, 'utf8');
      let fileJson: IPluginStats = dataDefault;

      try {
        fileJson = JSON.parse(fileRaw);
      } catch (e) {
        console.error(e);
        this.data = dataDefault;
        return this.data;
      }

      this.data = { ...dataDefault, ...fileJson };
    }

    return this.data;
  }
}