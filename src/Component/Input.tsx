import React from "react";
import type { Input } from "../type/Input";

export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type,
}: Input) {
  return (
    <input
      className="border-none focus:outline-none w-[393px] py-2  px-6 rounded-xl "
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
}
