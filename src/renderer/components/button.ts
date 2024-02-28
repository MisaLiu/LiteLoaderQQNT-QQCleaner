
export const SettingButton = (innerHTML: string, type: 'primary' | 'secondary' = 'primary', isDisabled: boolean = false, id?: string) => {
  return `<setting-button data-type="${type}" ${isDisabled ? 'is-disabled' : ''} ${id ? `id="${id}"` : ''}>${innerHTML}</setting-button>`;
};