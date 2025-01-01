import React from "react";

const ProfileDetails = ({ type }) => {
  const details = {
    seller: { name: "John Seller", email: "seller@example.com", shop: "Shop Name" },
    customer: { name: "Jane Customer", email: "customer@example.com", address: "123 Main St" },
    courier: { name: "Bob Courier", email: "courier@example.com", vehicle: "Van" },
  };

  const currentDetails = details[type] || {};

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold">Details</h2>
      <p>Name: {currentDetails.name}</p>
      <p>Email: {currentDetails.email}</p>
      {type === "seller" && <p>Shop: {currentDetails.shop}</p>}
      {type === "customer" && <p>Address: {currentDetails.address}</p>}
      {type === "courier" && <p>Vehicle: {currentDetails.vehicle}</p>}
    </div>
  );
};

export default ProfileDetails;
