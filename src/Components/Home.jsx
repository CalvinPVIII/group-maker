import { useState, useEffect, useContext } from "react";
import CohortForm from "./CohortForm.jsx";
import Cohort from "./Cohort.jsx";
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
      visibleState = <CohortForm type="add" />;
      break;
    case "selected_cohort":
      if (selectedCohort) {
        visibleState = <Cohort cohort={selectedCohort} />;
      }
      break;
    default:
      visibleState = (
        <>
          <h1>Home</h1>
          {cohorts && cohorts.length > 0 ? (
            <>
              <h3>Cohorts:</h3>
              {cohorts.map((cohort) => (
                <p key={cohort.id} onClick={() => handleCohortNameClick(cohort)}>
                  {cohort.name}
                </p>
              ))}
              <button onClick={() => setCurrentlyVisibleState("add_cohort")}>Add cohort</button>
              <br />
            </>
          ) : (
            <></>
          )}
        </>
      );
  }

  return (
    <>
      <div className="app" style={{ textAlign: "center" }}>
        {visibleState}
        <br />
        <button onClick={() => setCurrentlyVisibleState("home")}>Home</button>
      </div>
    </>
  );
}
