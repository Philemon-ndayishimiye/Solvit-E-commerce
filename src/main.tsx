import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductProvider } from "./Context/ProductContext.tsx";
import { CartProvider } from "./Context/CartContext.tsx";
import { UserProvider } from "./Context/User.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
