"use client";
import { useShopContext } from "@/context/ShopContext";
import React, { useEffect, useState } from "react";

const AddProductPopup = ({ onClose, type }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState("");
    const [specificProduct, setSpecificProduct] = useState({});
    const { api } = useShopContext();

    const fetchProducts = async () => {
        try {
            const response = await api.get("/product/get-All-product");
            setProducts(response.data.product || []);
            console.log(response.data.product, "Fetched Products");
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Updated data:", formData);
        onClose();
    };

    const categories = [
        { id: 1, name: "Honey", icon: "https://i.ibb.co/XCM2bhM/Baby-food.png" },
        { id: 2, name: "Spices & Herbs", icon: "https://i.ibb.co/J5Yd3cZ/Condiments.png" },
        { id: 3, name: "Dairy & Eggs", icon: "https://i.ibb.co/h2R9kny/Dairy.png" },
        { id: 4, name: "Grains & Pulses", icon: "https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png" },
        { id: 5, name: "Fruits", icon: "https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png" },
        { id: 6, name: "Vegetable", icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733727523/vegetable_oxjhid.png" },
        { id: 7, name: "Meat", icon: "https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733728599/proteins_j9nkot.png" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg">
                <h2 className="text-lg font-bold mb-4">Edit {type} Profile</h2>
                <div className="flex flex-wrap gap-3 my-6">
                    {categories.map((category) => (
                        <div key={category.id}>
                            <img
                                src={category.icon}
                                alt={category.name}
                                title={category.name}
                                className={`w-20 rounded-lg ${category.name == selected ? "shadow-xl  border-slate-50" : ""}`}
                                onClick={() => setSelected(category.name)}
                            />
                        </div>
                    ))}
                </div>
                <hr />
                <div className="my-5">
                    <div className="flex flex-wrap gap-3">
                        {products && products.map(product => (

                            product.category.toLowerCase() == selected.toLowerCase() && <img
                                key={product._id}
                                onClick={()=> setSpecificProduct(product)}
                                className="w-24"
                                src={process.env.NEXT_PUBLIC_API_BASE_URL+"/" + product.image}
                                alt=""
                            />

                        ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded-md"
                    />
                    {type === "seller" && (
                        <input
                            type="text"
                            name="shop"
                            value={formData.shop}
                            onChange={handleInputChange}
                            placeholder="Shop Name"
                            className="w-full p-2 border rounded-md"
                        />
                    )}
                    {type === "customer" && (
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="w-full p-2 border rounded-md"
                        />
                    )}
                    {type === "courier" && (
                        <input
                            type="text"
                            name="vehicle"
                            value={formData.vehicle}
                            onChange={handleInputChange}
                            placeholder="Vehicle"
                            className="w-full p-2 border rounded-md"
                        />
                    )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductPopup;
