import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
// import Category from "../Pages/Category";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        {/* <Route path="/category" element={<Category />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
