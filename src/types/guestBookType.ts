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

export interface SelectedUserItemType {
  user: number;
  nickname: string;
  pet_rating: {
    level: number;
    point: number;
  };
  point: number;
  hunger_degree_status: string;
  primary_pet: {
    pet_name: string;
    image: string;
  };
  primary_background: {
    item_name: string;
    image: string;
  };
  primary_accessory: string;
  guestbook_url: string;
}