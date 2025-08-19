import React from "react";
import type { Input } from "../type/Input";

const classVariant = {
  defolt: "border-none w-[593px]",
  primary: " w-[330px]  rounded-xl focus:outline-none  duration-200",
};

export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type,
  variant,
}: Input & { variant: keyof typeof classVariant }) {
  return (
    <input
      className={` focus:outline-none ${classVariant[variant]}  py-2  px-6 rounded-xl max-sm:w-[140px] max-sm:py-0 max-sm:px-2 max-md:w-[400px] max-lg:w-[440px]`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
}
