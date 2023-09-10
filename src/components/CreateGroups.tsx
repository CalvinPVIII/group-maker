import { Dispatch, SetStateAction, useState } from "react";
import { Item } from "../ts/Models/Item";
import GroupHelper from "../ts/Models/Group";
import { useDispatch } from "react-redux";
import { storeGroups } from "../redux/groupsReducer";

type CreateGroupsCallback = {
  buttonVisibilityCallback: Dispatch<SetStateAction<boolean>>;
  itemsList: Array<Item>;
};

export default function CreateGroups(props: CreateGroupsCallback) {
  const [numberOfGroupsOrMaxSize, setNumberOfGroupsOrMaxSize] = useState<"maxSize" | "numberOfGroups">("numberOfGroups");
  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groupSize, setGroupSize] = useState(2);
  const dispatch = useDispatch();

  const handleMakingGroups = () => {
    props.buttonVisibilityCallback(false);
    let createdGroups;
    if (numberOfGroupsOrMaxSize === "numberOfGroups") {
      const peoplePerGroup = Math.ceil(props.itemsList.length / numberOfGroups);
      createdGroups = GroupHelper.createGroups(props.itemsList, peoplePerGroup);
    } else if (numberOfGroupsOrMaxSize === "maxSize") {
      createdGroups = GroupHelper.createGroups(props.itemsList, groupSize);
    }
    dispatch(storeGroups(createdGroups));
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
          <input type="range" min={2} max={10} value={numberOfGroups} onChange={(e) => setNumberOfGroups(parseInt(e.target.value))} />
          10
        </label>
      </div>

      <div className="max-per-group" style={numberOfGroupsOrMaxSize === "maxSize" ? { display: "block" } : { display: "none" }}>
        <h1>Max people per group: {groupSize}</h1>
        <label>
          2
          <input type="range" min={2} max={10} value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))} />
          10
        </label>
      </div>
      <button onClick={handleMakingGroups}>Create Groups</button>
    </div>
  );
}
