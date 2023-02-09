import { useState } from "react";

export default function PopulatedGroups(props) {
  if (props.groups) {
    return (
      <>
        {props.groups.map((group) => (
          <div className="group" key={props.groups.indexOf(group) + 1}>
            <h4>Group {props.groups.indexOf(group) + 1}</h4>
            {group.map((person) => (
              <li key={`${person}-${props.groups.indexOf(group)}`}>{person}</li>
            ))}
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}
