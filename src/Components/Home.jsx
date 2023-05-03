import { useState, useEffect, useContext } from "react";
import Cohort from "../js/Models/Cohort.js";
import CohortForm from "./CohortForm.jsx";
import CohortComponent from "./Cohort.jsx";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../js/Firebase/db.js";

export default function Home() {
  const [cohorts, setCohorts] = useState();
  const [currentlyVisibleState, setCurrentlyVisibleState] = useState("home");
  const [selectedCohort, setSelectedCohort] = useState();
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cohorts"), (snapshot) => {
      const result = [];
      snapshot.forEach((cohort) => {
        result.push({ ...cohort.data() });
      });
      setCohorts(result);
    });
  }, []);

  const handleCohortNameClick = (cohort) => {
    setSelectedCohort(cohort);
    console.log(cohort);
    setCurrentlyVisibleState("selected_cohort");
  };

  let visibleState;

  switch (currentlyVisibleState) {
    case "add_cohort":
      visibleState = <CohortForm type="add" />;
      break;
    case "selected_cohort":
      if (selectedCohort) {
        visibleState = <CohortComponent cohort={selectedCohort} />;
      }
      break;
    default:
      visibleState = (
        <>
          <h1>Home</h1>
          <button onClick={() => setCurrentlyVisibleState("add_cohort")}>Add cohort</button>
          {cohorts && cohorts.length > 0 ? (
            <>
              {cohorts.map((cohort) => (
                <p key={cohort.id} onClick={() => handleCohortNameClick(cohort)}>
                  {cohort.name}
                </p>
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      );
  }

  console.log(cohorts);
  return (
    <>
      {visibleState}
      <br />
      <button onClick={() => setCurrentlyVisibleState("home")}>Home</button>
    </>
  );
}
