import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductType, ProductsResponse } from "../type/Product";
import Card from "../Component/Card";
import SideBar from "../Component/SideBar";
import Navigation from "../Component/Navigation";
import type { Cart } from "../type/Cart";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";

export default function Category() {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { user } = useUser();
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (!name) return;

    const displayProduct = async () => {
      try {
        const res = await api.get<ProductsResponse>(
          `/products/category/${name}`
        );
        console.log("Category API response:", res.data);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };

    displayProduct();
  }, [name]);

  const handleDisplay = (product: ProductType) => {
    navigate(`/product/${product.id}`);
  };

  const handleCart = async (product: ProductType) => {
    if (!user) return;

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
    <>
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
    </>
  );
}
