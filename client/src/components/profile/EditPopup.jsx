import React, { useState } from 'react';

const EditPopup = ({ onClose, type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ...(type === 'seller' && { shop: '' }),
    ...(type === 'customer' && { address: '' }),
    ...(type === 'courier' && { vehicle: '' }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Updated data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit {type} Profile</h2>
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
          {type === 'seller' && (
            <input
              type="text"
              name="shop"
              value={formData.shop}
              onChange={handleInputChange}
              placeholder="Shop Name"
              className="w-full p-2 border rounded-md"
            />
          )}
          {type === 'customer' && (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full p-2 border rounded-md"
            />
          )}
          {type === 'courier' && (
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

export default EditPopup;
