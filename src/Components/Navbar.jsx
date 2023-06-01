import { Link } from "react-router-dom";
import { auth } from "../js/Firebase/db";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState("loading");

  const handleSignOut = () => {
    signOut(auth);
    navigate(0);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleHomeClick = () => {
    props.setCurrentlyVisibleState("home");
  };

  return (
    <div style={{ textAlign: "right", marginRight: "10px" }}>
      <>
        {user && user !== "loading" ? (
          <>
            {user.email}{" "}
            <span className="navbarItems" onClick={handleSignOut}>
              Sign Out
            </span>
          </>
        ) : user === "loading" ? (
          <></>
        ) : (
          <Link to="/sign-in" className="navbarItems">
            Sign In
          </Link>
        )}
        <Link to="/" className="navbarItems" onClick={handleHomeClick}>
          Home
        </Link>
      </>
    </div>
  );
}
