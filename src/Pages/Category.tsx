import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../app/api/api";
import type { ProductType, ProductsResponse } from "../type/Product";
import Card from "../Component/Card";
import SideBar from "../Component/SideBar";
import Navigation from "../Component/Navigation";
import { useCart } from "../hooks/useCart";

export default function Category() {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!name) return;

    const displayProduct = async () => {
      try {
        const res = await api.get<ProductsResponse>(`/products/category/${name}`);
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
    <>
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
    </>
  );
}
