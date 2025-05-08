import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, selectProducts } from "../redux/store";

function ProductList({ setEditingProduct }) {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Product List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.supplier}</td>
              <td>
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
