import React from "react";
import type { ProductType } from "../type/Product";

export default function Card({
  title,
  thumbnail,
  description,
  price,
  discountPercentage,
  onClick,
}: ProductType) {
  return (
    <div onClick={onClick} className="cursor-pointer shadow-md py-2">
      <div>
        <div className="flex justify-between ml-[20px] ">
          <h2 className="bg-red-500 rounded-xl py-2 px-3 cursor-pointer">
            {discountPercentage}%
          </h2>
          <h1 className="pr-1 font-bold ">{title}</h1>
        </div>
        <div>
          <img
            className="transition-transform duration-300 hover:scale-110"
            src={thumbnail}
            alt={title}
          />
        </div>
      </div>

      <div>
        <h1 className="text-[13px] px-4 text-gray-600">{description}</h1>
        <h1 className="text-amber-400 font-bold px-7 py-3 text-2xl">
          ${price}
        </h1>
      </div>
    </div>
  );
}
