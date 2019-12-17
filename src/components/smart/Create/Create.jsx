import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

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
    <Container>
      <h1 style={{ marginTop: '30px' }}>Create Product</h1>

      <Form
        onSubmit={event => {
          event.preventDefault();
          if (!product.product || !product.price) return;

          addProduct(product);
          setProduct(initialFormState);
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
}
