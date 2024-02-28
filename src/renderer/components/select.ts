
export const SettingSelect = (options: string[], id?: string) => {
  return `<setting-select ${id ? `id="${id}"` : ''}>${options.join('')}</setting-select>`;
};