import React, { useState, useRef, useEffect } from 'react';
import { User, ShoppingCart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useShopContext } from '@/context/ShopContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Badge = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { api, setType, setToken } = useShopContext();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = async () => {
    setIsDropdownOpen(false);
    try {
      const response = await api.post('/users/logout');
      router.push('/'); // Redirect to home page
      toast.success('Logged out successfully');
      setType('');
      setToken(null);
      localStorage.clear();
    } catch (error) {
      console.log(error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Badge */}
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <img
          src="https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996"
          alt="avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div className="p-[2px] bg-white absolute top-[31px] right-[6px] rounded-full">
          <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50">
          <ul className="py-2">
            <Link href={'/myprofile'}>
              {' '}
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="mr-2 text-gray-600" size={18} />
                Profile
              </li>
            </Link>
            <Link href={'/orders'}>
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                <ShoppingCart className="mr-2 text-gray-600" size={18} />
                Orders
              </li>
            </Link>
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="mr-2 text-gray-600" size={18} />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Badge;
