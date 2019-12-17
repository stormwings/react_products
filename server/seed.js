const fs = require('fs');
const path = require('path');
const faker = require('faker');

function main() {
  const data = {
    products: createProducts()
  };

  fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, null, 2));
}

main();

function createProducts(limit = 5) {
  const result = [];

  for (let i = 0; i < limit; i++) {
    result.push({
      id: i + 1,
      product: faker.commerce.productName(),
      price: `U$D${faker.commerce.price()}`
    });
  }

  return result;
}