import { v4 as uuidv4 } from "uuid";

export default function PopulatedGroups(props) {
  // const [currentlyDraggedPerson, setCurrentlyDraggedPerson] = useState("");
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
          {props.groups.map((group) => (
            <div key={uuidv4()} name={props.groups.indexOf(group) + 1} style={{ border: "2px solid white", width: "200px" }}>
              <div
                onDragOver={(e) => handleOnDragOver(e)}
                className="group"
                onDrop={() => handleDrop(props.groups.indexOf(group))}
                name={props.groups.indexOf(group) + 1}
                key={props.groups.indexOf(group) + 1}
              >
                <h4>Group {props.groups.indexOf(group) + 1}</h4>
                {group.map((person) => (
                  <p key={uuidv4()} draggable id={person} onDragStart={() => handleDrag(props.groups.indexOf(group), person)}>
                    {person.name}
                  </p>
                ))}
              </div>
              <button onClick={() => navigator.clipboard.writeText(group.join("\n"))}>Copy to clipboard</button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
