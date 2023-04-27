import { useEffect, useState } from "react";
import Cohort from "../js/Models/Cohort";
import InputNames from "./InputNames";

export default function CohortComponent(props) {
  const [people, setPeople] = useState();
  const [currentCohort, setCurrentCohort] = useState();
  useEffect(() => {
    const cohort = new Cohort(props.cohort.name, props.cohort.people, props.cohort.description, props.cohort.id, props.cohort.creatorId);
    setCurrentCohort(cohort);
    console.log(cohort);

    cohort.getPeople().then((response) => {
      setPeople(response);
    });
  }, []);

  if (currentCohort) {
    console.log(currentCohort);
    return (
      <>
        <h1>Cohort: {currentCohort.name}</h1>
        <InputNames />
        {people && people.length > 0 ? <>There are people</> : <>There are no people</>}
      </>
    );
  } else {
    return <></>;
  }
}
