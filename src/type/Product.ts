import type React from "react";

type Tags = "beauty" | "mascara";

type Reviews = {
  rating: number;
  comment: string;
  date: string;
  reviewerEmail: string;
  reviwerName: string;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  bardcode: number;
  qrCode: string;
};

type Dimensions = { width: number; height: number; depth: number };
export interface ProductType {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: Tags[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Reviews[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  thumbnail?: string;
  images?: string[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type NewProduct = Omit<ProductType, "id">;

export type ProductsResponse = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};
