import { useState } from "react";

import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import GroupHistory from "./GroupHistory";

const { ipcRenderer } = window.require("electron");

export default function Home() {
  const [groups, setGroups] = useState();
  const [groupHistory, setGroupHistory] = useState();

  const dragAndDropName = (person, newGroupNumber) => {
    let newGroups = [...groups];

    newGroups[person.groupNumber - 1].splice(
      newGroups[person.groupNumber - 1].indexOf(person.person),
      1
    );
    newGroups[newGroupNumber - 1].push(person.person);
    setGroups(newGroups);
    ipcRenderer
      .invoke("moveToGroup", {
        name: person.person,
        newGroup: newGroups[newGroupNumber - 1],
      })
      .then(() => {
        ipcRenderer
          .invoke("removeFromGroup", {
            name: person.person,
            oldGroup: newGroups[person.groupNumber - 1],
          })
          .then((response) => {
            setGroupHistory(response);
          });
      });
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Group maker</h1>

      <InputNames setGroups={setGroups} updateHistory={setGroupHistory} />
      <PopulatedGroups groups={groups} dragAndDropName={dragAndDropName} />
      <GroupHistory groups={groups} history={groupHistory} />
    </div>
  );
}

// bill
// ted
// bob
// reggie
// johnson
