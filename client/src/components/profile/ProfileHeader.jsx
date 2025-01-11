import { CirclePlus } from 'lucide-react';
import React from 'react';

const ProfileHeader = ({ type, onEdit, onAdd }) => {
  return (
    <div className="flex justify-between items-center p-4  bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold capitalize">{type} Profile</h1>
      <div className='flex justify-center items-center gap-3'>
      <button
        onClick={onAdd}
        className="flex g-2 justify-between items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
        New <CirclePlus className='ml-2' />
      </button>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
        Edit Profile
      </button>
        </div>
    </div>
  );
};

export default ProfileHeader;
