import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("use UseProduct in correct way please");
  } else {
    return context;
  }
};
