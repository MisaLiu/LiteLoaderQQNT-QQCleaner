
export enum EChatFileType {
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
  DOCUMENT = 3,
  OTHER = 4,
}

export interface ICacheFileList {
  infos: ICacheFileListItem[],
}

export interface ICacheFileListItem {
  fileSize: string,
  fileTime: string,
  fileKey: string,
  elementId: string,
  elementIdStr: string,
  fileType: EChatFileType,
  path: string,
  fileName: string,
  senderId: string,
  previewPath: string,
  senderName: string,
  isChecked?: boolean,
}