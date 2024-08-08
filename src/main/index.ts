import { BrowserWindow } from 'electron';
import { hookQQNTReceive } from './qqnt/hook';
import { callQQNTApi } from './qqnt/call';
import { ipcMain } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { log, getConfigUtil, getPluginStats } from '@/common/utils';
import { InitCleaner } from './cleaner';
import { IPluginConfig } from '@/common/utils/types';
import { EQQNTApiReceiveCommand } from './qqnt/types';

ipcMain.handle(EIPCChannel.GET_CONFIG, () => {
  return getConfigUtil().getConfig();
});

ipcMain.on(EIPCChannel.SET_CONFIG, (e, config: IPluginConfig) => {
  getConfigUtil().setConfig(config);
});

ipcMain.handle(EIPCChannel.GET_FRIENDS, () => new Promise((res, rej) => {
  callQQNTApi({
    commandName: 'nodeIKernelBuddyService/getBuddyList',
    args: [ { force_update: false }, undefined ],
    isListener: true,
    listenerCommand: EQQNTApiReceiveCommand.FRIENDS,
    skipFirstResponse: false,
  }).then((result) => {
    res(result);
  }).catch((e) => {
    rej(e);
  });
}));

ipcMain.handle(EIPCChannel.GET_GROUPS, () => new Promise((res, rej) => {
  callQQNTApi({
    commandName: 'nodeIKernelGroupService/getGroupList',
    args: [ { force_update: false }, undefined ],
    isListener: true,
    listenerCommand: [ EQQNTApiReceiveCommand.GROUPS, EQQNTApiReceiveCommand.GROUPS_STORE ],
    skipFirstResponse: false,
  }).then((result) => {
    res(result);
  }).catch((e) => {
    rej(e);
  });
}));

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
