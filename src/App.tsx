import { useProduct } from "./hooks/useProduct";
import Home from "./Pages/Home";

function App() {
  const { Products } = useProduct();

  console.log(Products);
  return <div>
    <Home/>
  </div>;
}

export default App;
