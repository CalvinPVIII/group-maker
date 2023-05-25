import { useState } from "react";
import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import GroupHistory from "./GroupHistory";
import Grouper from "../../js/Grouper";
import { Link } from "react-router-dom";

export default function Home() {
  const [groups, setGroups] = useState();
  const [confirmText, setConfirmText] = useState("Reset Stored History");

  const [groupHistory, setGroupHistory] = useState(localStorage.getItem("group history") ? JSON.parse(localStorage.getItem("group history")) : {});

  const resetStoredHistory = () => {
    localStorage.setItem("group history", "{}");
    setGroupHistory({});

    setConfirmText("Reset Stored History");
  };
  Grouper.groupHistory = JSON.parse(localStorage.getItem("group history"));

  const updateStoredHistory = (newHistory) => {
    localStorage.setItem("group history", JSON.stringify(newHistory));
    localStorage.setItem("prev groupHistory", JSON.stringify(Grouper.previousGroupHistory));
    setGroupHistory(newHistory);
  };

  const undoLastGrouping = () => {
    Grouper.undoHistoryUpdate();
    updateStoredHistory(Grouper.groupHistory);
    setGroups();
  };

  const dragAndDropName = (person, newGroupNumber) => {
    let newGroups = [...groups];

    // I have no idea why everything works fine without the line below, but removing it seems to fix the issue of another person getting deleted
    // newGroups[person.groupNumber - 1] = groups[person.groupNumber - 1].filter((p)=>p !== person.person)

    newGroups[newGroupNumber - 1].push(person.person);
    setGroups(newGroups);
    Grouper.addToHistory(person.person, newGroups[newGroupNumber - 1]);
    const newHistory = Grouper.removeFromHistory(person.person, newGroups[person.groupNumber - 1]);

    updateStoredHistory(newHistory.history);
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Group Maker v1</h1>
      <h4 style={{ textAlign: "center" }}>This is the previous version of Group Maker</h4>
      <h4 style={{ textAlign: "center" }}>It only saves locally, and pairs cannot be created</h4>
      <h4 style={{ textAlign: "center" }}>If you want to have your data saved, as well as access to additional features, please sign in</h4>
      <h3 style={{ textAlign: "center" }}>
        <Link to="/">If you are signed in, click here to go to the latest version of Group maker</Link>
      </h3>
      <InputNames setGroups={setGroups} updateHistory={updateStoredHistory} undoLastGrouping={undoLastGrouping} />
      <PopulatedGroups groups={groups} dragAndDropName={dragAndDropName} />
      <GroupHistory groups={groups} history={groupHistory} />
      <div style={{ textAlign: "center" }}>
        <button onClick={confirmText === "Are you sure?" ? resetStoredHistory : () => setConfirmText("Are you sure?")}>{confirmText}</button>
      </div>
    </div>
  );
}
