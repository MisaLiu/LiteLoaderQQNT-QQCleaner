
export const SettingSection = (innerHTML: string, title?: string) => {
  return `<setting-section ${title ? 'data-title="' + title + '"' : ''}>${innerHTML}</setting-section>`;
};