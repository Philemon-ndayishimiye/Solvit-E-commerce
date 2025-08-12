import React, { createContext, useEffect, useReducer, useState } from "react";
import api from "../app/api/api";
import type { ContextSent, contextType } from "../type/context";
import type { ProductType } from "../type/Product";
import { ProductReducer } from "../Reducer/ProductReducer";

export const ProductContext = createContext<ContextSent>({
  Products: [],
  dispatch: () => {},
});

export const ProductProvider: React.FC<contextType> = ({ children }) => {
  const [items, setItems] = useState<ProductType[]>([]);

  const [products, dispatch] = useReducer(ProductReducer, items);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await api.get<ProductType[]>("/products");
        setItems(res.data);
        console.log(res);
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
