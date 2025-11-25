import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-2">
        <img src={user.avatarUrl || "/avatar.png"} alt="avatar" className="w-8 h-8 rounded-full"/>
        <span>{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded py-2 z-10">
          <Link to="/my-questions" className="block px-4 py-2 hover:bg-gray-100">My Questions</Link>
          <Link to="/my-answers" className="block px-4 py-2 hover:bg-gray-100">My Answers</Link>
          {user.role === "admin" && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</Link>}
          <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
