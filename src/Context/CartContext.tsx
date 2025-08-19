import { createContext, useEffect, useState } from "react";
import type { TotalCart, Cart } from "../type/Cart";
import { useUser } from "../hooks/useUser";
import api from "../app/api/api";

interface Cartdata {
  cart: Cart[];
}

interface cartCont {
  children: React.ReactNode;
}
interface Cartdata {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
}

export const CartContext = createContext<Cartdata>({
  cart: [],
  setCart: () => {},
});

export const CartProvider = ({ children }: cartCont) => {
  const { user } = useUser();
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const getCartUser = async () => {
      if (!user?.id) return;
      const res = await api.get<TotalCart>(
        `https://dummyjson.com/carts/user/${user.id}`
      );
      setCart(res.data.carts);
    };
    getCartUser();
  }, [user?.id]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
