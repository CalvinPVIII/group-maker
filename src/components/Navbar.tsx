import auth from "../ts/Firebase/db";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

import useGetUser from "../useGetUser";

export default function Navbar() {
  const currentUser = useGetUser();

  const nav = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        nav("/");
      })
      .catch(() => {
        nav("/");
      });
  };

  return (
    <div className="navbar">
      {currentUser ? (
        <>
          <p className="clickable" onClick={handleSignOut}>
            Sign Out
          </p>
          <p>{currentUser.email}</p>
        </>
      ) : (
        <Link to="/login">
          <p>Login/Register</p>
        </Link>
      )}
      <Link to="/">
        <p style={{ marginRight: "10px" }}>Home</p>
      </Link>
    </div>
  );
}
