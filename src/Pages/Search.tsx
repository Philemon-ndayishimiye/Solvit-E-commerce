import React, { useEffect, useState } from "react";
import Navigation from "../Component/Navigation";
import SideBar from "../Component/SideBar";
import type { ProductsResponse, ProductType } from "../type/Product";
import api from "../app/api/api";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../Component/Card";

export default function Search() {
  const Navigate = useNavigate();
  const { input } = useParams();
  const [Products, setProduct] = useState<ProductType[]>([]);

  const handleDisplay = (product: ProductType) => {
    Navigate(`/product/${product.id}`);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await api.get<ProductsResponse>(
          `/products/search?q=${input}`
        );
        setProduct(res.data.products);
        console.log(Products);
      } catch (error) {
        console.error(error);
      }
    };
    handleSearch();
  }, [input]);
  return (
    <div>
      <Navigation />

      <div className="flex">
        <div>
          <SideBar />
        </div>

        <div>
          <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
            {Products.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                description={product.description}
                thumbnail={product.thumbnail}
                price={product.price}
                discountPercentage={product.discountPercentage}
                onClick={() => handleDisplay(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
