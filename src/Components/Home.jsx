import { useState } from "react";

import InputNames from "./InputNames";
import PopulatedGroups from "./PopulatedGroups";
import GroupHistory from "./GroupHistory";

export default function Home() {
  const [groups, setGroups] = useState();
  const [groupHistory, setGroupHistory] = useState();

  return (
    <>
      <h1>Group maker</h1>

      <InputNames setGroups={setGroups} updateHistory={setGroupHistory} />
      <PopulatedGroups groups={groups} />
      <GroupHistory groups={groups} history={groupHistory} />
    </>
  );
}
