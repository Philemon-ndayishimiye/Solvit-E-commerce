import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import api from "../app/api/api";
import type { ProductsResponse } from "../type/Product";
import type { Category } from "../type/Category";
import { IoMdAdd } from "react-icons/io";
import Form from "../Component/Form";
import Button from "../Component/Button";
import Input from "../Component/Input";
import Aside from "../Component/Aside";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState<Category[]>([]);
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

  useEffect(() => {
    const handleSelect = async () => {
      try {
        const Select = await api.get<Category[]>("/products/categories");

        setSelect(Select.data);
      } catch (error) {
        console.error(error);
      }
    };

    handleSelect();
  }, []);

  const handleSelectCategory = async (categoryName: string) => {
    try {
      if (categoryName === "all") {
        const res = await api.get<ProductsResponse>("/products");
        setSearchProduct(res.data.products);
      } else {
        const res = await api.get<ProductsResponse>(
          `/products/category/${encodeURIComponent(categoryName)}`
        );
        setSearchProduct(res.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[700px] bg-gray-100">
          <div>
            <h1 className="font-bold text-black text-xl  py-2 cursor-pointer text-center">
              Categories
            </h1>
          </div>
          {select.map((sele) => (
            <Aside
              name={sele.name}
              onClick={() => handleSelectCategory(sele.name)}
            />
          ))}
        </div>

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
