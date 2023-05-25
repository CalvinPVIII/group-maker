import { useState, useContext } from "react";
import Cohort from "../js/Models/Cohort";
import { UserContext } from "./Home";

export default function CohortForm(props) {
  const user = useContext(UserContext);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const addCohort = () => {
    if (user) {
      const cohort = new Cohort(nameInput, [], descriptionInput, null, user.uid, []);
      Cohort.save(cohort);

      props.changeState("home");
    }
  };

  const editCohort = () => {
    props.cohort.name = nameInput;
    props.cohort.description = descriptionInput;
    Cohort.update(props.cohort);
  };

  return (
    <>
      <h1> Cohort Form</h1>
      <label>
        Cohort name:
        <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} />
      </label>

      {props.type === "edit" && props.cohort ? <button onClick={editCohort}>Edit</button> : <button onClick={addCohort}>Add</button>}
    </>
  );
}
