import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "../css/PairStyles.css";

export default function PopulatedGroups(props) {
  const pairClasses = {
    0: "firstPair",
    1: "secondPair",
    2: "thirdPair",
    3: "fourthPair",
    4: "fifthPair",
  };

  let draggedPersonInfo = {
    person: null,
    initialGroup: null,
  };
  const handleDrag = (groupKey, person) => {
    draggedPersonInfo.person = person;
    draggedPersonInfo.initialGroup = groupKey;
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (groupKey) => {
    if (groupKey === draggedPersonInfo.initialGroup) return;
    props.cohort.removePersonFromGroup(draggedPersonInfo.initialGroup, draggedPersonInfo.person);
    props.cohort.addPersonToGroup(groupKey, draggedPersonInfo.person);
    draggedPersonInfo = {
      person: null,
      initialGroup: null,
    };
  };

  // useEffect(() => {

  // }, []);

  console.log(props);
  if (props.groups) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Randomized Groups</h2>
        <div
          className="groupsWrapper"
          style={{
            width: "80%",
            textAlign: "center",

            margin: "auto",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {" "}
          {props.groups.map((group, groupIndex) => (
            <>
              <div key={uuidv4()} name={props.groups.indexOf(group) + 1} style={{ border: "2px solid white", width: "200px" }}>
                <div
                  onDragOver={(e) => handleOnDragOver(e)}
                  className="group"
                  onDrop={() => handleDrop(props.groups.indexOf(group))}
                  name={props.groups.indexOf(group) + 1}
                  key={props.groups.indexOf(group) + 1}
                >
                  <h4>Group {props.groups.indexOf(group) + 1}</h4>
                  {!group.currentPairs || group.currentPairs.length <= 0 ? (
                    <>
                      {group.currentGroup.map((person) => (
                        <p key={uuidv4()} draggable id={person} onDragStart={() => handleDrag(props.groups.indexOf(group), person)}>
                          {person.name}
                        </p>
                      ))}
                    </>
                  ) : (
                    <>
                      {group.currentPairs.map((pair, pairIndex) =>
                        Object.values(pair).map((person) => (
                          <p
                            key={uuidv4()}
                            className={pairClasses[pairIndex]}
                            draggable
                            id={person.id}
                            onDragStart={() => handleDrag(props.groups.indexOf(group), person)}
                          >
                            {person.name}
                          </p>
                        ))
                      )}
                    </>
                  )}
                </div>
                <button onClick={() => navigator.clipboard.writeText(group.join("\n"))}>Copy to clipboard</button>
                <button onClick={() => props.cohort.generatePairsForGroup(groupIndex)}>Assign pairs</button>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
