import React from 'react';

interface UserButtonProps {
  avatarUrl: string;
  name: string;
}

const UserButton: React.FC<UserButtonProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full border border-gray-300"
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default UserButton;
