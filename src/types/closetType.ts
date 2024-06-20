export interface ClosetItemType {
  item: string;
  image: string;
}

export interface ClosetItemProps {
  isSelected: boolean;
  item: {
    item: string;
    image: string;
  };
}

export interface postItemType {
  item_name: string;
}
