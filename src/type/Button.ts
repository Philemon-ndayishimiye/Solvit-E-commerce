import type React from "react";

export interface Button {
  type: string;
  label: string;
  variant?: "defolt" | "primary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
