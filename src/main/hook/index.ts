import { BrowserWindow } from 'electron';
import {
  IQQNTApiReturn,
  IQQNTApiReturnData,
} from './types';


const HookApiCallbacks = new Map<string, (apiReturn: IQQNTApiReturnData<unknown>[]) => void>();
const ReceiveHooks: {
  command: any,
  hookFn: ((payload: unknown) => void | Promise<void>),
  id: string,
}[] = [];

export function hookQQNTReceive(window: BrowserWindow) {
  const sendOrigin = window.webContents.send;
  const sendPatched = (channel: string, ...args: IQQNTApiReturn) => {
    // console.log('[LLQQCleaner] Receive data', channel, JSON.stringify(args));

    if (args?.[1] instanceof Array) {
      for (const receiveData of args[1]) {
        const { cmdName: commandName } = receiveData;
        for (const hook of ReceiveHooks) {
          if (hook.command !== commandName) continue;
          // eslint-disable-next-line no-async-promise-executor
          new Promise(async (res) => {
            res((await hook.hookFn(receiveData.payload)));
          }).then().catch(e => {
            // Log: Failed to hook
            console.error(e);
          });
        }
      }
    }

    if (args[0]?.callbackId) {
      const { callbackId } = args[0];
      const callbackFn = HookApiCallbacks.get(callbackId);

      if (callbackFn) {
        new Promise((res) => {
          res(callbackFn(args[1]));
        }).then();

        HookApiCallbacks.delete(callbackId);
      }
    }

    return sendOrigin.call(window.webContents, channel, ...args);
  };
  window.webContents.send = sendPatched;
}
