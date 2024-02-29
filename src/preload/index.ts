import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { IPluginConfig } from '@/common/utils/types';

const LLQQCleaner = {
  getConfig: () => {
    return ipcRenderer.invoke(EIPCChannel.CHANNEL_GET_CONFIG);
  },
  setConfig: (config: IPluginConfig) => {
    return ipcRenderer.send(EIPCChannel.CHANNEL_SET_CONFIG, config);
  },

  getStats: () => {
    return ipcRenderer.invoke(EIPCChannel.CHANNEL_GET_STATS);
  },
};

contextBridge.exposeInMainWorld('LLQQCleaner', LLQQCleaner);