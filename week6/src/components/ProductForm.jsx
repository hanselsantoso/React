import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../redux/store";

function ProductForm({ editingProduct, setEditingProduct }) {
  const dispatch = useDispatch();

  // State for the form
  const [product, setProduct] = useState({ id: "", name: "", category: "", supplier: "" });

  // Dropdown options
  const categories = ["Electronics", "Clothing", "Furniture"];
  const suppliers = ["Supplier A", "Supplier B", "Supplier C"];

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({ id: "", name: "", category: "", supplier: "" });
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      dispatch(editProduct(product));
      setEditingProduct(null);
    } else {
      dispatch(addProduct({ ...product, id: Date.now() }));
    }
    setProduct({ id: "", name: "", category: "", supplier: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
      />

      <select
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={product.supplier}
        onChange={(e) => setProduct({ ...product, supplier: e.target.value })}
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((sup) => (
          <option key={sup} value={sup}>
            {sup}
          </option>
        ))}
      </select>

      <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
      {editingProduct && <button onClick={() => setEditingProduct(null)}>Cancel</button>}
    </form>
  );
}

export default ProductForm;
