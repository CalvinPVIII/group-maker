import { useState, useEffect, createContext } from "react";
import CohortForm from "./CohortForm.jsx";
import Cohort from "./Cohort.jsx";
import SignIn from "./SignIn.jsx";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db, { auth } from "../js/Firebase/db.js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export const UserContext = createContext(null);

export default function Home() {
  const [cohorts, setCohorts] = useState();
  const [currentlyVisibleState, setCurrentlyVisibleState] = useState("home");
  const [selectedCohort, setSelectedCohort] = useState();

  useEffect(() => {
    if (auth.currentUser) {
      console.log("user signed in", auth.currentUser);
      const q = query(collection(db, "cohorts"), where("creatorId", "==", auth.currentUser.uid));
      const unsub = onSnapshot(q, (snapshot) => {
        const result = [];
        snapshot.forEach((cohort) => {
          result.push({ ...cohort.data() });
        });
        setCohorts(result);
      });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (!selectedCohort) return;

    const updatedCohort = cohorts.find((c) => c.id === selectedCohort.id);

    setSelectedCohort(updatedCohort);
  }, [cohorts]);

  const handleCohortNameClick = (cohort) => {
    setSelectedCohort(cohort);
    setCurrentlyVisibleState("selected_cohort");
  };

  let visibleState;

  switch (currentlyVisibleState) {
    case "add_cohort":
      visibleState = <CohortForm type="add" changeState={setCurrentlyVisibleState} />;
      break;
    case "selected_cohort":
      if (selectedCohort) {
        visibleState = <Cohort cohort={selectedCohort} changeState={setCurrentlyVisibleState} />;
      }
      break;
    case "sign_in":
      visibleState = <SignIn changeState={setCurrentlyVisibleState} />;
      break;
    default:
      visibleState = (
        <>
          <h1>Home</h1>
          {cohorts && cohorts.length > 0 ? (
            <>
              <h3>Cohorts:</h3>
              {cohorts.map((cohort) => (
                <p className="clickable" key={cohort.id} onClick={() => handleCohortNameClick(cohort)}>
                  {cohort.name}
                </p>
              ))}
              <br />
            </>
          ) : (
            <></>
          )}
          <button onClick={() => setCurrentlyVisibleState("add_cohort")}>Add cohort</button>
        </>
      );
  }

  return (
    <>
      <UserContext.Provider value={auth.currentUser}>
        <Navbar />
        <div className="app" style={{ textAlign: "center" }}>
          {auth.currentUser ? <>{visibleState}</> : <p>Please sign in to continue</p>}

          <br />

          <h3>
            <Link to="/v1">Group maker v1</Link>
          </h3>
        </div>
      </UserContext.Provider>
    </>
  );
}
