import { MutableRefObject } from 'react';

export interface ClosetItemType {
  selected: boolean;
  item: string;
  image: string;
}

export interface ClosetItemProps {
  isSelected: boolean;
  item: {
    selected: boolean;
    item: string;
    image: string;
  };
}

export interface PostItemType {
  item_name: string;
}

export interface ClosetSectionProps {
  selectedMenu: string;
  modalHandler: () => void;
  selectedItemName: MutableRefObject<string>;
}

export interface PetSelectAlertProps {
  onClose: () => void;
  selectedItemName: MutableRefObject<string>;
}
