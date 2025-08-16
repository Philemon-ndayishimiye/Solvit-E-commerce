import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
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
  const { Products, dispatch } = useProduct();
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      dispatch({
        type: "Remove Product",
        payload: { id: id },
      });
      setDetails(false);
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

            <div>
              {details && selectedProduct && (
                <div className=" absolute top-0 left-[10%] h-[750px] bg-gray-200 w-[80%] border-gray-100 shadow-lg rounded-md">
                  <div className="float-right mr-[45px]">
                    <IoCloseSharp
                      onClick={() => {
                        setDetails(false);
                      }}
                      className="text-5xl font-bold text-gray-500 absolute cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-[190px]">
                    <div className="pl-[40px] py-[10px]">
                      <div className="border-none ">
                        <img
                          className="w-[350px]"
                          src={selectedProduct.thumbnail}
                        />
                      </div>

                      <div className="flex mt-6 gap-2">
                        {selectedProduct.images?.map((image, index) => (
                          <div
                            key={index}
                            className="border border-amber-400 cursor-pointer"
                          >
                            <img className="w-[100px]" src={image} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className=" mr-12 pt-10">
                      <div className="flex gap-2">
                        <div className="text-amber-400 flex">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <h1>{selectedProduct.rating}</h1> <h1>Star Rating </h1>
                      </div>

                      <div>
                        <h1 className="font-bold text-blue-950 text-lg py-6">
                          {selectedProduct.title}
                        </h1>

                        <div className="flex gap-[50px]">
                          <div>
                            <p className="text-sm py-3 ">
                              Sku:{selectedProduct.sku}
                            </p>
                            <p className="text-sm ">
                              brand:{selectedProduct.brand}
                            </p>
                          </div>
                          <div>
                            <p className="py-3">
                              Category:{selectedProduct.category}
                            </p>
                            <p>
                              Availability:
                              <span className="text-green-600">
                                {selectedProduct.availabilityStatus}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <h1 className="text-amber-400 ">
                            ${selectedProduct.price}
                          </h1>
                        </div>

                        <div className="flex gap-10 my-7">
                          <h1 className="text-sm py-4">
                            depth:{selectedProduct.dimensions?.depth}
                          </h1>
                          <h1 className="text-sm py-4">
                            height:{selectedProduct.dimensions?.height}
                          </h1>
                          <h1 className="text-sm py-4">
                            width:{selectedProduct.dimensions?.width}
                          </h1>
                        </div>

                        <div className="my-6">
                          <p className="text-[15px] py-3">
                            {" "}
                            Warrant Information:
                            {selectedProduct.warrantyInformation}
                          </p>
                          <p className="text-[15px] py-3">
                            Ahipping Information:
                            {selectedProduct.shippingInformation}
                          </p>
                          <p className="text-[15px] py-3 text-green-500">
                            Minimum OrderQuantity:
                            {selectedProduct.minimumOrderQuantity}
                          </p>
                        </div>

                        <div className="grid grid-cols-2">
                          {selectedProduct.reviews?.map((review) => (
                            <div>
                              <p className="text-md py text-amber-300">
                                rating: {review.rating}
                              </p>
                              <p className="text-md py">
                                comment:{review.comment}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between py-[50px]">
                          <button
                            onClick={() => handleDelete(selectedProduct.id!)}
                            className="bg-red-500 text-white px-12 py-3 cursor-pointer rounded-md"
                          >
                            Delete
                          </button>
                          <button className="rounded-md bg-green-500 text-white px-10 py-3 cursor-pointer">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
