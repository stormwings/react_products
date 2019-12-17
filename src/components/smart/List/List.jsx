import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function List(props) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => setProducts(result))
      .catch(error => console.error('Error:', error));
  }, []);

  const deleteProduct = id => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container">
      <h1>CRUD Products</h1>
      <div className="flex-row">
        <button
          onClick={() => {
            props.history.push({
              pathname: '/product',
              state: { detail: 'data' }
            });
          }}
        >
          add
        </button>
        <div className="flex-large">
          <h2>View products</h2>
          {products && <ProductTable products={products} deleteProduct={deleteProduct} />}
        </div>
      </div>
    </div>
  );
}

const ProductTable = props => {
  const history = useHistory();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.products.length > 0 ? (
          props.products.map(product => (
            <tr key={product.id}>
              <td>{product.product}</td>
              <td>{product.price}</td>
              <td>
                <button
                  onClick={() => {
                    history.push(`/product/${product.id}`);
                  }}
                  className="button muted-button"
                >
                  Edit
                </button>
                <button onClick={() => props.deleteProduct(product.id)} className="button muted-button">
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No products</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
