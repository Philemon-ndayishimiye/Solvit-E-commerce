// import React, { useEffect, useState } from "react";
// import Navigation from "../Component/Navigation";
// import api from "../app/api/api";
// import type { Category } from "../type/Category";

// export default function Category() {
//   const [Category, setCategory] = useState<Category[]>([]);
//   useEffect(() => {
//     const handleCategory = async () => {
//       try {
//         const category = await api.get<Category[]>("/products/categories");
//         setCategory(category.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     handleCategory();
//   }, []);

//   return (
//     <div>
//       <Navigation />

//       <div>
//         {Category.map((categ) => (
//           <div>
//             <h1>{categ.name}</h1>
//             <div>
//               <img src={categ.url} />
//             </div>
//             <h2>{categ.slug}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
