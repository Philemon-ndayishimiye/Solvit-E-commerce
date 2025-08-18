import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductsResponse, ProductType } from "../type/Product";
import Navigation from "../Component/Navigation";
import SideBar from "../Component/SideBar";
import Card from "../Component/Card";
import { useCart } from "../hooks/useCart";

export default function Search() {
  const navigate = useNavigate();
  const { input } = useParams<{ input: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { addToCart } = useCart();

  const handleDisplay = (product: ProductType) => {
    navigate(`/product/${product.id}`);
  };

  useEffect(() => {
    if (!input) return;

    const handleSearch = async () => {
      try {
        const res = await api.get<ProductsResponse>(
          `/products/search?q=${input}`
        );
        console.log("Search API response:", res.data);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    handleSearch();
  }, [input]);

  const handleCart = (product: ProductType) => {
    if (!product.id || !product.title || !product.price) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="flex">
        <SideBar />
        <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product} 
              onClick={() => handleDisplay(product)}
              onAddToCart={handleCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
