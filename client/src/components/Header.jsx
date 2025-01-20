'use client';
import React, { useState } from 'react';

// react icons
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
                    className="px-4 py-2 bg-green-700 text-white rounded-r-md hover:bg-green-800">
                    <i className="fas fa-search"></i>
                    Search
                </button>
            </div>
            <div className="flex items-center space-x-4 ml-6">
               {
               token ? (
                <Badge />
              ) : ( <Link href="/auth/login" className="hover:underline">Login</Link> 
               )}
            </div>
        </div>
        <nav className="bg-green-800">
            <div className="container mx-auto">
                <ul className="flex justify-center space-x-6 py-3">
                    <li><Link href="/" className="text-white font-bold hover:underline">Home</Link></li>
                    {/* <li><Link href="/" className="text-white font-bold hover:underline">Shop</Link></li> */}
                    <li><Link href="/" className="text-white font-bold hover:underline">Offers</Link></li>
                    <li><Link href="#contact" className="text-white font-bold hover:underline">Contact</Link></li>
                    <li><Link href="#contact" className="text-white font-bold hover:underline">About Us</Link></li>
                </ul>
            </div>
        </nav>
    </header>

    {/* old code  */}
      {/* <nav className="flex items-center justify-between w-full relative bg-white boxShadow rounded-full px-[10px] py-[8px]">
        <Link href="/">
          <Image
            width={55}
            height={65}
            src="https://i.ibb.co/0BZfPq6/darklogo.png"
            alt="logo"
          />
        </Link>
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] lg:flex hidden">
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            home
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            features
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            blogs
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            shop
          </li>
        </ul>

        <div className="items-center gap-[10px] flex">
          {token ? (
            <Badge />
          ) : (
            <Link href={'/auth/login'}>
              <button className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex ">
                Sign In
              </button>
            </Link>
          )}

          <CiMenuFries
            className="text-[1.8rem] mr-1 text-[#424242]c cursor-pointer lg:hidden flex"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>

        <aside
          className={` ${mobileSidebarOpen ? 'translate-x-0 opacity-100 z-20' : 'translate-x-[200px] opacity-0 z-[-1]'} lg:hidden bg-white boxShadow p-4 text-center absolute top-[65px] right-0 w-full rounded-md transition-all duration-300`}
        >
          <div className="relative mb-5">
            <input
              className="py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
              placeholder="Search..."
            />
            <IoIosSearch className="absolute top-[8px] left-3 text-gray-500 text-[1.3rem]" />
          </div>
          <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
            <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
              home
            </li>
            <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-poin ter capitalize">
              Features
            </li>
            <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
              Blogs
            </li>
            <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
              Shop
            </li>
          </ul>
        </aside>
      </nav> */}
    </div>
  );
};

export default ResponsiveNavbar;
