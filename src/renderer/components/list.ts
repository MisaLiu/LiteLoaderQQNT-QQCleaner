
export const SettingList = (innerHTML: string, direction?: 'column' | 'row', title?: string, isCollapsible?: boolean) => {
  return `<setting-list 
  ${direction ? `data-direction="${direction}"` : ''} 
  ${isCollapsible ? 'is-collapsible' : ''} 
  ${title ? `data-title="${title}"` : ''}
>${innerHTML}</setting-list>`;
};