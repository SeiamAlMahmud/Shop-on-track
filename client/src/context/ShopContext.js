"use client";
import { createContext, useContext, useState } from 'react';

// Create a Context
const ShopContext = createContext();

// Create a provider component
export const ShopProvider = ({ children }) => {
  const [authState, setAuthState] = useState(125);

  // You can add more logic to manage your auth state (login, logout, etc.)
  const contain = { authState, setAuthState };
  return (
    <ShopContext.Provider value={contain}> {/* Use ShopContext.Provider here */}
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use the context
export const useShopContext = () => useContext(ShopContext); // Use ShopContext here
