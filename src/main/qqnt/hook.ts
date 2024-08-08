import { BrowserWindow } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import {
  EQQNTApiReceiveCommand,
  IQQNTApiReturn,
  IQQNTApiReturnData,
} from './types';


const HookApiCallbacks = new Map<string, (apiReturn: IQQNTApiReturnData<unknown>[]) => void>();
const HookReceives: {
  commands: EQQNTApiReceiveCommand[],
  hookFn: ((payload: unknown) => void | Promise<void>),
  id: string,
}[] = [];

export function hookQQNTReceive(window: BrowserWindow) {
  const sendOrigin = window.webContents.send;
  const sendPatched = (channel: string, ...args: IQQNTApiReturn) => {
    if (args?.[1] instanceof Array) {
      for (const receiveData of args[1]) {
        const { cmdName: commandName } = receiveData;
        for (const hook of HookReceives) {
          if (!hook.commands.includes(commandName)) continue;
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

export function addHookApiCallback(uuid: string, callback: (payload: unknown) => void) {
  return HookApiCallbacks.set(uuid, callback);
}

export function addReceiveHook<PayloadType>(receiveCommand: EQQNTApiReceiveCommand | Array<EQQNTApiReceiveCommand>, hookFn: (payload: PayloadType) => void): string {
  const id = uuidv4();
  const commands = [];

  if (typeof receiveCommand === 'string') commands.push(receiveCommand);
  else commands.push(...receiveCommand);

  HookReceives.push({
    commands,
    id,
    hookFn,
  });

  return id;
}

export function removeReceiveHook(uuid: string) {
  const i = HookReceives.findIndex(e => e.id === uuid);
  HookReceives.splice(i, 1);
}
