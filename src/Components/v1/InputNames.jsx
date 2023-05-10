import { useState } from "react";
import Grouper from "../../js/Grouper";

export default function InputNames(props) {
  const [namesInput, setNamesInput] = useState();
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groupSize, setGroupSize] = useState(2);
  const [numberOfGroupsOrMaxSize, setNumberOfGroupsOrMaxSize] = useState("numberOfGroups");

  const submitInput = () => {
    // split names into array and remove spaces
    const names = namesInput.split(/\r?\n/).filter((name) => name.replace(/ /g, "") !== "");
    let result;
    if (numberOfGroupsOrMaxSize === "numberOfGroups") {
      const peoplePerGroup = Math.ceil(names.length / numberOfGroups);
      result = Grouper.createGroups(names, peoplePerGroup);
    } else if (numberOfGroupsOrMaxSize === "maxSize") {
      result = Grouper.createGroups(names, groupSize);
    }
    const history = Grouper.updateGroupHistory(result);

    props.setGroups(result);
    props.updateHistory(history);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 id="inputNamesHeader">Enter Names Separated by Lines</h1>

        <div className="input-area">
          <textarea style={{ height: "200px" }} className="input-names" onChange={(e) => setNamesInput(e.target.value)} value={namesInput} />
          <br />
        </div>

        <div>
          <h3>Group by:</h3>
          <h3>
            <span
              style={numberOfGroupsOrMaxSize === "numberOfGroups" ? { opacity: "1" } : { opacity: "0.5" }}
              onClick={() => setNumberOfGroupsOrMaxSize("numberOfGroups")}
            >
              Max Number of Groups
            </span>{" "}
            ||{" "}
            <span
              style={numberOfGroupsOrMaxSize === "maxSize" ? { opacity: "1" } : { opacity: "0.5" }}
              onClick={() => setNumberOfGroupsOrMaxSize("maxSize")}
            >
              Max Number of People per Group
            </span>
          </h3>
        </div>

        <div className="number-of-groups" style={numberOfGroupsOrMaxSize === "numberOfGroups" ? { display: "block" } : { display: "none" }}>
          <h1>Number of groups to make: {numberOfGroups}</h1>
          <label>
            2
            <input type="range" min={2} max={10} value={numberOfGroups} onChange={(e) => setNumberOfGroups(e.target.value)} />
            10
          </label>
        </div>
        {/* WIP */}
        <div className="max-per-group" style={numberOfGroupsOrMaxSize === "maxSize" ? { display: "block" } : { display: "none" }}>
          <h1>Max people per group: {groupSize}</h1>
          <label>
            2
            <input type="range" min={2} max={10} value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
            10
          </label>
        </div>

        <button onClick={submitInput} style={{ marginBottom: "10px" }}>
          {" "}
          Create Groups
        </button>

        <button onClick={props.undoLastGrouping}>Undo Last Grouping</button>
      </div>
    </>
  );
}
