import type React from "react";

export interface Input {
  name: string;
  variant: "defolt" | "primary";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "text" | "email" | "password";
}
