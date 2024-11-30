import React from 'react';
import Card from './card';
import Container from './Container';

const CardSection = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'https://example.com/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://example.com/product2.jpg',
    },
    // Add more products here
  ];
  return (
    <>
      <div className="px-4">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CardSection;
