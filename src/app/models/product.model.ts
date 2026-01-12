export interface Bike {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface Accessory {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface Cart {
  id: number;
  userId: number;
  bikes: Bike[];
  accessories: Accessory[];
}
