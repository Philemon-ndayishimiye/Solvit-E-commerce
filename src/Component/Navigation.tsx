import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import type { ProductsResponse } from "../type/Product";
import api from "../app/api/api";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const Navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (!input.trim()) {
      alert("Enter Product to search");
      return;
    } else {
      Navigate(`/Search/${input}`);
    }
  };

  return (
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
      <div className="cursor-pointer">
        <IoMdAdd
          className="text-4xl pt-3"
          onClick={() => Navigate("/addProduct")}
        />
      </div>
    </div>
  );
}
