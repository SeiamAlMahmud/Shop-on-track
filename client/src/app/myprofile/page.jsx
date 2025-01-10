"use client";

import { useEffect, useState } from "react";
import { useShopContext } from "@/context/ShopContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import EditPopup from "@/components/profile/EditPopup";
import OrderListForCustomer from "@/components/profile/OrderList";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import OrderListForSeller from "@/components/profile/OrderListForSeller";
import OrderListForCourier from "@/components/profile/OrderListForCourier";
import toast from 'react-hot-toast';
import Link from "next/link";

const ProfilePage = () => {
  const { token, Type, api,setType,setToken } = useShopContext();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    getUserProfile();
  }, [api]);

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/users/getProfile/${Type}`, { withCredentials: true });
      setUserProfile(response.data.user);
    } catch (error) {
      console.log(error);
      // logout();
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/order/${orderId}/status`, { status }, { withCredentials: true });
      toast.success('Order status updated successfully!');
      getUserProfile(); // Refresh the profile data
    } catch (error) {
      console.error('Failed to update order status:', error.response?.data || error.message);
      toast.error('Failed to update order status. Please try again.');
    }
  };

  const logout = async () => {
    
    try {
        const response = await api.post('/users/logout')
        router.push('/'); // Redirect to home page
        toast.success("Logged out successfully")
        setType("");
        setToken(null);
        localStorage.clear();
    } catch (error) {
        console.log(error)
        toast.error("Failed to log out")
    }
}
  return (
    <Container>
      <div className="p-4 h-screen">
        {/* Profile Header */}
        <ProfileHeader type={Type} onEdit={handleEdit} />

        {/* Profile Details */}
        {userProfile && <ProfileDetails userProfile={userProfile} type={Type} />}

        {/* Edit Popup */}
        {isEditing && <EditPopup onClose={closeEditPopup} type={Type} />}

        {/* Order List */}
        {Type == "customer" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForCustomer userProfile={userProfile} type={Type} />
        ) : (
          <></>
        )}
        {Type == "seller" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForSeller userProfile={userProfile} type={Type} updateOrderStatus={updateOrderStatus} />
        ) : (
          <></>
        )}
        {Type == "courier" && userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderListForCourier userProfile={userProfile} type={Type} updateOrderStatus={updateOrderStatus} />
        ) : (
          <></>
        )}
        <div className="flex items-end justify-end">
          <Link href={"/orders"}>
          <button className="mt-5 bg-slate-500 p-1 block text-white rounded-md hover:text-blue-200 cursor-pointer px-2">See More...</button> 
          </Link>
          </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
