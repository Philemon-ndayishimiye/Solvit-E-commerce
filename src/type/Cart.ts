export interface ProductCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountpercentage: number;
  discountedtotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: ProductCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface TotalCart {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}
