import * as Path from 'path';
import * as fs from 'fs';
import * as QQNTApi from '../qqnt';
import { log } from '@/common/utils';

export function runCleanerQQNT() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void>(async (res) => {
    const targetPaths: string[] = [];

    targetPaths.push((await QQNTApi.getHotUpdateCachePath()));
    targetPaths.push((await QQNTApi.getDesktopTmpPath()));
    (await QQNTApi.getCacheSessionPathList()).forEach(e => targetPaths.push(e.value));

    if (targetPaths.length <= 0) {
      log('No QQNT cache scanned.');
      res();
      return;
    }

    log('Deleting ' + targetPaths.length + ' QQNT cache dir...');
    deleteCachePath(targetPaths);

    log('Complete');
    res();
  });
}

function deleteCachePath(pathList: string[]) {
  const emptyPath = (path: string) => {
    if (!fs.existsSync(path)) return;
    const files = fs.readdirSync(path);
    files.forEach(file => {
      const filePath = Path.resolve(path, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) emptyPath(filePath);
      else fs.unlinkSync(filePath);
    });
    fs.rmdirSync(path);
  };

  for (const path of pathList) {
    emptyPath(path);
  }
}