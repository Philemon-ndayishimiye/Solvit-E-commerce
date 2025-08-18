import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import SideBar from "./SideBar";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [isCart, setIscart] = useState(false);
  const Navigate = useNavigate();
  const [input, setInput] = useState("");
  const { cartItem } = useCart();

  const showCart = () => {
    console.log(isCart);
    setIscart(!isCart);
  };

  const ToggleMenu = () => {
    setOpen(!open);
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
      <div className=" flex bg-amber-300 py-3 px-10 justify-between max-sm:px-1 max-sm:py-2">
        <div className="text-3xl cursor-pointer">
          {open ? (
            <IoMdClose onClick={ToggleMenu} />
          ) : (
            <IoIosMenu onClick={ToggleMenu} />
          )}
        </div>
        <div>
          <h1
            onClick={() => Navigate("/")}
            className="text-2xl font-bold cursor-pointer max-sm:hidden max-md:hidden"
          >
            Philos <span className="text-red-500">commerce</span>
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
          <div className="relative max-md:pt-2">
            <FiShoppingCart
              onClick={showCart}
              className="text-white  text-3xl cursor-pointer"
            />
            <h1 className="text-red-600 text-[10px] max-md:top-[-8px] absolute top-[-10px] font-bold left-3">
              {cartLength}
            </h1>
          </div>
        </div>

        <div className="cursor-pointer ">
          <IoMdAdd
            className="text-4xl pt-3 max-sm:pt-1 max-sm:text-3xl"
            onClick={() => Navigate("/addProduct")}
          />
        </div>
      </div>

      <div className="absolute top-16 right-0 z-50 bg-orange-400 max-sm:top-13">
        {isCart && (
          <div className="">
            <Cart />
          </div>
        )}
      </div>

      <div className="absolute max-md:top-17 top-13 z-100 bg-gray-100 max-md:block max-sm:block max-lg:hidden max-xl:hidden max-2xl:hidden">
        {open && (
          <div>
            <h1
              onClick={() => Navigate("/")}
              className=" pl-2 text-2xl font-bold cursor-pointer"
            >
              Philos <span className="text-red-500">commerce</span>
            </h1>
            <SideBar />
          </div>
        )}
      </div>
    </>
  );
}
