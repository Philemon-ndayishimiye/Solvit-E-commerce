import React, { createContext, useEffect, useState } from "react";
import api from "../app/api/api";
import type { ContextSent, contextType } from "../type/context";
import type { ProductType } from "../type/Product";

export const ProductContext = createContext<ContextSent>({
  Products: [],
  dispatch: () => {},
});

export const ProductProvider: React.FC<contextType> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await api.get<ProductType[]>("/products");
        setProducts(res.data);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    FetchData();
  }, []);

  const dispatch = () => {};

  return (
    <ProductContext.Provider value={{ Products: products, dispatch: dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
