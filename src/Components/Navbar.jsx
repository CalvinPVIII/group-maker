import { useContext } from "react";
import { UserContext } from "./Home";

export default function Navbar(props) {
  const user = useContext(UserContext);

  const handleSignInClick = () => {
    props.changeState("sign_in");
  };

  const handleHomeClick = () => {
    props.changeState("home");
  };

  return (
    <div style={{ textAlign: "right", marginRight: "10px" }}>
      <p className="clickable">
        {user.currentUser ? <span>{user.currentUser.email}</span> : <span onClick={handleSignInClick}>Sign In</span>}
        <span style={{ marginLeft: "20px" }} onClick={handleHomeClick}>
          Home
        </span>
      </p>
    </div>
  );
}
