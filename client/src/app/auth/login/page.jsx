'use client';
import Select from '@/components/Select';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useShopContext } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { api, Type, setType, setToken } = useShopContext();
  const [userType, setUserType] = useState('customer'); // Default user type
  const [formData, setFormData] = useState({}); // Dynamic form data

  useLayoutEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('userType')) {
      setToken(localStorage.getItem('token'));
      const userType = localStorage.getItem('userType');
      setUserType(userType);
      router.push('/');
    }
  },[]);

  const formFields = {
    customer: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
    seller: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
    courier: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/users/login/${userType}`, formData);
      console.log('Login successful:', response.data);
      if (response.data.success) {
        setType(response.data.userType);
        setToken(response.data.token);
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('token', response.data.token);
        router.push('/');
      }

      alert('Login successful!');
      // Handle successful login (e.g., redirect to dashboard, store token, etc.)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed! Please try again.');
    }
  };
  console.log(Type);
  return (
    <div className="flex justify-center items-center bg-gray-100 font-[sans-serif] h-full md:min-h-screen p-4">
      <div className="grid justify-center max-w-md mx-auto">
        <div>
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full object-cover rounded-2xl"
            alt="login-image"
          />
        </div>
        <div className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
          <div className="mb-8">
            <h3 className="text-3xl font-extrabold text-blue-600">Sign in</h3>
          </div>
          <Tabs value={userType} onValueChange={(value) => setUserType(value)}>
            <TabsList className="flex flex-wrap mx-auto w-auto gap-1">
              <TabsTrigger value="customer" className="px-6">
                Customer
              </TabsTrigger>
              <TabsTrigger value="seller" className="px-6">
                Seller
              </TabsTrigger>
              <TabsTrigger value="courier" className="px-6">
                Courier
              </TabsTrigger>
            </TabsList>
            {Object.entries(formFields).map(([type, fields]) => (
              <TabsContent key={type} value={type}>
                {userType === type && (
                  <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                      <div key={field.name} className="mt-6">
                        <div className="relative flex items-center">
                          <input
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            onChange={handleInputChange}
                            value={formData[field.name] || ''}
                            className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                            placeholder={field.label}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            className="w-[18px] h-[18px] absolute right-2"
                            viewBox="0 0 682.667 682.667"
                          >
                            <defs>
                              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                <path
                                  d="M0 512h512V0H0Z"
                                  data-original="#000000"
                                ></path>
                              </clipPath>
                            </defs>
                            <g
                              clipPath="url(#a)"
                              transform="matrix(1.33 0 0 -1.33 0 682.667)"
                            >
                              <path
                                fill="none"
                                strokeMiterlimit="10"
                                strokeWidth="40"
                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                data-original="#000000"
                              ></path>
                              <path
                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                data-original="#000000"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="text-gray-800 ml-3 block text-sm"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="text-blue-600 text-sm font-semibold hover:underline"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-12">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Sign in
                      </button>
                      <p className="text-sm text-center mt-6">
                        Don't have an account{' '}
                        <Link
                          href="/auth/signup"
                          className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                        >
                          Register here
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
