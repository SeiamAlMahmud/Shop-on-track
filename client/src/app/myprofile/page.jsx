'use client';

import { useEffect, useState } from 'react';
import { useShopContext } from '@/context/ShopContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileDetails from '@/components/profile/ProfileDetails';
import EditPopup from '@/components/profile/EditPopup';
import OrderListForCustomer from '@/components/profile/OrderList';
import Container from '@/components/Container';
import { useRouter } from 'next/navigation';
import OrderListForSeller from '@/components/profile/OrderListForSeller';
import OrderListForCourier from '@/components/profile/OrderListForCourier';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AddProductPopup from '@/components/profile/AddProductPopup';

const ProfilePage = () => {
  const { token, Type, api, setType, setToken } = useShopContext();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
  };
  const handleAdd = () => {
    setIsAdding(true);
  };

  const closeAddingPopup = () => {
    setIsAdding(false);
  };

  useEffect(() => {
    getUserProfile();
  }, [api]);

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/users/getProfile/${Type}`, {
        withCredentials: true,
      });
      setUserProfile(response.data.user);
    } catch (error) {
      console.log(error);
      // logout();
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(
        `/order/${orderId}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success('Order status updated successfully!');
      getUserProfile(); // Refresh the profile data
    } catch (error) {
      console.error(
        'Failed to update order status:',
        error.response?.data || error.message
      );
      toast.error('Failed to update order status. Please try again.');
    }
  };

  return (
    <Container>
      <div className="p-4 h-screen">
        {/* Profile Header */}
        <ProfileHeader type={Type} onEdit={handleEdit} onAdd={handleAdd} />

        {/* Profile Details */}
        {userProfile && (
          <ProfileDetails userProfile={userProfile} type={Type} />
        )}

        {/* Edit Popup */}
        {isEditing && <EditPopup onClose={closeEditPopup} type={Type} />}

        {/* Add Popup */}
        {isAdding && <AddProductPopup onClose={closeAddingPopup} type={Type} />}

        {/* Order List */}
        {Type == 'customer' &&
        userProfile &&
        userProfile.orderHistory &&
        userProfile.orderHistory.length !== 0 ? (
          <OrderListForCustomer userProfile={userProfile} type={Type} />
        ) : (
          <></>
        )}
        {Type == 'seller' &&
        userProfile &&
        userProfile.orderHistory &&
        userProfile.orderHistory.length !== 0 ? (
          <OrderListForSeller
            userProfile={userProfile}
            type={Type}
            updateOrderStatus={updateOrderStatus}
          />
        ) : (
          <></>
        )}
        {Type == 'courier' &&
        userProfile &&
        userProfile.orderHistory &&
        userProfile.orderHistory.length !== 0 ? (
          <OrderListForCourier
            userProfile={userProfile}
            type={Type}
            updateOrderStatus={updateOrderStatus}
          />
        ) : (
          <></>
        )}
        <div className="flex items-end justify-end">
          <Link href={'/orders'}>
            {/* From Uiverse.io by Javierrocadev  */}
            <button className="group relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-10 w-44 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold mt-6 -z-20">
              <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
              <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
              <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
              <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
              <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
              <p className="z-10 group-hover:scale-105 duration-500">
                See More...
              </p>
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
