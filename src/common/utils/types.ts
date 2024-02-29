
export interface IPluginConfig {
  cleanWhenStartUp: boolean,
  cleanClock: boolean,
  cleanClockInterval: number,
  cleanQQNTCache: boolean,
  cleanCacheAfterDays: number,
  cacheSettings: IPluginConfigCache,
  log: boolean,
}

export interface IPluginConfigCache {
  image: boolean,
  video: boolean,
  document: boolean,
  audio: boolean,
  other: boolean,
}

export interface IPluginStats {
  lastRunTime: number,
  cleanedTotal: number,
}
