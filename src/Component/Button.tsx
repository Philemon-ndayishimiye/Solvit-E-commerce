import type { Button } from "../type/Button";

import React from "react";

const classVariant = {
  defolt: "text-white  bg-red-400",
  primary: "w-[160px] bg-amber-300",
};

export default function Button({
  label,
  onClick,
  variant,
  
}: Button & { variant: keyof typeof classVariant }) {
  return (
    <button
      
      onClick={onClick}
      className={`border ${classVariant[variant]}  text-white font-bold py-2 px-3 rounded-2xl cursor-pointer max-sm:py-2 max-sm:px-2 max-sm:text-[12px]`}
    >
      {label}
    </button>
  );
}
