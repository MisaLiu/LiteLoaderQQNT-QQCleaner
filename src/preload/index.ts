import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';
import { EIPCChannel } from '@/common/channels';
import { IPluginConfig, IPluginStatsExtend } from '@/common/utils/types';

const LLQQCleaner = {
  getConfig: () => {
    return ipcRenderer.invoke(EIPCChannel.GET_CONFIG) as Promise<IPluginConfig>;
  },
  setConfig: (config: IPluginConfig) => {
    return ipcRenderer.send(EIPCChannel.SET_CONFIG, config);
  },

  getGroups: () => {
    return ipcRenderer.invoke(EIPCChannel.GET_GROUPS);
  },

  getStats: () => {
    return ipcRenderer.invoke(EIPCChannel.GET_STATS) as Promise<IPluginStatsExtend>;
  },
};

contextBridge.exposeInMainWorld('LLQQCleaner', LLQQCleaner);
export type { LLQQCleaner };
