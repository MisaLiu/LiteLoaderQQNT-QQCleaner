import { callQQNTApi } from './call';
import {
  EQQNTApiCommand,
  EQQNTApiClass,
  INativeCallResultGeneral,
  INativeCallResultCacheScan,
} from './types';

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
  return callQQNTApi<INativeCallResultCacheScan>({
    commandName: EQQNTApiCommand.CACHE_SCAN,
    args: [ null, null ],
    timeout: 180,
  });
}
