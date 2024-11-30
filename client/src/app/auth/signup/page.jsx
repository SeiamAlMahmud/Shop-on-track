"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useShopContext } from '@/context/ShopContext';

const Signup = () => {
    const {api} = useShopContext();
  const [userType, setUserType] = useState('customer'); // Default user type
  const [formData, setFormData] = useState({}); // Dynamic form data

  // Fields for different user types
  const formFields = {
    customer: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
      { name: 'shippingAddress', label: 'Shipping Address', type: 'text', required: true },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        options: ['male', 'female'],
        required: true,
      },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    ],
    seller: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
      { name: 'businessName', label: 'Business Name', type: 'text', required: true },
      { name: 'businessLicense', label: 'Business License', type: 'text', required: true },
      { name: 'bankAccountDetails', label: 'Bank Account Details', type: 'text', required: true },
    ],
    courier: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
      { name: 'businessName', label: 'Business Name', type: 'text', required: true },
      { name: 'businessLicense', label: 'Business License', type: 'text', required: true },
      { name: 'bankAccountDetails', label: 'Bank Account Details', type: 'text', required: true },
      { name: 'serviceArea', label: 'Service Area', type: 'text', required: true },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'text', required: true },
      { name: 'vehicleRegistrationNumber', label: 'Vehicle Registration Number', type: 'text', required: true },
      { name: 'driverLicense', label: 'Driver License', type: 'text', required: true },
      { name: 'deliveryCapacity', label: 'Delivery Capacity', type: 'number', required: true },
    ],
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await api.post(`/users/signup/${userType}`, formData);
      console.log('Signup successful:', response.data);
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed! Please try again.');
    }
  };

  return (
    <div className="flex justify-center mt-7">
      <Tabs defaultValue="customer" className="w-[800px]" onValueChange={setUserType}>
        <TabsList className="flex flex-wrap justify-center w-auto gap-2 mb-4">
          <TabsTrigger value="customer" className="px-6">Customer</TabsTrigger>
          <TabsTrigger value="seller" className="px-6">Seller</TabsTrigger>
          <TabsTrigger value="courier" className="px-6">Courier</TabsTrigger>
        </TabsList>

        <div className="w-full">
          {Object.entries(formFields).map(([type, fields]) => (
            <TabsContent key={type} value={type}>
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="text-gray-800 text-sm mb-2 block">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                          onChange={handleInputChange}
                          required={field.required}
                        >
                          <option value="">Select</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={field.name}
                          type={field.type}
                          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          onChange={handleInputChange}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md"
                >
                  Sign Up
                </button>
              </form>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Signup;
