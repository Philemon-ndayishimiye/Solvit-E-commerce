import type React from "react";

export interface Button {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
