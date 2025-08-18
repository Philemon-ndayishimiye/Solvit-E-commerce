import React from "react";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cartItem } = useCart();
  return (
    <div>
      <div>
        <h1>Cart Item </h1>

        {cartItem.map((item) => (
          <div>
            <h1>{item.title}</h1>
            <h1>{item.quantity}</h1>
            <h1>{item.price}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
