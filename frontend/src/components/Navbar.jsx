import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Shield, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-hispBlue rounded-lg flex items-center justify-center text-white font-bold text-xl">H</div>
          <h1 className="text-2xl font-bold text-hispBlue hidden sm:block">HISP Ethiopia Q&A</h1>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="relative">
              <button onClick={() => setDropdown(!dropdown)} className="flex items-center space-x-2">
                <User className="h-6 w-6 text-hispBlue" />
                <span className="font-medium">{user.name}</span>
                {user.isAdmin && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">ADMIN</span>}
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                  {user.isAdmin && (
                    <Link to="/admin" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                      <Shield className="h-4 w-4 mr-2" /> Admin Panel
                    </Link>
                  )}
                  <button onClick={logout} className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-100">
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-hispBlue text-white px-6 py-2 rounded-lg hover:bg-hispDark flex items-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;