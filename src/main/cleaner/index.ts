import { getConfigUtil, log } from '@/common/utils';
import { runCleaner } from './cleaner';

export function InitCleaner() {
  log('QQCleaner has been initialized!');

  const config = getConfigUtil().getConfig();
  if (config.cleanWhenStartUp) {
    log('Startup clean will be start in 5s...');
    setTimeout(() => runCleaner(config), 5000);
  }
  if (config.cleanClock) {
    setInterval(() => runCleaner(config), config.cleanClockInterval * 60 * 60 * 1000);
    log(`Clean clock registed, cleaning will be start every ${config.cleanCacheAfterDaysNumber} hours.`);
  }
}
