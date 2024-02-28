
export const SettingOption = (innerHTML: string, value: string, isSelected?: boolean) => {
  return `<setting-option data-value="${value}" ${isSelected ? 'is-selected' : ''}>${innerHTML}</setting-option>`;
};