import { useEffect, useState } from "react";
import Aside from "./Aside";
import type { Category } from "../type/Category";
import api from "../app/api/api";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const Navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const handleSelect = async () => {
      try {
        const Select = await api.get<Category[]>("/products/categories");

        setCategories(Select.data);
      } catch (error) {
        console.error(error);
      }
    };

    handleSelect();
  }, []);

  const handleSelectCategory = async (category: Category) => {
    Navigate(`/Category/${category.name}`);
  };
  return (
    <div>
      <div className="w-[220px] bg-gray-100">
        <div>
          <h1 className="font-bold text-black text-xl  py-2 cursor-pointer text-center max-sm:hidden max-md:hidden">
            Categories
          </h1>
        </div>
        {categories.map((category) => (
          <Aside
            name={category.name}
            onClick={() => handleSelectCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
