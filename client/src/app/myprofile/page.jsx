"use client"

import { use, useEffect, useState } from "react";

import { useShopContext } from "@/context/ShopContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import EditPopup from "@/components/profile/EditPopup";
import OrderList from "@/components/profile/OrderList";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { token, Type, api } = useShopContext();
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

},[])
console.log(Type)
const getUserProfile = async () => {
  try {
    const response = await api.get(`/users/getProfile/${Type}`, { withCredentials: true });
    // console.log(response.data)
    setUserProfile(response.data.user);
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <Container>

      <div className="p-4">
        {/* Profile Header */}
        <ProfileHeader  type={Type} onEdit={handleEdit} />

        {/* Profile Details */}
       {userProfile && <ProfileDetails userProfile={userProfile} type={Type} />}

        {/* Edit Popup */}
        {isEditing && <EditPopup onClose={closeEditPopup} type={Type} />}

        {/* Order List */}
        <OrderList type={Type} />
      </div>
    </Container>
  );
};

export default ProfilePage;
