import { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../Component/SideBar";
import Navigation from "../Component/Navigation";
import { useUser } from "../hooks/useUser";
import api from "../app/api/api";
import { useCart } from "../hooks/useCart";
import type { Cart } from "../type/Cart";

export default function Home() {
  const navigate = useNavigate();
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products } = useProduct();
  const { user } = useUser();
  const { cart, setCart } = useCart();

  console.log(cart);
  console.log(user);

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    navigate(`/product/${product.id}`);
  };

  const handleCart = async (product: ProductType) => {
    if (!user) {
      navigate("/login");
    }

    try {
      const res = await api.post<Cart>(
        "https://dummyjson.com/carts/add",
        {
          userId: user?.id,
          products: [
            {
              id: product.id,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      setCart((prev) => [...prev, res.data]);
      console.log(res.data);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };

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
