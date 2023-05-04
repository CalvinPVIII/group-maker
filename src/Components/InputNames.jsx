import { useState } from "react";
import Cohort from "../js/Models/Cohort";
import Person from "../js/Models/Person";

export default function InputNames(props) {
  const [namesInput, setNamesInput] = useState("");

  const handleNamesSubmit = () => {
    const names = namesInput.split(/\r?\n/).filter((name) => name.replace(/ /g, "") !== "");
    names.forEach((name) => {
      const person = new Person(name, null, {}, {}, {}, props.cohort.id);
      Person.save(person);

      props.cohort.addPeople(person);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Enter Names Separated by Lines</h2>
      <div className="input-area">
        <textarea style={{ height: "200px" }} className="input-names" onChange={(e) => setNamesInput(e.target.value)} value={namesInput} />
        <br />
        <button onClick={handleNamesSubmit}>Add People</button>
      </div>
    </div>
  );
}
