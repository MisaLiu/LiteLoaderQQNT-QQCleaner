import { ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { addHookApiCallback, addReceiveHook, removeReceiveHook } from './hook';
import {
  EQQNTApiCommand,
  EQQNTApiClass,
  EQQNTApiChannel,
  EQQNTApiReceiveCommand,
  INativeCallResultGeneral,
} from './types';

interface IQQNTCallParam {
  commandName: EQQNTApiCommand | string,
  className?: EQQNTApiClass,
  channel?: EQQNTApiChannel,
  isListener?: boolean,
  args?: unknown[],
  listenerCommand?: EQQNTApiReceiveCommand,
  listenerHandler?: (payload: unknown) => boolean,
  skipFirstResponse?: boolean,
  timeout?: number,
}

export function callQQNTApi<ReturnType>({
  commandName,
  className = EQQNTApiClass.NT_API,
  channel = EQQNTApiChannel.IPC_UP_2,
  isListener = false,
  args = [],
  listenerCommand,
  listenerHandler,
  skipFirstResponse = true,
  timeout = 5
}: IQQNTCallParam) {
  const uuid = uuidv4();
  const ipcHead = {
    type: 'request',
    callbackId: uuid,
    eventName: `${className}-${channel[channel.length - 1]}${isListener ? '-register' : ''}`,
  };
  const ipcBody = [ commandName, ...args ];

  return new Promise((_res: (payload: ReturnType) => void, rej) => {
    let timeoutClockId: NodeJS.Timeout | null = null;
    const res = (data: ReturnType) => {
      _res(data);
      if (timeoutClockId !== null) clearTimeout(timeoutClockId);
    };

    if (!isListener) {
      addHookApiCallback(uuid, (arg: ReturnType) => {
        res(arg);
      });
    } else {
      const postCallback = () => {
        const hookId = addReceiveHook<ReturnType>(listenerCommand, (payload) => {
          if (listenerHandler && !listenerHandler(payload)) return;
          removeReceiveHook(hookId);
          res(payload);
        });
      };

      if (!skipFirstResponse) postCallback();
      addHookApiCallback(uuid, (result: INativeCallResultGeneral) => {
        if (!result || result?.result === 0) {
          if (skipFirstResponse) postCallback();
        } else {
          rej(`Call native API failed: ${result.errMsg}`);
        }
      });
    }

    timeoutClockId = setTimeout(() => {
      rej(`Call native API '${commandName}' timeout. C=${channel}; E=${ipcHead.eventName}; A=${JSON.stringify(args)}`);
    }, timeout * 1000);

    ipcMain.emit(
      channel,
      {},
      ipcHead,
      ipcBody,
    );
  });
}
