import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import hispLogo from "../assets/hisp.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-hispBlue text-white p-4 flex justify-between items-center">
      <img src={hispLogo} alt="HISP Logo" className="h-10" />
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create-question">Ask Question</Link>
            <button onClick={logout}>Logout</button>
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
