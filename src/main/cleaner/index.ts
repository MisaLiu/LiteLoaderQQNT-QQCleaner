import { getConfigUtil, log } from '@/common/utils';
import { runCleaner } from './cleaner';

export function InitCleaner() {
  log('QQCleaner has been initialized!');

  try {
    const config = getConfigUtil().getConfig();
    if (config.cleanWhenStartUp) {
      log('Startup clean will be start in 5s...');
      setTimeout(() => runCleaner(config), 5000);
    }
    if (config.cleanClock) setInterval(() => runCleaner(config), config.cleanClockInterval * 60 * 60 * 1000);
  } catch (e) {
    console.error(e);
  }
}
