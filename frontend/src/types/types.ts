export interface MenuData {
  id: any;
  itemName: string;
  cost: number;
  category: string;
  image: string;
  desc: string;
}

export interface CartType {
  itemName: string;
  cost: number;
  quantity: number;
}

interface OrderType {
  itemName: string;
  quantity: number;
  cost: number;
}

export interface OrderHistoryType {
  id: any;
  items: OrderType[];
  totalPrice: number;
  userId: any;
  status: string;
  createdAt: any;
  updatedAt: any;
}
