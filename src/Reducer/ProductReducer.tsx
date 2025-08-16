import type { ProductType } from "../type/Product";
import type { Actions } from "../type/Action";

export const ProductReducer = (
  product: ProductType[],
  action: Actions
): ProductType[] => {
  switch (action.type) {
    case "Set Product":
      return action.payload;
    case "Remove Product":
      return product.filter((prod) => prod.id !== action.payload.id);
    case "Add Product":
      return [...product, action.payload];
    case "Update Product":
      const UpdatedProduct = product.map((prod) =>
        prod.id === action.payload.id ? action.payload : prod
      );
      return UpdatedProduct;
    default:
      return product;
  }
};
