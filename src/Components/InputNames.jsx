import { useState } from "react";
const { ipcRenderer } = window.require("electron");

export default function InputNames(props) {
  const [namesInput, setNamesInput] = useState();
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groupSize, setGroupSize] = useState(2);

  const submitInput = () => {
    const names = namesInput.split(/\r?\n/);
    ipcRenderer
      .invoke("groupNames", { names: names, numberOfGroups: numberOfGroups })
      .then((response) => {
        console.log(response);
        props.setGroups(response.randomGroups);
        props.updateHistory(response.groupHistory);
      });
  };

  return (
    <>
      <div>
        <h1>Enter Names Separated by Lines</h1>

        <div className="input-area">
          <textarea
            className="input-names"
            onChange={(e) => setNamesInput(e.target.value)}
            value={namesInput}
          />

          <button onClick={submitInput}> Add Names</button>
        </div>

        <div className="number-of-groups">
          <h1>Number of groups to make: {numberOfGroups}</h1>
          <h4>2</h4>
          <input
            type="range"
            min={2}
            max={10}
            value={numberOfGroups}
            onChange={(e) => setNumberOfGroups(e.target.value)}
          />
          <h4>10</h4>
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
