import React, { createContext, useState } from "react";
import type { CartType, CartItem } from "../type/Cart";

type children = { children: React.ReactNode };

export const CartContext = createContext<CartType | null>(null);

export const CartProvider = ({ children }: children) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (Product: { id: number; title: string; price: number }) => {
    setCart((prev) => {
      const idx = prev.findIndex((index) => index.id === Product.id);

      if (idx === -1) {
        return [...prev, { ...Product, quantity: 1 }];
      } else {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
    });
  };
  return (
    <CartContext.Provider value={{ cartItem: cart, addToCart: addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
