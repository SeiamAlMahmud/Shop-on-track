import React, { useState, useRef, useLayoutEffect } from 'react';
import useDragScroll from '../hooks/useDragScroll'; // Import the custom hook
import Container from './Container';
import { useShopContext } from '@/context/ShopContext';

const categories = [
  { id: 1, name: 'Honey', icon: 'https://i.ibb.co/XCM2bhM/Baby-food.png' },
  {
    id: 2,
    name: 'Spices & Herbs',
    icon: 'https://i.ibb.co/J5Yd3cZ/Condiments.png',
  },
  { id: 3, name: 'Dairy & Eggs', icon: 'https://i.ibb.co/h2R9kny/Dairy.png' },
  {
    id: 4,
    name: 'Grains & Pulses',
    icon: 'https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png',
  },
  {
    id: 5,
    name: 'Fruits',
    titleBn: "",
    icon: 'https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png',
  },
  {
    id: 6,
    name: 'Vegetable',
    titleBn: "",
    icon: 'https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733727523/vegetable_oxjhid.png',
    size: 55
  },
  {
    id: 7,
    name: 'Meat',
    titleBn: "",
    icon: 'https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733728599/proteins_j9nkot.png',
    size: 55
  },
];

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    category: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    category: 2,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    category: 3,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 400,
    category: 4,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 500,
    category: 5,
    image: 'https://via.placeholder.com/150',
  },
];

const CardSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRef = useRef(null); // Reference for the scrollable category section

  useDragScroll(categoryRef); // Hook for drag-to-scroll functionality

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const { api } = useShopContext();

  useLayoutEffect(() => {

    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const result = await api.get('/product/get-product');
      console.log(result.data.product)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="overflow-hidden">
        {/* Category Section */}
        <div
          ref={categoryRef}
          className="flex gap-4 overflow-x-auto p-4 scrollbar-hide"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className={`min-w-[120px] flex flex-col items-center cursor-pointer ${selectedCategory === category.id
                  ? 'text-blue-500'
                  : 'text-gray-700'
                }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <img
                src={category.icon}
                alt={category.name}
                className={category.size ? "w-[50px] mb-2 mx-0" : `w-[60px] mx-5`}
              />
              <h4 className="text-[16px] font-medium mt-2">{category.name}</h4>
            </div>
          ))}
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-2 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="mt-2 text-lg font-medium">{product.name}</h4>
                <p className="text-gray-600">Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CardSection;
