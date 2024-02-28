
export const SettingSelect = (options: string[], configKey?: string) => {
  return `<setting-select ${configKey ? `data-config-key="${configKey}"` : ''}>${options.join('')}</setting-select>`;
};