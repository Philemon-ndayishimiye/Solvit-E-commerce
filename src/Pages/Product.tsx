import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductType } from "../type/Product";
import { FaStar } from "react-icons/fa";
import { useProduct } from "../hooks/useProduct";

export default function Product() {
  const Navigate = useNavigate();
  const { dispatch } = useProduct();
  const { id } = useParams();
  const [Product, setProduct] = useState<ProductType>({});

  useEffect(() => {
    const handleProductDetails = async () => {
      try {
        const res = await api.get<ProductType>(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleProductDetails();
  }, [id]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      dispatch({
        type: "Remove Product",
        payload: { id: id },
      });
      Navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className=" absolute top-0 bg-gray-200 w-[80%] border-gray-100 shadow-lg rounded-md">
          <div className="float-right mr-[45px]"></div>

          <div className="flex gap-[190px]">
            <div className="pl-[40px] py-[10px]">
              <div className="border-none ">
                <img className="w-[350px]" src={Product.thumbnail} />
              </div>

              <div className="flex mt-6 gap-2">
                {Product.images?.map((image, index) => (
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
                <h1>{Product.rating}</h1> <h1>Star Rating </h1>
              </div>

              <div>
                <h1 className="font-bold text-blue-950 text-lg py-6">
                  {Product.title}
                </h1>

                <div className="flex gap-[50px]">
                  <div>
                    <p className="text-sm py-3 ">Sku:{Product.sku}</p>
                    <p className="text-sm ">brand:{Product.brand}</p>
                  </div>
                  <div>
                    <p className="py-3">Category:{Product.category}</p>
                    <p>
                      Availability:
                      <span className="text-green-600">
                        {Product.availabilityStatus}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-amber-400 ">${Product.price}</h1>
                </div>

                <div className="flex gap-10 my-7">
                  <h1 className="text-sm py-4">
                    depth:{Product.dimensions?.depth}
                  </h1>
                  <h1 className="text-sm py-4">
                    height:{Product.dimensions?.height}
                  </h1>
                  <h1 className="text-sm py-4">
                    width:{Product.dimensions?.width}
                  </h1>
                </div>

                <div className="my-6">
                  <p className="text-[15px] py-3">
                    {" "}
                    Warrant Information:
                    {Product.warrantyInformation}
                  </p>
                  <p className="text-[15px] py-3">
                    Ahipping Information:
                    {Product.shippingInformation}
                  </p>
                  <p className="text-[15px] py-3 text-green-500">
                    Minimum OrderQuantity:
                    {Product.minimumOrderQuantity}
                  </p>
                </div>

                <div className="">
                  {Product.reviews?.map((review) => (
                    <div>
                      <p className="text-md py text-amber-300">
                        rating: {review.rating}
                      </p>
                      <p className="text-md py">comment:{review.comment}</p>
                      <p className="text-md py">Date:{review.date}</p>
                      <p className="text-md py">Email:{review.reviewerEmail}</p>
                      <p className="text-md py">Name:{review.reviwerName}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between py-[50px]">
                  <button
                    onClick={() => handleDelete(Product.id!)}
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
      </div>
    </div>
  );
}
