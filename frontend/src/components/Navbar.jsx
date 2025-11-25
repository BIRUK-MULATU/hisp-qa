import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import hispLogo from "../assets/hisp.png";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-hispBlue text-white p-4 flex justify-between items-center">
      <Link to="/"><img src={hispLogo} alt="HISP Logo" className="h-10" /></Link>
      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create-question">Ask Question</Link>
            <ProfileDropdown />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
