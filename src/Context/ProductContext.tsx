import React, { createContext, useEffect, useReducer} from "react";
import api from "../app/api/api";
import type { ContextSent, contextType } from "../type/context";
import type { ProductsResponse } from "../type/Product";
import { ProductReducer } from "../Reducer/ProductReducer";

export const ProductContext = createContext<ContextSent>({
  Products: [],
  dispatch: () => {},
});

export const ProductProvider: React.FC<contextType> = ({ children }) => {
  const [products, dispatch] = useReducer(ProductReducer, []);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await api.get<ProductsResponse>("/products");
        dispatch({
          type: "Set Product",
          payload: res.data.products,
        });
      } catch (error) {
        console.error(error);
      }
    };

    FetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ Products: products, dispatch: dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
