"use client"

import { useEffect, useState } from "react";
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
  }, [api]);

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/users/getProfile/${Type}`, { withCredentials: true });
      setUserProfile(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="p-4">
        {/* Profile Header */}
        <ProfileHeader type={Type} onEdit={handleEdit} />

        {/* Profile Details */}
        {userProfile && <ProfileDetails userProfile={userProfile} type={Type} />}

        {/* Edit Popup */}
        {isEditing && <EditPopup onClose={closeEditPopup} type={Type} />}

        {/* Order List */}
        {userProfile && userProfile.orderHistory && userProfile.orderHistory.length !== 0 ?(
          <OrderList userProfile={userProfile} type={Type} />
        ) : (
          <div>You have no orders</div>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
