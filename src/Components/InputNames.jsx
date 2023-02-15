import { useState } from "react";
import Grouper from "../js/Grouper";

export default function InputNames(props) {
  const [namesInput, setNamesInput] = useState();
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groupSize, setGroupSize] = useState(2);

  const submitInput = () => {
    // split names into array and remove spaces
    const names = namesInput
      .split(/\r?\n/)
      .filter((name) => name.replace(/ /g, "") !== "");

    const result = Grouper.createGroups(names, numberOfGroups);
    const history = Grouper.showGroupingHistory(result);

    props.setGroups(result);

    props.updateHistory(history);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 id="inputNamesHeader">Enter Names Separated by Lines</h1>

        <div className="input-area">
          <textarea
            style={{ height: "200px" }}
            className="input-names"
            onChange={(e) => setNamesInput(e.target.value)}
            value={namesInput}
          />
          <br />
          <button onClick={submitInput}> Add Names</button>
        </div>

        <div className="number-of-groups">
          <h1>Number of groups to make: {numberOfGroups}</h1>
          <label>
            2
            <input
              type="range"
              min={2}
              max={10}
              value={numberOfGroups}
              onChange={(e) => setNumberOfGroups(e.target.value)}
            />
            10
          </label>
        </div>

        {/* WIP */}
        <div className="max-per-group">
          {/* <h1>Max people per group</h1>
          <input
            type="range"
            min={2}
            max={10}
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
          /> */}
        </div>
      </div>
    </>
  );
}
