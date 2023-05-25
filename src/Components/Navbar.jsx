import { useContext } from "react";
import { UserContext } from "./Home";
import { Link } from "react-router-dom";
import { auth } from "../js/Firebase/db";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth);
    navigate(0);
  };

  return (
    <div style={{ textAlign: "right", marginRight: "10px" }}>
      <p className="clickable">
        {user ? (
          <>
            {user.email}{" "}
            <span className="navbarItems" onClick={handleSignOut}>
              Sign Out
            </span>
          </>
        ) : (
          <Link to="/sign-in" className="navbarItems">
            Sign In
          </Link>
        )}
        <Link to="/" className="navbarItems">
          Home
        </Link>
      </p>
    </div>
  );
}