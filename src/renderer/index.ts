import {
  SettingSection,
  SettingPanel,
  SettingList,
  SettingItem,
  SettingSwitch
} from './components';
import StylePlain from './style.css?raw';

export function onSettingWindowCreated(view: HTMLElement) {
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
      , '插件信息'),

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
            '总开关',
            '控制本插件的开关',
            SettingSwitch()
          ),
          SettingItem(
            '同时清理本体缓存',
            '也就是「缓存数据」那一栏内包含的内容',
            SettingSwitch(),
          ),
          SettingItem(
            '启动时清理垃圾',
            '启动时检测并清理一次垃圾',
            SettingSwitch(),
          ),
          SettingItem(
            '定时清理垃圾',
            '在运行时每隔一段时间清理一次垃圾',
            SettingSwitch(),
          ),
          SettingItem(
            '定时清理垃圾间隔',
            '控制定时清理的时间间隔，单位为小时',
            '<div class="q-input"><input class="q-input__inner" type="number" min="1" value="1" /></div>',
          ),
          SettingItem(
            '清理多久以后的文件',
            '仅对聊天缓存文件有效，单位为天',
            '<div class="q-input"><input class="q-input__inner" type="number" min="0" value="3" /></div>',
          ),
        ])
      )
      , '通用设置'),

    SettingSection(
      SettingPanel(
        SettingList([
          SettingItem(
            '清理缓存的图片', undefined,
            SettingSwitch(),
          ),
          SettingItem(
            '清理缓存的视频', undefined,
            SettingSwitch(),
          ),
          SettingItem(
            '清理缓存的文档', undefined,
            SettingSwitch(),
          ),
          SettingItem(
            '清理缓存的音频', undefined,
            SettingSwitch(),
          ),
          SettingItem(
            '清理缓存的其他文件', undefined,
            SettingSwitch(),
          ),
        ]),
      )
      , '清理设置'),

    '</div>',
  ].join(''), 'text/html');

  doms.body.childNodes.forEach(dom => {
    view.appendChild(dom);
  });
}
