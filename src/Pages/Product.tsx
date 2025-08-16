import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductType } from "../type/Product";

export default function Product() {
  const { id } = useParams();
  const [Product, setProduct] = useState<ProductType>({});

  useEffect(() => {
    const handleProductDetails = async () => {
      try {
        const res = await api.get<ProductType>(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleProductDetails();
  }, [id]);

  return (
    <div>
      {
        <div key={Product.id}>
          <h1>{Product.title}</h1>
          <h2>{Product.category}</h2>
        </div>
      }
    </div>
  );
}
