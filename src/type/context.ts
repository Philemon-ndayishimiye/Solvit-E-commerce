import type { ProductType } from "../type/Product";
import type { Actions } from "../type/Action";

export interface ContextSent {
  Products: ProductType[];
  dispatch: React.Dispatch<Actions>;

}

export interface contextType {
  children: React.ReactNode;
}
