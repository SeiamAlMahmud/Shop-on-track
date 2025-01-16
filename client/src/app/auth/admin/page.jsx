"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const categories = [
  { id: 1, name: "Honey", icon: "https://i.ibb.co/XCM2bhM/Baby-food.png" },
  { id: 2, name: "Spices & Herbs", icon: "https://i.ibb.co/J5Yd3cZ/Condiments.png" },
  { id: 3, name: "Dairy & Eggs", icon: "https://i.ibb.co/h2R9kny/Dairy.png" },
  { id: 4, name: "Grains & Pulses", icon: "https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png" },
  { id: 5, name: "Fruits", icon: "https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png" },
  { id: 6, name: "Vegetable", icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733727523/vegetable_oxjhid.png" },
  { id: 7, name: "Meat", icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733728599/proteins_j9nkot.png" },
];

const Page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/users/login/admin`, formData);
      if (response.data.success) {
        toast.success("Login successful!");
        setIsLoggedIn(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed! Please try again."
      );
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log("New Product Data:", productData);
    toast.success("Product created successfully!");
    setProductData({
      title: "",
      description: "",
      category: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="grid items-center gap-10 max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        {!isLoggedIn ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                  id="email"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                  id="password"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
              Create a New Product
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="text-sm font-medium text-gray-700">Product Title</label>
                <input
                  name="title"
                  type="text"
                  onChange={handleProductChange}
                  value={productData.title}
                  required
                  id="title"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                  placeholder="Product Title"
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium text-gray-700">Product Description</label>
                <textarea
                  name="description"
                  onChange={handleProductChange}
                  value={productData.description}
                  required
                  id="description"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                  placeholder="Product Description"
                ></textarea>
              </div>
              <div>
                <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  onChange={handleProductChange}
                  value={productData.category}
                  required
                  id="category"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="price" className="text-sm font-medium text-gray-700">Product Price</label>
                <input
                  name="price"
                  type="number"
                  onChange={handleProductChange}
                  value={productData.price}
                  required
                  id="price"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                  placeholder="Product Price"
                />
              </div>
              <div>
                <label htmlFor="image" className="text-sm font-medium text-gray-700">Product Image</label>
                <input
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  required
                  id="image"
                  className="mt-1 bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
