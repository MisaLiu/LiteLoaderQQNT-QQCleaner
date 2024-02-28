import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('LLQQCleaner', {
  HelloWorld: (name: string) => console.log('Hello ' + name + '!'),
});