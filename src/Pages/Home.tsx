import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import api from "../app/api/api";
import type { ProductsResponse } from "../type/Product";
import { IoMdAdd } from "react-icons/io";
import Form from "../Component/Form";
import Button from "../Component/Button";
import Input from "../Component/Input";
import { useNavigate } from "react-router-dom";
import SideBar from "../Component/SideBar";

export default function Home() {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products } = useProduct();

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    Navigate(`/product/${product.id}`);
  };

  const handleSearch = async () => {
    if (!input.trim()) {
      setSearchProduct(Products);
      return;
    }

    try {
      const res = await api.get<ProductsResponse>(
        `/products/search?q=${encodeURIComponent(input)}`
      );
      setSearchProduct(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          {open && (
            <div className="absolute">
              <Form />
            </div>
          )}

          <div>
            <div className="flex gap-[22%]">
              <div className=" justify-center border w-[475px] ml-[19%] rounded-2xl mt-[50px]">
                <Input
                  name="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="search product"
                  type="text"
                />
                <Button label="Search" onClick={handleSearch} />
              </div>

              <div className="mt-[50px] float-right cursor-pointer">
                <IoMdAdd
                  onClick={() =>
                    setOpen((prev) => (prev === false ? true : false))
                  }
                  className="text-4xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
              {SearchProduct.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                  onClick={() => handleDisplay(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
