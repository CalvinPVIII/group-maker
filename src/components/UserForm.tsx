import { useState } from "react";
import auth from "../ts/Firebase/db";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import "../css/UserForm.css";

type UserFormProps = {
  type: "login" | "register";
};

export default function UserForm(props: UserFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const nav = useNavigate();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setErrorMessage("");
        nav("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleFormSubmission = (): void => {
    if (!email || !password) {
      setErrorMessage("Email or password cannot be blank");
    } else {
      setPersistence(auth, browserLocalPersistence);
      if (props.type === "register") {
        if (password != passwordConfirm) {
          setErrorMessage("Passwords do not match");
        } else {
          createUserWithEmailAndPassword(auth, email, password).then(() => signIn());
        }
      } else {
        signIn();
      }
    }
  };

  return (
    <>
      <p className="error-message">{errorMessage}</p>
      <div className="user-form">
        {props.type === "register" ? <h3>Register</h3> : <h3>Log In</h3>}
        <h3></h3>
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        <p>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {props.type === "register" ? (
          <>
            <p>Confirm Password</p>
            <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            <br />
            <button className="form-button" onClick={handleFormSubmission}>
              Create Account
            </button>
          </>
        ) : (
          <>
            <br />
            <button className="form-button" onClick={handleFormSubmission}>
              Log In
            </button>
          </>
        )}
      </div>
    </>
  );
}
