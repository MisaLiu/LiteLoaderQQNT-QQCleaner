
export const SettingItem = (title: string, subtitle?: string, action?: string, subtitleId?: string) => {
  return `<setting-item>
  <div>
    <setting-text>${title}</setting-text>
    ${subtitle ? `<setting-text data-type="secondary" ${subtitleId ? `id="${subtitleId}"` : ''}>${subtitle}</setting-text>` : ''}
  </div>
  ${action ? action : ''}
</setting-item>`;
};