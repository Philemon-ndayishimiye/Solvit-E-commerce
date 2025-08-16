import { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { useNavigate } from "react-router-dom";
import SideBar from "../Component/SideBar";
import Navigation from "../Component/Navigation";

export default function Home() {
  const Navigate = useNavigate();
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products } = useProduct();

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    Navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <div>
        <div>
          <Navigation />
        </div>
      </div>

      <div>
        <div className="flex">
          <SideBar />
          <div>
            <div>
              <div className="flex gap-[22%]"></div>

              <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
                {SearchProduct.map((product) => (
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
      </div>
    </div>
  );
}
