'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { IoIosSearch } from 'react-icons/io';
import { CiMenuFries } from 'react-icons/ci';
import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import { useShopContext } from '@/context/ShopContext';
import Badge from './Badge';

const ResponsiveNavbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { token } = useShopContext();

  // Function to handle Offers button click
  const handleOffersClick = () => {
    Swal.fire({
      icon: 'info',
      title: 'No Offers Available',
      text: 'There are no offers at the moment. Please check back later!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4CAF50',
    });
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-xl font-bold">
            <Link href="/" className="hover:underline">Shop On Track</Link>
          </div>
          <div className="flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Search for fresh produce..."
              className="flex-grow p-2 rounded-l-md border-none focus:ring focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-r-md hover:bg-green-800"
            >
              <i className="fas fa-search"></i>
              Search
            </button>
          </div>
          <div className="flex items-center space-x-4 ml-6">
            {token ? (
              <Badge />
            ) : (
              <Link href="/auth/login" className="hover:underline">Login</Link>
            )}
          </div>
        </div>
        <nav className="bg-green-800">
          <div className="container mx-auto">
            <ul className="flex justify-center space-x-6 py-3">
              <li><Link href="/" className="text-white font-bold hover:underline">Home</Link></li>
              <li>
                <button
                  onClick={handleOffersClick}
                  className="text-white font-bold hover:underline focus:outline-none"
                >
                  Offers
                </button>
              </li>
              <li><Link href="#contact" className="text-white font-bold hover:underline">Contact</Link></li>
              <li><Link href="#about" className="text-white font-bold hover:underline">About Us</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default ResponsiveNavbar;
