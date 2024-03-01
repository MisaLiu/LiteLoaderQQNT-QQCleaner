import { BrowserWindow } from 'electron';
import { hookQQNTReceive } from './qqnt/hook';
import { ipcMain } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { log, getConfigUtil, getPluginStats } from '@/common/utils';
import { InitCleaner } from './cleaner';
import { IPluginConfig } from '@/common/utils/types';

ipcMain.handle(EIPCChannel.GET_CONFIG, () => {
  return getConfigUtil().getConfig();
});

ipcMain.on(EIPCChannel.SET_CONFIG, (e, config: IPluginConfig) => {
  getConfigUtil().setConfig(config);
});

ipcMain.handle(EIPCChannel.GET_STATS, () => {
  return getPluginStats();
});

export function onBrowserWindowCreated(window: BrowserWindow) {
  window.webContents.on('did-stop-loading', () => {
    if (window.webContents.getURL().indexOf('#/main/message') === -1) return;

    log('Main window detected!');
    InitCleaner();
  });

  hookQQNTReceive(window);
}