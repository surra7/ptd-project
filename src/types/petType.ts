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
  random_boxes: number;
  rice_quantity: number;
  snack_quantity: number;
};

export interface RandomItem {
  message: string;
  random_boxes: number;
  output_item: {
    type: string;
    name: string;
    quantity: number;
  }
};