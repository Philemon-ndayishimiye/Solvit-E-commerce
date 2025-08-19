import { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { useNavigate } from "react-router-dom";
import SideBar from "../Component/SideBar";
import Navigation from "../Component/Navigation";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";

export default function Home() {
  const { addToCart, cartItem } = useCart();
  const navigate = useNavigate();
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products } = useProduct();

  const { user } = useUser();

  console.log(user);

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    navigate(`/product/${product.id}`);
  };

  const handleCart = (product: ProductType) => {
    if (!product.id || !product.title || !product.price) return; // safety
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
    alert(` ${product.title} added to cart Successfully `);
  };

  useEffect(() => {
    console.log("Cart updated:", cartItem);
  }, [cartItem]);

  return (
    <div>
      <Navigation />

      <div className="flex max-sm:flex-col max-md:flex-col">
        <div className="max-sm:hidden max-md:hidden">
          <SideBar />
        </div>

        <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-1 ">
          {SearchProduct.map((product) => (
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
