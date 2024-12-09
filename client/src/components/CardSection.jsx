"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import useDragScroll from "../hooks/useDragScroll"; // Import the custom hook
import Container from "./Container";
import { useShopContext } from "@/context/ShopContext";

const categories = [
  { id: 1, name: "Honey", icon: "https://i.ibb.co/XCM2bhM/Baby-food.png" },
  { id: 2, name: "Spices & Herbs", icon: "https://i.ibb.co/J5Yd3cZ/Condiments.png" },
  { id: 3, name: "Dairy & Eggs", icon: "https://i.ibb.co/h2R9kny/Dairy.png" },
  { id: 4, name: "Grains & Pulses", icon: "https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png" },
  { id: 5, name: "Fruits", icon: "https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png" },
  {
    id: 6,
    name: "Vegetable",
    icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733727523/vegetable_oxjhid.png",
    size: 55,
  },
  {
    id: 7,
    name: "Meat",
    icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733728599/proteins_j9nkot.png",
    size: 55,
  },
];

const CardSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRef = useRef(null); // Reference for the scrollable category section
  useDragScroll(categoryRef); // Hook for drag-to-scroll functionality
  const { api } = useShopContext();

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await api.get("/product/get-product");
      setProducts(result.data.product);
    } catch (error) {
      console.error(error);
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
          {categories.map((item) => (
            <div
              key={item.id}
              className={`min-w-[120px] flex flex-col items-center cursor-pointer ${
                selectedCategory === item.name
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedCategory(item.name)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className={item.size ? "w-[50px] mb-2 mx-0" : `w-[60px] mx-5`}
              />
              <h4 className="text-[16px] font-medium mt-2">{item.name}</h4>
            </div>
          ))}
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border p-2 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="mt-2 text-lg font-medium">{product.title}</h4>
                <p className="text-gray-600 mt-3">
                  Description: {product.description}
                </p>
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
