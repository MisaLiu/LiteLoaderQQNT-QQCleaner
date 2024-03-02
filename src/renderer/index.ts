import {
  SettingSection,
  SettingPanel,
  SettingList,
  SettingItem,
  SettingSwitch,
  SettingButton
} from './components';
import StylePlain from './style.css?raw';

const REPO_URL = 'https://github.com/MisaLiu/LiteLoaderQQNT-QQCleaner';

const timestampToString = (timestamp: number): string => {
  if (isNaN(timestamp)) return '还未清理';
  else return (new Date(timestamp)).toLocaleString();
};

const byteToString = (byte: number): string => {
  let suffixLevel = 0;
  let resultNum: number = byte;
  const byteSuffix = [ 'B', 'KB', 'MB', 'GB', 'TB' ];

  while ((suffixLevel + 1) < byteSuffix.length) {
    if (resultNum / 1024 < 1) break;
    resultNum = Math.round(resultNum / 102.4) / 10;
    suffixLevel++;
  }

  return `${resultNum}${byteSuffix[suffixLevel]}`;
};

export async function onSettingWindowCreated(view: HTMLElement) {
  const config = await LLQQCleaner.getConfig();
  const statsData: {
    pluginVersion: string,
    pluginLogDir: string,
    lastRunTime: number,
    cleanedTotal: number,
  } = await LLQQCleaner.getStats();
  const changeConfig = (configKey: string, newValue: number | boolean) => {
    const configKeyArr = configKey.split('.');

    if (configKeyArr.length === 1) config[configKeyArr[0]] = newValue;
    else config[configKeyArr[0]][configKeyArr[1]] = newValue;

    LLQQCleaner.setConfig(config);
  };

  const domParser = new DOMParser();
  const doms = domParser.parseFromString([
    '<div>',
    `<style>${StylePlain}</style>`,

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '插件版本',
            `${statsData.pluginVersion}`,
          ),
          SettingItem(
            '上次清理时间',
            `${timestampToString(statsData.lastRunTime)}`,
          ),
          SettingItem(
            '累计清理缓存',
            `${byteToString(statsData.cleanedTotal)}`,
          ),
        ], 'row'),
      )
    ),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '⚠<b>数据无价，请小心操作，仔细检查各项设置，避免遗失重要数据</b>⚠'
          )
        ])
      )
    ),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '启动时清理垃圾',
            '启动时检测并清理一次垃圾',
            SettingSwitch(config.cleanWhenStartUp, 'cleanWhenStartUp'),
          ),
          SettingItem(
            '定时清理垃圾',
            '在运行时每隔一段时间清理一次垃圾。重启后生效',
            SettingSwitch(config.cleanClock, 'cleanClock'),
          ),
          SettingItem(
            '定时清理垃圾间隔',
            '控制定时清理的时间间隔，不建议设置的太小，单位为小时。重启后生效',
            `<div class="q-input"><input class="q-input__inner" type="number" data-config-key="cleanClockInterval" min="1" value="${config.cleanClockInterval}" placeholder="${config.cleanClockInterval}" /></div>`,
          ),
          SettingItem(
            '只清理指定天数后的文件',
            '仅对聊天缓存文件有效，开启后将只会清理指定天数之后的旧文件',
            SettingSwitch(config.cleanCacheAfterDays, 'cleanCacheAfterDays'),
          ),
          SettingItem(
            '清理多久以后的文件',
            '仅对聊天缓存文件有效，单位为天',
            `<div class="q-input"><input class="q-input__inner" type="number" data-config-key="cleanCacheAfterDaysNumber" min="1" value="${config.cleanCacheAfterDaysNumber}" placeholder="${config.cleanCacheAfterDaysNumber}" /></div>`,
          ),
          // SettingItem(
          //   '同时清理本体缓存',
          //   '也就是「缓存数据」那一栏内包含的内容',
          //   SettingSwitch(config.cleanQQNTCache, 'cleanQQNTCache'),
          // ),
        ])
      )
      , '通用设置'),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '清理缓存的图片', undefined,
            SettingSwitch(config.cacheSettings.image, 'cacheSettings.image'),
          ),
          SettingItem(
            '清理缓存的视频', undefined,
            SettingSwitch(config.cacheSettings.video, 'cacheSettings.video'),
          ),
          SettingItem(
            '清理缓存的文档', undefined,
            SettingSwitch(config.cacheSettings.document, 'cacheSettings.document'),
          ),
          SettingItem(
            '清理缓存的音频', undefined,
            SettingSwitch(config.cacheSettings.audio, 'cacheSettings.audio'),
          ),
          SettingItem(
            '清理缓存的其他文件', undefined,
            SettingSwitch(config.cacheSettings.other, 'cacheSettings.other'),
          ),
        ]),
      )
      , '缓存文件设置'),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '写入日志',
            '开启后会将日志写入插件日志文件夹，也可以通过命令行启动 QQNT 查看日志',
            SettingSwitch(config.log, 'log'),
          ),
          SettingItem(
            '日志文件位置',
            `${statsData.pluginLogDir}`,
            SettingButton('打开', 'secondary', false, 'button-open-log-dir'),
          ),
        ])
      )
      , '调试设置'),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            'GitHub 仓库',
            `${REPO_URL}`,
            SettingButton('访问', 'secondary', false, 'button-open-github-repo'),
          )
        ])
      )
      , '关于'),

    '</div>',
  ].join(''), 'text/html');

  // Make switches work
  doms.body.querySelectorAll('setting-switch[data-config-key]').forEach((dom: HTMLElement) => {
    dom.addEventListener('click', () => {
      const activated = dom.getAttribute('is-active') === null;

      if (activated) dom.setAttribute('is-active', '');
      else dom.removeAttribute('is-active');

      changeConfig(dom.dataset.configKey, activated);
    });
  });

  // Make inputs work
  doms.body.querySelectorAll('div.q-input input.q-input__inner[type=number][data-config-key]').forEach((dom: HTMLInputElement) => {
    dom.addEventListener('input', () => {
      const inputValue = parseInt(dom.value);
      if (!inputValue || isNaN(inputValue) || inputValue < 1) return;
      changeConfig(dom.dataset.configKey, inputValue);
    });
  });

  // Make buttons work
  doms.body.querySelector('#button-open-log-dir').addEventListener('click', () => {
    LiteLoader.api.openPath(statsData.pluginLogDir);
  });
  doms.body.querySelector('#button-open-github-repo').addEventListener('click', () => {
    LiteLoader.api.openExternal(REPO_URL);
  });

  doms.body.childNodes.forEach(dom => {
    view.appendChild(dom);
  });
}
