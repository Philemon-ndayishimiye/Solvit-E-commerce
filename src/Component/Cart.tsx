
import { MdDelete } from "react-icons/md";
import { useCart } from "../hooks/useCart";
import type { Cart } from "../type/Cart";
import api from "../app/api/api";

export default function Cart() {
  const { cart } = useCart();

  const overallTotal = cart.reduce(
    (acc, item) => acc + item.discountedTotal,
    0
  );

  const removeFromCart = async (items: Cart) => {
    try {
      const res = await api.delete(`/carts/${items.id}`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart Items</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => {
              const totalPrice = item.products.reduce(
                (sum, prod) => sum + prod.price * prod.quantity,
                0
              );
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h2 className="font-semibold">
                      {item.products.map((prod) => prod.title)}
                    </h2>
                    <p>Quantity: {item.totalQuantity}</p>
                  </div>
                  <div className="text-right">
                    <p>Price: ${item.total.toFixed(2)}</p>
                    <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className=" pl-8">
                    <MdDelete
                      className="text-red-500 text-3xl cursor-pointer"
                      onClick={() => removeFromCart(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Overall Total: ${overallTotal.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
