import type { Category } from "../type/Category";

export default function Aside({ name, onClick }: Category) {
  return (
    <div
      className="px-7  py-3 cursor-pointer font-semibold hover:bg-red-500 hover:text-white"
      onClick={onClick}
    >
      <h1>{name}</h1>
    </div>
  );
}
