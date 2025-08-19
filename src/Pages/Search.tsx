import React, { useEffect, useState } from "react";
import type { Cart } from "../type/Cart";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductsResponse, ProductType } from "../type/Product";
import Navigation from "../Component/Navigation";
import SideBar from "../Component/SideBar";
import Card from "../Component/Card";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
export default function Search() {
  const navigate = useNavigate();
  const { input } = useParams<{ input: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { cart, setCart } = useCart();
  const { user } = useUser();

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

        <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-1">
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
