import { getConfigUtil } from '@/common/utils';
import { runCleaner } from './cleaner';

export function InitCleaner() {
  try {
    const config = getConfigUtil().getConfig();
    if (config.cleanWhenStartUp) setTimeout(() => runCleaner(config), 5000);
    if (config.cleanClock) setInterval(() => runCleaner(config), config.cleanClockInterval * 60 * 60 * 1000);
  } catch (e) {
    console.error(e);
  }
}
