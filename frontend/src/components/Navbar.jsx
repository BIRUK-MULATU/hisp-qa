
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Shield, Search, Plus, Menu, ChevronDown } from 'lucide-react';

const Navbar = ({ onSearch, onMenuClick }) => {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center gap-4">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-hispBlue rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-hispActive transition-colors">H</div>
            <h1 className="text-xl font-bold text-hispBlue hidden md:block tracking-tight group-hover:text-hispActive transition-colors">HISP Ethiopia Q&A</h1>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden sm:block">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-hispBlue transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-hispBlue/20 focus:border-hispBlue transition-all text-sm"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {user ? (
            <>
              <Link
                to="/create"
                className="hidden sm:flex items-center space-x-2 bg-hispGreen text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition shadow-sm text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Ask Question</span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center space-x-2 hover:bg-gray-50 p-1.5 rounded-lg transition border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-hispBlue font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {dropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdown(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 mb-2 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-hispBlue transition-colors"
                          onClick={() => setDropdown(false)}
                        >
                          <Shield className="h-4 w-4 mr-3" /> Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-hispBlue font-semibold hover:text-hispActive px-4 py-2 text-sm transition hidden sm:block">
                Log in
              </Link>
              <Link to="/signup" className="border border-hispGreen text-hispGreen px-4 py-2 rounded-full font-semibold hover:bg-green-50 transition text-sm hidden sm:block">
                Sign up
              </Link>
              <Link to="/login" className="sm:hidden text-hispBlue p-2">
                <LogIn className="h-6 w-6" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;