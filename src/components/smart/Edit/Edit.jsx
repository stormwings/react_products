import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

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
    <Container>
      <h1 style={{ marginTop: '30px' }}>Edit Product</h1>

      <Form
        onSubmit={event => {
          event.preventDefault();

          updateProduct(product.id, product);
        }}
      >
        <FormGroup>
          <Label for="product">Name</Label>
          <Input
            type="text"
            id="product"
            name="product"
            placeholder="Your product name"
            value={product.product}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="text" id="price" name="price" placeholder="Your product Price" value={product.price} onChange={handleInputChange} />
        </FormGroup>
        <Button color="primary">Add new product</Button>
        <Button
          outline
          onClick={() => {
            props.history.push({
              pathname: '/'
            });
          }}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;
