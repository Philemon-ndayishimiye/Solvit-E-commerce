import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";

export default function Navigation() {
  const [isCart, setIscart] = useState(false);
  const Navigate = useNavigate();
  const [input, setInput] = useState("");
  const { cartItem } = useCart();

  const showCart = () => {
    console.log(isCart);
    setIscart(!isCart);
  };

  const handleClick = () => {
    if (!input.trim()) {
      alert("Enter Product to search");
      return;
    } else {
      Navigate(`/Search/${input}`);
    }
  };

  let cartLength = cartItem.length;

  return (
    <>
      <div className=" flex bg-amber-300 py-3 px-10 justify-between">
        <div>
          <h1
            onClick={() => Navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            Philo <span className="text-red-500">Commerce</span>
          </h1>
        </div>
        <div className=" justify-center  bg-white border-none  rounded-2xl">
          <Input
            name="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="search product"
            type="text"
          />
          <Button label="Search" onClick={handleClick} />
        </div>

        <div>
          <div className="relative">
            <FiShoppingCart
              onClick={showCart}
              className="text-white text-3xl cursor-pointer"
            />
            <h1 className="text-red-600 text-[10px] absolute top-[-10px] font-bold left-3">
              {cartLength}
            </h1>
          </div>
        </div>

        <div className="cursor-pointer">
          <IoMdAdd
            className="text-4xl pt-3"
            onClick={() => Navigate("/addProduct")}
          />
        </div>
      </div>

      <div className="absolute top-16 right-0 z-50 bg-orange-400">
        {isCart && (
          <div className="">
            <Cart />
          </div>
        )}
      </div>
    </>
  );
}
