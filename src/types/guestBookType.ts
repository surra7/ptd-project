import { MutableRefObject } from 'react';

export interface GuestBookListType {
  id: number;
  user_nickname: string;
  created_at: string;
  updated_at: string;
  content: string;
  guestbook: number;
  user: number;
}

export interface GuestListItemProps {
  item: {
    id: number;
    user_nickname: string;
    created_at: string;
    updated_at: string;
    content: string;
    guestbook: number;
    user: number;
  };
  modalHandler: () => void;
  itemId: MutableRefObject<number>;
}

export interface postGuestBookProps {
  content: string;
  guestbook_user: number | undefined;
}

export interface NickNameListType {
  id: number;
  nickname: string;
}

export interface DeleteAlertProps {
  onClose: () => void;
  itemId: MutableRefObject<number>;
}

export interface SelectedUser {
  id: number;
  nickname: string;
}

export interface DeleteId {
  comment_id: number;
}

export interface SelectedBackgroundType {
  selected: boolean;
  item: string;
  image: string;
}

export interface ApiResponse {
  data: SelectedBackgroundType[];
}

export interface SelectedAccessoryType {
  selected: boolean;
  item: string;
  image: string;
}