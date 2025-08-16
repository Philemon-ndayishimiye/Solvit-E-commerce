import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductType, ProductsResponse } from "../type/Product";
import Card from "../Component/Card";
import SideBar from "../Component/SideBar";

export default function Category() {
  const Navigate = useNavigate();
  const [products, setProduct] = useState<ProductType[]>([]);
  const { name } = useParams();

  useEffect(() => {
    const displayProduct = async () => {
      const res = await api.get<ProductsResponse>(`/products/category/${name}`);
      setProduct(res.data.products);
    };
    displayProduct();
  }, [name]);

  const handleDisplay = (product: ProductType) => {
    Navigate(`/product/${product.id}`);
  };

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
        {products.map((product) => (
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
  );
}
