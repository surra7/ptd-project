export interface PetType {
  user: number;
  pet_rating: {
    level: number;
    point: number;
  };
  point: number;
  hunger_degree_status: string;
  active_pet: {
    pet_name: string;
    image: string;
  };
  primary_background: {
    item_name: string;
    image: string;
  };
  primary_accessory: {
    item_name: string;
    image: string;
  }
  random_boxes: number;
  rice_quantity: number;
  snack_quantity: number;
};

export interface RandomItemType {
  message: string;
  random_boxes: number;
  output_item: {
    type: string;
    name: string;
    quantity: number;
    image: string;
  };
};

export interface FeedType{
  snack: {
    id: number;
    pet: number;
    snack_type: number;
    quantity: number;
  };
  pet: {
    user: number;
    point: number;
    hunger_degree: string;
    random_boxes: number;
    pet_rating: {
      level: number;
      point: number;
    };
    primary_accessory: {
      item_name: string;
      image: string;
    };
    primary_background: {
      item_name: string;
      image: string;
    };
    primary_pet: {
      pet_name: string;
      image: string;
    };
    rice_quantity: number;
    snack_quantity: number;
    active_pet: {
      pet_name: string;
      image: string;
    };
    hunger_degree_status: string;
  };
};