import { useState } from "react";
export default function GroupingSettings(props) {
  const [numberOfGroupsOrMaxSize, setNumberOfGroupsOrMaxSize] = useState("numberOfGroups");
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groupSize, setGroupSize] = useState(2);

  const onCreateGroupsClick = () => {
    if (numberOfGroupsOrMaxSize === "numberOfGroups") {
      const peoplePerGroup = Math.ceil(props.namesLength / numberOfGroups);
      props.handleCreateGroups(peoplePerGroup);
    } else if (numberOfGroupsOrMaxSize === "maxSize") {
      props.handleCreateGroups(groupSize);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
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
      <button onClick={onCreateGroupsClick}>Create Groups</button>
    </div>
  );
}
