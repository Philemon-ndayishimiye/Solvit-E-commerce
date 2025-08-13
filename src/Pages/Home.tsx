import React, { useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";

export default function Home() {
  const { Products } = useProduct();
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const handleDisplay = (product: ProductType) => {
    setDetails(true);
    setSelectedProduct(product);
  };
  return (
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

      <div>
        {details && selectedProduct && (
          <div className="absolute top-[10%] left-[10%] h-screen bg-white w-[80%]">
            <div></div>
            <h1>{selectedProduct.title}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
