import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import api from "../app/api/api";
import type { ProductsResponse } from "../type/Product";

export default function Home() {
  const [input, setInput] = useState("");
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products } = useProduct();
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  // initialize product

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    setDetails(true);
    setSelectedProduct(product);
  };

  const handleSearch = async () => {
    try {
      const res = await api.get<ProductsResponse>(
        `/products/search?q=${input}`
      );
      setSearchProduct(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className=" justify-center border w-[726px] ml-[19%] rounded-2xl mt-[50px]">
          <input
            className="border-none focus:outline-none w-[650px] py-2  px-6 rounded-xl "
            type="text"
            placeholder="Search Product"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="border bg-red-400 text-white font-bold py-2 px-3 rounded-2xl cursor-pointer"
          >
            search
          </button>
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
          <div className=" absolute top-[5%] left-[10%] h-[750px] bg-gray-200 w-[80%] border-gray-100 shadow-lg rounded-md">
            <div className="float-right mr-[45px]">
              <IoCloseSharp
                onClick={() => {
                  setDetails(false);
                }}
                className="text-5xl font-bold text-gray-500 absolute cursor-pointer"
              />
            </div>

            <div className="flex gap-[190px]">
              <div className="pl-[40px] py-[30px]">
                <div className="border-none ">
                  <img className="w-[350px]" src={selectedProduct.thumbnail} />
                </div>

                <div className="flex mt-6 gap-2">
                  {selectedProduct.images?.map((image) => (
                    <div className="border border-amber-400 cursor-pointer">
                      <img className="w-[100px]" src={image} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-[30px] mr-12 pt-10">
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
                      <p className="text-sm py-3 ">Sku:{selectedProduct.sku}</p>
                      <p className="text-sm ">brand:{selectedProduct.brand}</p>
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
                      Warrant Information:{selectedProduct.warrantyInformation}
                    </p>
                    <p className="text-[15px] py-3">
                      Ahipping Information:{selectedProduct.shippingInformation}
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
                        <p className="text-md py">comment:{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between py-[50px]">
                    <button className="bg-red-500 text-white px-12 py-3 cursor-pointer rounded-md">
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
  );
}
