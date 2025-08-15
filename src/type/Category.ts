import type React from "react";

export interface Category {
  slug?: string;
  name: string;
  url?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
