import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Product from "../Pages/Product";
import Category from "../Pages/Category";
import AddProduct from "../Pages/AddProduct";
import Search from "../Pages/Search";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Category/:name" element={<Category />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/Search/:input" element={<Search />} />
      </Routes>
    </div>
  );
}
