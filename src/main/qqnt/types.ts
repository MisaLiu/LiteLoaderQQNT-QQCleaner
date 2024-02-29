
export enum EQQNTApiCommand {
  CACHE_SET_SILENCE = 'nodeIKernelStorageCleanService/setSilentScan',
  CACHE_ADD_SCANNED_PATH = 'nodeIKernelStorageCleanService/addCacheScanedPaths',
  CACHE_PATH_HOT_UPDATE = 'getHotUpdateCachePath',
  CACHE_PATH_DESKTOP_TEMP = 'getDesktopTmpPath',
  CACHE_PATH_SESSION = 'getCleanableAppSessionPathList',
  CACHE_SCAN = 'nodeIKernelStorageCleanService/scanCache',
  CACHE_CLEAR = 'nodeIKernelStorageCleanService/clearCacheDataByKeys',

  CACHE_CHAT_GET = 'nodeIKernelStorageCleanService/getChatCacheInfo',
  CACHE_FILE_GET = 'nodeIKernelStorageCleanService/getFileCacheInfo',
  CACHE_CHAT_CLEAR = 'nodeIKernelStorageCleanService/clearChatCacheInfo',
}

export enum EQQNTApiReceiveCommand {
  CACHE_SCAN_FINISH = 'nodeIKernelStorageCleanListener/onFinishScan',
}

export enum EQQNTApiClass {
  NT_API = 'ns-ntApi',
  FS_API = 'ns-FsApi',
  OS_API = 'ns-OsApi',
  HOTUPDATE_API = 'ns-HotUpdateApi',
  BUSINESS_API = 'ns-BusinessApi',
  GLOBAL_DATA = 'ns-GlobalDataApi',
}

export enum EQQNTApiChannel {
  IPC_UP_1 = 'IPC_UP_1',
  IPC_UP_2 = 'IPC_UP_2',
  IPC_UP_3 = 'IPC_UP_3',
}

export interface IQQNTApiReturn<IPayload = unknown> extends Array<unknown> {
  0: {
    eventName: EQQNTApiClass,
    callbackId?: string,
    type: 'request' | 'response',
  },
  1: IQQNTApiReturnData<IPayload>[],
}

export interface IQQNTApiReturnData<IPayload = unknown> {
  cmdName: EQQNTApiReceiveCommand,
  cmdType: 'event',
  payload: IPayload,
}

export interface INativeCallResultGeneral {
  result: number,
  errMsg: string,
}

export interface INativeCallResultCacheScan extends INativeCallResultGeneral {
  size: [ // 单位为字节
    string, // 系统总存储空间
    string, // 系统可用存储空间
    string, // 系统已用存储空间
    string, // QQ总大小
    string, // 「聊天与文件」大小
    string, // 未知
    string, // 「缓存数据」大小
    string, // 「其他数据」大小
    string, // 未知
  ]
}
