'use client';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';

// Create a Context
const ShopContext = createContext();

// Create a provider component
export const ShopProvider = ({ children }) => {
  const [authState, setAuthState] = useState(125);
  const [Type, setType] = useState('');
  const [token, setToken] = useState(null);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your backend base URL
    withCredentials: true, // Enables sending cookies with requests
    headers: {
      'Content-Type': 'application/json', // Default header
    },
  });

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
