
import type { NewProduct } from "../type/Product";

export type Actions =
  | {
      type: "Add Product";
      payload: NewProduct;
    }
  | {
      type: "Remove Product";
      payload: { id: number };
    }
  | {
      type: "Update Product";
      payload: { id: number };
    };
