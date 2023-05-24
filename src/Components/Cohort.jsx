import { useEffect, useState } from "react";
import Cohort from "../js/Models/Cohort";
import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import PeopleNames from "./PeopleNames";
import GroupingSettings from "./GroupingSettings";
import CohortSettingsModal from "./CohortSettingsModal";

export default function CohortComponent(props) {
  const [people, setPeople] = useState();
  const [currentCohort, setCurrentCohort] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleCreateGroups = (numberOfGroups) => {
    currentCohort.createGroups(people, numberOfGroups);
  };

  if (currentCohort) {
    return (
      <>
        {modalVisible ? (
          <CohortSettingsModal cohort={currentCohort} changeState={props.changeState} handleExit={() => setModalVisible(false)} />
        ) : (
          <></>
        )}
        <div style={{ textAlign: "center" }}>
          <h1 onClick={() => setModalVisible(true)}>Cohort: {currentCohort.name}</h1>
          <h4>{currentCohort.description}</h4>

          {people && people.length > 0 ? (
            <>
              <h4 className="clickable" onClick={togglePeopleNames}>
                {" "}
                People in Cohort: {people.length}
              </h4>
              <PeopleNames people={people} cohort={currentCohort} />

              <GroupingSettings namesLength={people.length} handleCreateGroups={handleCreateGroups} />
              {currentCohort.groups && Object.values(currentCohort.groups).length > 0 ? (
                <>
                  <PopulatedGroups groups={Object.values(currentCohort.groups)} cohort={currentCohort} />
                </>
              ) : (
                <>no groups</>
              )}
            </>
          ) : (
            <>
              <p>There are no people</p>
              <InputNames cohort={currentCohort} />
            </>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
