// import React from "react";
// import { MdDelete } from "react-icons/md";
// import { useCart } from "../hooks/useCart";

// export default function Cart() {
//   const { cartItem, removeFromCart } = useCart();

//   const overallTotal = cartItem.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Cart Items</h1>

//       {cartItem.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {cartItem.map((item) => {
//               const totalPrice = item.price * item.quantity;
//               return (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center border-b py-2"
//                 >
//                   <div>
//                     <h2 className="font-semibold">{item.title}</h2>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                   <div className="text-right">
//                     <p>Price: ${item.price.toFixed(2)}</p>
//                     <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
//                   </div>
//                   <div className=" pl-8">
//                     <MdDelete
//                       className="text-red-500 text-3xl cursor-pointer"
//                       onClick={() => removeFromCart(item.id)}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-6 text-right">
//             <h2 className="text-xl font-bold">
//               Overall Total: ${overallTotal.toFixed(2)}
//             </h2>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
