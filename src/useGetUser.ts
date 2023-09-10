import auth from "./ts/Firebase/db";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

export default function () {
  const [currentUser, setCurrentUser] = useState<User | null>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  return currentUser;
}
