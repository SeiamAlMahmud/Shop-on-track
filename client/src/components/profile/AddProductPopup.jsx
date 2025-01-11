'use client';
import { useShopContext } from '@/context/ShopContext';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddProductPopup = ({ onClose, type }) => {
  const [formData, setFormData] = useState({
    price: 0,
    weight: 0,
    division: '',
    district: '',
    subDistrict: '',
  });
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('Vegetable');
  const [specificProduct, setSpecificProduct] = useState({});
  const { api } = useShopContext();

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/get-All-product');
      setProducts(response.data.product || []);
      console.log(response.data.product, 'Fetched Products');
    } catch (error) {
      console.error('Error fetching products:', error);
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
    if (Object.keys(specificProduct).length === 0) {
      return toast.error('Please select a product.');
    }
    if (
      !formData.weight ||
      formData.weight === 0 ||
      !formData.price ||
      formData.price === 0 ||
      !formData.division ||
      !formData.district ||
      !formData.subDistrict
    ) {
      return toast.error('Please fill all fields.');
    }
    formData.productId = specificProduct._id;
    console.log('Updated data:', formData);
    // Add API call here
    // onClose();
  };

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
      icon: 'https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png',
    },
    {
      id: 6,
      name: 'Vegetable',
      icon: 'https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733727523/vegetable_oxjhid.png',
    },
    {
      id: 7,
      name: 'Meat',
      icon: 'https://res.cloudinary.com/dmrdnqrqe/image/upload/v1733728599/proteins_j9nkot.png',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 m-6 rounded-lg shadow-lg max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-center text-teal-600">
          Add Your Product
        </h2>
        <h3 className="mt-3 text-xl font-extrabold">Category:</h3>
        <div className="flex flex-wrap gap-3 my-6">
          {categories.map((category) => (
            <div key={category.id}>
              <img
                src={category.icon}
                alt={category.name}
                title={category.name}
                className={`w-16 rounded-lg cursor-pointer ${
                  category.name === selected ? 'shadow-xl border-slate-50' : ''
                }`}
                onClick={() => setSelected(category.name)}
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="my-5">
          <div className="flex flex-wrap gap-3">
            {Array.isArray(products) &&
              products.map(
                (product) =>
                  product.category.toLowerCase() === selected.toLowerCase() && (
                    <img
                      key={product._id}
                      onClick={() => setSpecificProduct(product)}
                      className={`w-24 h-24 object-cover cursor-pointer ${
                        product._id === specificProduct._id
                          ? 'shadow-xl border-2 border-black border-opacity-60 rounded-md'
                          : ''
                      }`}
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
                      alt={product.name}
                    />
                  )
              )}
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <hr />
          <label htmlFor="price" className="text-xl font-bold">
            Price:
          </label>
          <input
            id="price"
            type="number"
            name="price"
            min={0}
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded-md"
          />
          <label htmlFor="weight" className="text-xl font-bold">
            Weight:
          </label>
          <input
            id="weight"
            type="number"
            name="weight"
            min={0}
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Weight"
            className="w-full p-2 border rounded-md"
          />
          <label htmlFor="division" className="text-xl font-bold">
            Division:
          </label>
          <input
            id="division"
            type="text"
            name="division"
            value={formData.division}
            onChange={handleInputChange}
            placeholder="Division"
            className="w-full p-2 border rounded-md"
          />
          <label htmlFor="district" className="text-xl font-bold">
            District:
          </label>
          <input
            id="district"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            placeholder="District"
            className="w-full p-2 border rounded-md"
          />
          <label htmlFor="subDistrict" className="text-xl font-bold">
            Sub-District:
          </label>
          <input
            id="subDistrict"
            type="text"
            name="subDistrict"
            value={formData.subDistrict}
            onChange={handleInputChange}
            placeholder="Sub-District"
            className="w-full p-2 border rounded-md"
          />
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
