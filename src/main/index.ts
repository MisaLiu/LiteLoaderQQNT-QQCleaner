import { BrowserWindow } from 'electron';
import { hookQQNTReceive } from './qqnt/hook';
import { ipcMain } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { getConfigUtil, getPluginStats } from '@/common/utils';
import { IPluginConfig } from '@/common/utils/types';

ipcMain.handle(EIPCChannel.CHANNEL_GET_CONFIG, () => {
  return getConfigUtil().getConfig();
});

ipcMain.on(EIPCChannel.CHANNEL_SET_CONFIG, (e, config: IPluginConfig) => {
  getConfigUtil().setConfig(config);
});

ipcMain.handle(EIPCChannel.CHANNEL_GET_STATS, () => {
  return getPluginStats();
});

export function onBrowserWindowCreated(window: BrowserWindow) {
  console.log('A window has just been created');
  hookQQNTReceive(window);
}