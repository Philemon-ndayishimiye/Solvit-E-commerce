import { useProduct } from "./hooks/useProduct";

function App() {
  const { Products } = useProduct();

  console.log(Products);
  return <div className="text-blue-600">hello philos</div>;
}

export default App;
