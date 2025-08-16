import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Product from "../Pages/Product";
import Category from "../Pages/Category";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Category/:name" element={<Category />} />
      </Routes>
    </div>
  );
}
