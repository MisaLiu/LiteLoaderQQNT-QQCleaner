import * as fs from 'fs';
import {
  IPluginData
} from './types';

export class PluginDataUtil {
  private readonly dataPath: string;
  private data: IPluginData;

  constructor(dataPath: string) {
    this.dataPath = dataPath;
  }

  getData(useCache: boolean = true) {
    if (this.data && useCache) return this.data;
    return this.loadData();
  }

  setData(key: string, value: unknown) {
    this.data[key] = value;
    fs.writeFileSync(this.dataPath, JSON.stringify(this.data), { encoding: 'utf8' });
  }

  private loadData(): IPluginData {
    const dataDefault: IPluginData = {
      lastRunTime: NaN,
      cleanedTotal: 0,
    };

    if (!fs.existsSync(this.dataPath)) {
      this.data = dataDefault;
    } else {
      const fileRaw = fs.readFileSync(this.dataPath, 'utf8');
      let fileJson: IPluginData = dataDefault;

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