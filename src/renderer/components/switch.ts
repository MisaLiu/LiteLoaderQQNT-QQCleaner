
export const SettingSwitch = (isActive: boolean = false, id?: string) => {
  return `<setting-switch ${isActive ? 'is-active' : ''} ${id ? `id="${id}"` : ''}></setting-switch>`;
};