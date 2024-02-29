
export interface IQQNTApiReturn<IPayload = unknown> extends Array<unknown> {
  0: {
    eventName: any, // XXX
    callbackId?: string,
    type: 'request' | 'response',
  },
  1: IQQNTApiReturnData<IPayload>[],
}

export interface IQQNTApiReturnData<IPayload = unknown> {
  cmdName: any, // XXX
  cmdType: 'event',
  payload: IPayload,
}