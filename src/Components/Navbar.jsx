import { Link } from "react-router-dom";
import { auth } from "../js/Firebase/db";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth);
    navigate(0);
  };

  const handleHomeClick = () => {
    props.setCurrentlyVisibleState("home");
  };

  return (
    <div style={{ textAlign: "right", marginRight: "10px" }}>
      <>
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
        <Link to="/" className="navbarItems" onClick={handleHomeClick}>
          Home
        </Link>
      </>
    </div>
  );
}
