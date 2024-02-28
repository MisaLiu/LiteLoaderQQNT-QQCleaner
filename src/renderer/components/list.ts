
export const SettingList = (innerHTML: string, direction?: 'column' | 'row', title?: string, isCollapsible?: boolean) => {
  return `<setting-list 
  data-direction="${direction ? direction : 'column'}" 
  ${isCollapsible ? 'is-collapsible' : ''} 
  ${title ? `data-title="${title}"` : ''}
>${innerHTML}</setting-list>`;
};