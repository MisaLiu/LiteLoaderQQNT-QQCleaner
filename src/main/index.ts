import { BrowserWindow } from 'electron';
import { ipcMain } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { getConfigUtil } from '@/common/utils';
import { IConfig } from '@/common/utils/types';

ipcMain.handle(EIPCChannel.CHANNEL_GET_CONFIG, () => {
  return getConfigUtil().getConfig();
});

ipcMain.on(EIPCChannel.CHANNEL_SET_CONFIG, (e, config: IConfig) => {
  getConfigUtil().setConfig(config);
});

export function onBrowserWindowCreated(window: BrowserWindow) {
  console.log('A window has just been created');
}