import * as QQNTApi from '../qqnt';
import { log } from '@/common/utils';
import { IPluginConfig } from '@/common/utils/types';
import {
  EChatFileType,
  ICacheFileListItem,
} from './types';

export function runCleanerCache(config: IPluginConfig) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<number>(async (res) => {
    let fileList: ICacheFileListItem[] = [];
    let fileListKey: string[] = [];
    let fileTotalSize: number = 0;
    const { cacheSettings } = config;
    const getCacheFileByType = (type: EChatFileType) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<void>(async (res) => {
        (await QQNTApi.getFileCacheInfo(type)).infos.forEach((file) => {
          file.isChecked = true;
          fileList.push(file);
        });
        res();
      });
    };

    log('Getting cache files...');

    // XXX: Dumb way
    if (cacheSettings.image) await getCacheFileByType(EChatFileType.IMAGE);
    if (cacheSettings.video) await getCacheFileByType(EChatFileType.VIDEO);
    if (cacheSettings.document) await getCacheFileByType(EChatFileType.DOCUMENT);
    if (cacheSettings.audio) await getCacheFileByType(EChatFileType.AUDIO);
    if (cacheSettings.other) await getCacheFileByType(EChatFileType.OTHER);

    if (config.cleanCacheAfterDays) {
      const currentTime = Date.now();
      const afterDaysMS = config.cleanCacheAfterDaysNumber * 24 * 60 * 60 * 1000;

      // XXX: Also dumb way, rip cpu
      fileList = fileList.filter(file => {
        const fileBirthTime = parseInt(file.fileTime) * 1000;
        if (currentTime - fileBirthTime >= afterDaysMS) return true;
        else return false;
      });
    }

    if (fileList.length <= 0) {
      log('No cache files found.');
      res(0);
      return;
    }

    log('Found ' + fileList.length + ' files can be deleted, processing...');

    fileListKey = fileList.map(e => {
      const fileSize = parseInt(e.fileSize);
      fileTotalSize += fileSize;

      return e.fileKey;
    });
    await QQNTApi.clearChatCache([], fileListKey);

    log('Complete.');
    res(fileTotalSize);
  });
}