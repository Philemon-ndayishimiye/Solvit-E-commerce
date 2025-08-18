export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartType {
  cartItem: CartItem[];
  addToCart: (Product: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }) => void;
}
