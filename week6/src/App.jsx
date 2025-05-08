import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <Provider store={store}>
      <div>
        <h1>Product Management</h1>
        <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
        <ProductList setEditingProduct={setEditingProduct} />
      </div>
    </Provider>
  );
}

export default App;
