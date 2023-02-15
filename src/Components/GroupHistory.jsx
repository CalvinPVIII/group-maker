import { useState } from "react";

export default function GroupHistory(props) {
  const filteredHistory = {};

  if (props.history) {
    props.groups.forEach((group) => {
      for (let i = 0; i < group.length; i++) {
        if (group[i + 1] && props.history[`${group[i]}&${group[i + 1]}`]) {
          filteredHistory[`${group[i]}&${group[i + 1]}`] =
            props.history[`${group[i]}&${group[i + 1]}`];
        } else if (
          group[i + 1] &&
          props.history[`${group[i + 1]}&${group[i]}`]
        ) {
          filteredHistory[`${group[i + 1]}&${group[i]}`] =
            props.history[`${group[i + 1]}&${group[i]}`];
        }
      }
    });
  }

  if (Object.keys(filteredHistory).length > 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Grouping Info</h1>
        {Object.keys(filteredHistory).map((grouping) => (
          <h4 key={grouping + filteredHistory[grouping]}>
            {grouping.replace("&", " and ")} have been in the same group{" "}
            {filteredHistory[grouping]} times
          </h4>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
