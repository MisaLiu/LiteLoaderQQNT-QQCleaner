import { BrowserWindow } from 'electron';

export function onBrowserWindowCreated(window: BrowserWindow) {
  console.log('A window has just been created');
}