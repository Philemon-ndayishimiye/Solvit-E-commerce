import type { Button } from "../type/Button";

import React from "react";

export default function Button({ label, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className="border bg-red-400 text-white font-bold py-2 px-3 rounded-2xl cursor-pointer max-sm:py-2 max-sm:px-2 max-sm:text-[12px]"
    >
      {label}
    </button>
  );
}
