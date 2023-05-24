import { useState } from "react";
import Cohort from "../js/Models/Cohort";

export default function CohortSettingsModal(props) {
  const wordStyle = { wordWrap: "break-word" };
  const [nameInput, setNameInput] = useState(props.cohort.name);
  const [descInput, setDescInput] = useState(props.cohort.description);

  const onUpdate = (value, property) => {
    props.cohort[property] = value;
    Cohort.save(props.cohort);
  };

  const handleDelete = () => {
    Cohort.delete(props.cohort);
    props.changeState("home");
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",

          zIndex: "2",
          top: "0%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        onClick={props.handleExit}
      ></div>
      <div
        className="person-modal"
        style={{
          textAlign: "left",
          paddingLeft: "5px",
          width: "200px",
          zIndex: "3",
          position: "absolute",
          border: "1px solid #10002b",
          backgroundColor: "#240046",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <label style={wordStyle}>
          Name: <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </label>
        <button onClick={() => onUpdate(nameInput, "name")}>Update Name</button>
        <br />
        <label style={wordStyle}>
          Description: <input type="text" value={descInput} onChange={(e) => setDescInput(e.target.value)} />
        </label>
        <br />
        <button onClick={() => onUpdate(descInput, "description")}>Update Description</button>
        <br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
