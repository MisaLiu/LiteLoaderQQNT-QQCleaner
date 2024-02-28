
export interface IConfig {
  cleanWhenStartUp: boolean,
  cleanClock: boolean,
  cleanClockInterval: number,
  cleanQQNTCache: boolean,
  cleanCacheAfterDays: number,
  cacheSettings: IConfigCache,
}

export interface IConfigCache {
  image: boolean,
  video: boolean,
  document: boolean,
  audio: boolean,
  other: boolean,
}