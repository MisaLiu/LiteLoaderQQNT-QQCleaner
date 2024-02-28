
export const SettingSwitch = (isActive: boolean = false, configKey?: string) => {
  return `<setting-switch ${isActive ? 'is-active' : ''} ${configKey ? `data-config-key="${configKey}"` : ''}></setting-switch>`;
};