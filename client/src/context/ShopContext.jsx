'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Create a Context
const ShopContext = createContext();

// Create a provider component
export const ShopProvider = ({ children }) => {
  const [authState, setAuthState] = useState(125);
  const [Type, setType] = useState('');
  const [token, setToken] = useState(null);
  const router = useRouter();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your backend base URL
    withCredentials: true, // Enables sending cookies with requests
    headers: {
      'Content-Type': 'application/json', // Default header
    },
  });

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }

    const usrType = localStorage.getItem('userType');
    if (usrType) {
      setType(usrType);
    }
    // refreshToken();
  }, [token, Type]);

  const refreshToken = async () => {
    try {
      const response = await api.get(`/users/refresh`, {
        withCredentials: true,
      });
      // console.log(response,"response")
    } catch (error) {
      console.log(error);
      router.push('/'); // Redirect to home page
      setType('');
      setToken(null);
      localStorage.clear();
    }
  };

  // You can add more logic to manage your auth state (login, logout, etc.)
  const contain = {
    authState,
    setAuthState,
    api,
    Type,
    setType,
    token,
    setToken,
  };
  return (
    <ShopContext.Provider value={contain}>
      {' '}
      {/* Use ShopContext.Provider here */}
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use the context
export const useShopContext = () => useContext(ShopContext); // Use ShopContext here
