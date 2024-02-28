
export const SettingItem = (title: string, subtitle?: string, action?: string) => {
  return `<setting-item>
  <div>
    <setting-text>${title}</setting-text>
    ${subtitle ? `<setting-text data-type="secondary">${subtitle}</setting-text>` : ''}
  </div>
  ${action ? action : ''}
</setting-item>`;
};