"use client"

import { useState } from "react";

import { useShopContext } from "@/context/ShopContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import EditPopup from "@/components/profile/EditPopup";
import OrderList from "@/components/profile/OrderList";
import Container from "@/components/Container";

const ProfilePage = () => {
  const { token, Type } = useShopContext();


  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
  };

  return (
    <Container>

      <div className="p-4">
        {/* Profile Header */}
        <ProfileHeader type={Type} onEdit={handleEdit} />

        {/* Profile Details */}
        <ProfileDetails type={Type} />

        {/* Edit Popup */}
        {isEditing && <EditPopup onClose={closeEditPopup} type={Type} />}

        {/* Order List */}
        <OrderList type={Type} />
      </div>
    </Container>
  );
};

export default ProfilePage;
