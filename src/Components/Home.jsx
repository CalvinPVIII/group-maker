import { useState } from "react";
import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import GroupHistory from "./GroupHistory";
import Grouper from "../js/Grouper";

export default function Home() {
  const [groups, setGroups] = useState();
  const [confirmText, setConfirmText] = useState("Reset Stored History");

  const [groupHistory, setGroupHistory] = useState(
    localStorage.getItem("group history")
      ? JSON.parse(localStorage.getItem("group history"))
      : {}
  );

  const resetStoredHistory = () => {
    localStorage.setItem("group history", "{}");
    setGroupHistory({});
    setConfirmText("Reset Stored History");
  };
  Grouper.groupHistory = JSON.parse(localStorage.getItem("group history"));

  const updateStoredHistory = (newHistory) => {
    localStorage.setItem("group history", JSON.stringify(newHistory));
    setGroupHistory(newHistory);
  };

  const dragAndDropName = (person, newGroupNumber) => {
    let newGroups = [...groups];

    newGroups[person.groupNumber - 1].splice(
      newGroups[person.groupNumber - 1].indexOf(person.person),
      1
    );
    newGroups[newGroupNumber - 1].push(person.person);
    setGroups(newGroups);
    Grouper.addToHistory(person.person, newGroups[newGroupNumber - 1]);
    const newHistory = Grouper.removeFromHistory(
      person.person,
      newGroups[person.groupNumber - 1]
    );
    updateStoredHistory(newHistory);
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Group maker</h1>

      <InputNames setGroups={setGroups} updateHistory={updateStoredHistory} />
      <PopulatedGroups groups={groups} dragAndDropName={dragAndDropName} />
      <GroupHistory groups={groups} history={groupHistory} />
      <div style={{ textAlign: "center" }}>
        <button
          onClick={
            confirmText === "Are you sure?"
              ? resetStoredHistory
              : () => setConfirmText("Are you sure?")
          }
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
