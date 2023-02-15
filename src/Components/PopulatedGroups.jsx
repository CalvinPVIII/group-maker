import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PopulatedGroups(props) {
  const [currentlyDraggedPerson, setCurrentlyDraggedPerson] = useState("");

  const handleDrag = (e) => {
    setCurrentlyDraggedPerson({
      person: e.target.id,
      groupNumber: parseInt(e.target.parentElement.getAttribute("name")),
    });
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    props.dragAndDropName(
      currentlyDraggedPerson,
      parseInt(e.target.parentElement.getAttribute("name"))
    );
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
            <div
              key={uuidv4()}
              name={props.groups.indexOf(group) + 1}
              style={{ border: "2px solid white", width: "200px" }}
            >
              <div
                onDragOver={(e) => handleOnDragOver(e)}
                className="group"
                onDrop={(e) => handleDrop(e)}
                name={props.groups.indexOf(group) + 1}
                key={props.groups.indexOf(group) + 1}
              >
                <h4>Group {props.groups.indexOf(group) + 1}</h4>
                {group.map((person) => (
                  <p
                    draggable
                    id={person}
                    onDragStart={(e) => handleDrag(e)}
                    key={uuidv4()}
                  >
                    {person}
                  </p>
                ))}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(group.join("\n"))}
              >
                Copy to clipboard
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
