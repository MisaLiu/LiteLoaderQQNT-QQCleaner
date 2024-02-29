import { runCleanerQQNT } from './qqnt';
import { runCleanerCache } from './cache';
import * as QQNTApi from '../qqnt';
import { log, getPluginStats, setPluginStats } from '@/common/utils';
import { IPluginConfig } from '@/common/utils/types';

export function runCleaner(config: IPluginConfig) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void>(async (res) => {
    const statsData = getPluginStats();
    let totalCleanedSize: number = 0;

    log('Starting clean task...');
    log('Scanning cache...');

    await QQNTApi.setCacheScanSilence(false);
    const cacheScanResult = await QQNTApi.scanCache();
    const cacheSize = parseInt(cacheScanResult.size[6]);

    if (cacheScanResult.result !== 0) {
      log('Error when scanning cache.', cacheScanResult);
      res();
      return;
    }

    if (!isNaN(cacheSize) && cacheSize > 0 && config.cleanQQNTCache) {
      await runCleanerQQNT();
      totalCleanedSize += cacheSize;
    }
    totalCleanedSize += (await runCleanerCache(config));

    log('Clean complete. Total:', totalCleanedSize);

    setPluginStats('lastRunTime', Date.now());
    setPluginStats('cleanedTotal', (statsData.cleanedTotal + totalCleanedSize));

    res();
  });
}