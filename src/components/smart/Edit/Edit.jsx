import React, { useState, useEffect } from 'react';

const Edit = props => {
  const [product, setProduct] = useState(null);
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => setProduct(result))
      .catch(error => console.error('Error:', error));
  }, []);

  const updateProduct = (id, updatedProduct) => {
    const product = { id, ...updatedProduct };

    fetch(`http://localhost:3001/products/${id}`, {
      method: 'PUT',
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

  const handleInputChange = event => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  if (!product) return <div>loading</div>;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        updateProduct(product.id, product);
      }}
    >
      <label>Name</label>
      <input type="text" name="product" value={product.product} onChange={handleInputChange} />
      <label>Price</label>
      <input type="text" name="price" value={product.price} onChange={handleInputChange} />
      <button>Update product</button>
      <button className="button muted-button">Cancel</button>
    </form>
  );
};

export default Edit;
