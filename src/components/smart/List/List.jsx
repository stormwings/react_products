import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

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
      <h1 style={{ marginTop: '30px' }}>CRUD Products</h1>
      <div className="flex-row">
        <Button
          style={{ margin: '10px 0 20px' }}
          outline
          color="info"
          onClick={() => {
            props.history.push({
              pathname: '/product',
              state: { detail: 'data' }
            });
          }}
        >
          Create Product
        </Button>
        <div className="flex-large">{products && <ProductTable products={products} deleteProduct={deleteProduct} />}</div>
      </div>
    </div>
  );
}

const ProductTable = props => {
  const history = useHistory();

  return (
    <Table>
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
                <Button
                  style={{ marginRight: '10px' }}
                  outline
                  color="primary"
                  onClick={() => {
                    history.push(`/product/${product.id}`);
                  }}
                >
                  Edit
                </Button>
                <Button outline color="danger" onClick={() => props.deleteProduct(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No products</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
