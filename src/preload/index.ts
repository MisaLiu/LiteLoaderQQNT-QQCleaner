import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { IConfig } from '@/common/utils/types';

const LLQQCleaner = {
  getConfig: () => {
    return ipcRenderer.invoke(EIPCChannel.CHANNEL_GET_CONFIG);
  },
  setConfig: (config: IConfig) => {
    return ipcRenderer.send(EIPCChannel.CHANNEL_SET_CONFIG, config);
  }
};

contextBridge.exposeInMainWorld('LLQQCleaner', LLQQCleaner);