import React, { createContext, useState, useEffect } from "react";
import type { CartType, CartItem } from "../type/Cart";

type Children = { children: React.ReactNode };

export const CartContext = createContext<CartType | null>(null);

export const CartProvider = ({ children }: Children) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (Product: { id: number; title: string; price: number }) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === Product.id);

      let updatedCart;
      if (idx === -1) {
        updatedCart = [...prev, { ...Product, quantity: 1 }];
      } else {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        updatedCart = copy;
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cartItem: cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
