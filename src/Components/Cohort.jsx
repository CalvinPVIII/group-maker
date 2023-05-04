import { useEffect, useState } from "react";
import Cohort from "../js/Models/Cohort";
import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import PeopleNames from "./PeopleNames";

export default function CohortComponent(props) {
  const [people, setPeople] = useState();
  const [currentCohort, setCurrentCohort] = useState();

  const togglePeopleNames = (element) => {
    const target = element.target.nextElementSibling;

    if (target.classList.contains("shown")) {
      target.classList.remove("shown");
    } else {
      target.classList.add("shown");
    }
  };

  useEffect(() => {
    const cohort = new Cohort(
      props.cohort.name,
      props.cohort.people,
      props.cohort.description,
      props.cohort.id,
      props.cohort.creatorId,
      props.cohort.groups
    );
    setCurrentCohort(cohort);

    cohort.getPeople().then((response) => {
      setPeople(response);
    });
  }, [props.cohort]);

  const handleCreateGroups = () => {
    currentCohort.createGroups(people, 2);
  };

  if (currentCohort) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Cohort: {currentCohort.name}</h1>
        <h4>{currentCohort.description}</h4>
        {/* <InputNames cohort={currentCohort} /> */}

        {people && people.length > 0 ? (
          <>
            <h4 className="clickable" onClick={togglePeopleNames}>
              {" "}
              People in Cohort: {people.length}
            </h4>
            <PeopleNames people={people} cohort={currentCohort} />

            <button onClick={handleCreateGroups}>Create Groups</button>
            {currentCohort.groups && Object.values(currentCohort.groups).length > 0 ? (
              <>
                <PopulatedGroups groups={Object.values(currentCohort.groups)} cohort={currentCohort} />
              </>
            ) : (
              <>no groups</>
            )}
          </>
        ) : (
          <>There are no people</>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
