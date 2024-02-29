import {
  SettingSection,
  SettingPanel,
  SettingList,
  SettingItem,
  SettingSwitch,
  SettingButton
} from './components';
import StylePlain from './style.css?raw';

export async function onSettingWindowCreated(view: HTMLElement) {
  const config = await LLQQCleaner.getConfig();
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
            '加载中...',
          ),
          SettingItem(
            '上次清理时间',
            '加载中...',
          ),
          SettingItem(
            '累计清理缓存',
            '加载中...',
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
            '在运行时每隔一段时间清理一次垃圾',
            SettingSwitch(config.cleanClock, 'cleanClock'),
          ),
          SettingItem(
            '定时清理垃圾间隔',
            '控制定时清理的时间间隔，不建议设置的太小，单位为小时',
            `<div class="q-input"><input class="q-input__inner" type="number" data-config-key="cleanClockInterval" min="1" value="${config.cleanClockInterval}" placeholder="${config.cleanClockInterval}" /></div>`,
          ),
          SettingItem(
            '同时清理本体缓存',
            '也就是「缓存数据」那一栏内包含的内容',
            SettingSwitch(config.cleanQQNTCache, 'cleanQQNTCache'),
          ),
          SettingItem(
            '清理多久以后的文件',
            '仅对聊天缓存文件有效，单位为天',
            `<div class="q-input"><input class="q-input__inner" type="number" data-config-key="cleanCacheAfterDays" min="0" value="${config.cleanCacheAfterDays}" placeholder="${config.cleanCacheAfterDays}" /></div>`,
          ),
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
            '日志',
            '开启后会将日志写入插件数据文件夹，也可以通过命令行启动 QQNT 查看日志',
            SettingSwitch(config.log, 'log'),
          ),
          SettingItem(
            '日志文件位置',
            '加载中...',
            SettingButton('打开', 'secondary'),
          ),
        ])
      )
      , '调试设置'),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            'GitHub 仓库',
            '==PLACEHOLDER==',
            SettingButton('访问', 'secondary'),
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

  doms.body.childNodes.forEach(dom => {
    view.appendChild(dom);
  });
}
