import React from "react";
import { BsCart4 } from "react-icons/bs";
export default function LeftLogin() {
  return (
    <div className="bg-amber-300 py-[110px] px-[30px] my-6 mx-6">
      <div>
        <div className=" ">
          <h1 className="text-white font-bold text-4xl">Welcome Back </h1>
          <p className="text-white">
            manage your shop efficiently on shape with our <br /> please shop
            with us
          </p>
        </div>

        <div className="flex justify-center items-center">
          <BsCart4 className="text-9xl text-red-500" />
        </div>
      </div>
    </div>
  );
}
