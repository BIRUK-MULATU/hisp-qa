import React from 'react';
import { LogOut, User, Shield } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen }) => {
  const { user, logout } = useContext(AuthContext);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4 border-b">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div className="py-2">
        {user.isAdmin && (
          <Link to="/admin" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <Shield className="h-4 w-4 mr-2" /> Admin Panel
          </Link>
        )}
        <button onClick={logout} className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;