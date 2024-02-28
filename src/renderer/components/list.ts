
export const SettingList = (items: string[], direction?: 'column' | 'row', title?: string, isCollapsible?: boolean) => {
  return `<setting-list 
  data-direction="${direction ? direction : 'column'}" 
  ${isCollapsible ? 'is-collapsible' : ''} 
  ${title ? `data-title="${title}"` : ''}
>${items.join('')}</setting-list>`;
};