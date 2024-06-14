export interface GuestBookListType {
  name: string;
  date: string;
  content: string;
}

export interface GuestListItemProps {
  item: {
    name: string;
    date: string;
    content: string;
  };
  modalHandler: () => void;
}

export interface NickNameListType {
  id: number;
  nickname: string;
}

export interface DeleteAlertProps {
  onClose: () => void;
  bgColor?: string;
}
