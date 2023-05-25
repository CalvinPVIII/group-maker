import { auth } from "../js/Firebase/db";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

export default function SignIn(props) {
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");

  const handleSignIn = (email, password) => {
    if (!email || !password) {
      email = signInEmail;
      password = signInPassword;
    }
    console.log(email, password);
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setSignInMessage("");
        console.log("sign in");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setSignInMessage("Unable to sign in: " + error);
      });
  };

  const handleSignUp = () => {
    if (signUpPassword !== passwordConfirm) {
      setSignInMessage("Passwords do no match");
      return;
    }
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((user) => {
        console.log("created user");
        handleSignIn(signUpEmail, signUpPassword);
      })
      .catch((error) => {
        console.log(error);
        setSignInMessage("Unable to sign up: " + error);
      });
  };
  return (
    <>
      {signInMessage ? <h3 style={{ color: "red" }}>{signInMessage}</h3> : <></>}
      <div style={{ display: "flex", flexDirection: "column", flexFlow: "wrap", justifyContent: "space-around" }}>
        <div className="userForm">
          <h1>Sign In</h1>
          <label>Email:</label>
          <input type="text" name="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
          <br />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
        <div className="userForm">
          <h1>Sign Up</h1>
          <label>Email:</label>
          <input type="text" name="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
          <br />
          <label>Confirm Password:</label>
          <input type="password" name="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <br />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </>
  );
}
