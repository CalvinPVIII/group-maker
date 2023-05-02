import { useEffect, useState } from "react";
import Cohort from "../js/Models/Cohort";
import InputNames from "./InputNames";

export default function CohortComponent(props) {
  const [people, setPeople] = useState();
  const [currentCohort, setCurrentCohort] = useState();
  const cohort = new Cohort(props.cohort.name, props.cohort.people, props.cohort.description, props.cohort.id, props.cohort.creatorId);
  useEffect(() => {
    setCurrentCohort(cohort);
    console.log(cohort);

    cohort.getPeople().then((response) => {
      setPeople(response);
    });
  }, []);

  const handleCreateGroups = () => {
    console.log(cohort.createGroups(people, 4));
  };

  if (currentCohort) {
    console.log(people);
    return (
      <>
        <h1>Cohort: {currentCohort.name}</h1>
        <InputNames cohort={cohort} />

        {people && people.length > 0 ? (
          <>
            {people.map((person) => (
              <p key={person.id}>{person.name}</p>
            ))}
            <button onClick={handleCreateGroups}>Create Groups</button>
          </>
        ) : (
          <>There are no people</>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
