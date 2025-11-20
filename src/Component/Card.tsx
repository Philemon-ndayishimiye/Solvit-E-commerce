import type { ProductType } from "../type/Product";

interface CardProps {
  product: ProductType;
  onClick?: () => void;
  onAddToCart?: (product: ProductType) => void;
}

export default function Card({ product, onClick, onAddToCart }: CardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer shadow-md py-2">
      <div className="flex justify-between ml-[20px] ">
        <h2 className="bg-red-500 rounded-xl py-2 px-3 cursor-pointer">
          {product.discountPercentage}%
        </h2>
        <h1 className="pr-1 font-bold ">{product.title}</h1>
      </div>

      <div>
        <img
          className="transition-transform duration-300 hover:scale-110"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div>
        <h1 className="text-[13px] px-4 text-gray-600">
          {product.description}
        </h1>
        <h1 className="text-amber-400 font-bold px-7 py-3 text-2xl">
          ${product.price}
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            if (onAddToCart) {
              onAddToCart(product); // send full product
            }
          }}
          className="border-none px-6 py-2 bg-amber-400 rounded-lg cursor-pointer text-white font-bold "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
