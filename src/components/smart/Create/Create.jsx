import React, { useState } from 'react';

export default function Product(props) {
  const addProduct = product => {
    fetch('http://localhost:3001/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        props.history.push({
          pathname: '/',
          state: { success: true, detail: response }
        });
      })
      .catch(error => console.error('Error:', error));
  };

  const initialFormState = { id: null, product: '', price: '' };
  const [product, setProduct] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!product.product || !product.price) return;

        addProduct(product);
        setProduct(initialFormState);
      }}
    >
      <label>Name</label>
      <input type="text" name="product" value={product.product} onChange={handleInputChange} />
      <label>Price</label>
      <input type="text" name="price" value={product.price} onChange={handleInputChange} />
      <button>Add new product</button>
    </form>
  );
}
