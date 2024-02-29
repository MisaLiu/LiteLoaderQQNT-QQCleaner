import { callQQNTApi } from './call';
import {
  EQQNTApiCommand,
  EQQNTApiClass,
  INativeCallResultGeneral,
  INativeCallResultCacheScan,
  EQQNTApiReceiveCommand,
} from './types';
import {
  EChatFileType,
  ICacheFileList,
  ICacheFileListItem,
} from '../cleaner/types';

export function setCacheScanSilence(isSilent: boolean = false) {
  return callQQNTApi<INativeCallResultGeneral>({
    commandName: EQQNTApiCommand.CACHE_SET_SILENCE,
    args: [{
      isSilent
    }, null],
  });
}

export function getHotUpdateCachePath() {
  return callQQNTApi<string>({
    commandName: EQQNTApiCommand.CACHE_PATH_HOT_UPDATE,
    className: EQQNTApiClass.HOTUPDATE_API,
  });
}

export function getDesktopTmpPath() {
  return callQQNTApi<string>({
    commandName: EQQNTApiCommand.CACHE_PATH_DESKTOP_TEMP,
    className: EQQNTApiClass.BUSINESS_API,
  });
}

export function getCacheSessionPathList() {
  return callQQNTApi<{
    key: string,
    value: string,
  }[]>({
    commandName: EQQNTApiCommand.CACHE_PATH_SESSION,
    className: EQQNTApiClass.OS_API,
  });
}

export function scanCache() {
  callQQNTApi<INativeCallResultGeneral>({
    commandName: EQQNTApiReceiveCommand.CACHE_SCAN_FINISH,
    isListener: true,
  }).then();
  return callQQNTApi<INativeCallResultCacheScan>({
    commandName: EQQNTApiCommand.CACHE_SCAN,
    args: [ null, null ],
    timeout: 180,
  });
}

export function getFileCacheInfo(fileType: EChatFileType, pageSize: number = 1000, lastRecord?: ICacheFileListItem) {
  const _lastRecord = lastRecord ? lastRecord : { fileType: fileType };

  return callQQNTApi<ICacheFileList>({
    commandName: EQQNTApiCommand.CACHE_FILE_GET,
    args: [{
      fileType: fileType,
      restart: true,
      pageSize: pageSize,
      order: 1,
      lastRecord: _lastRecord,
    }, null],
  });
}

export function clearChatCache(chats: unknown[] = [], fileKeys: string[] = []) {
  return callQQNTApi<INativeCallResultGeneral>({
    commandName: EQQNTApiCommand.CACHE_CHAT_CLEAR,
    args: [{
      chats,
      fileKeys
    }, null],
  });
}