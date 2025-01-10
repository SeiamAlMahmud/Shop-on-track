import React from 'react';

const ProfileHeader = ({ type, onEdit }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold capitalize">{type} Profile</h1>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
