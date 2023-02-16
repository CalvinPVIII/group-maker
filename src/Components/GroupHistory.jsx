import { v4 as uuidv4 } from "uuid";

export default function GroupHistory(props) {
  const filteredHistory = {};

  if (props.history && props.groups) {
    props.groups.forEach((group) => {
      for (let i = 0; i < group.length; i++) {
        const currentPerson = group[i];
        for (let j = 0; j < group.length; j++) {
          const nextPerson = group[j];
          if (props.history[`${currentPerson} & ${nextPerson}`]) {
            filteredHistory[`${currentPerson} & ${nextPerson}`] =
              props.history[`${currentPerson} & ${nextPerson}`];
          } else if (props.history[`${nextPerson} & ${currentPerson}`]) {
            filteredHistory[`${nextPerson} & ${currentPerson}`] =
              props.history[`${nextPerson} & ${currentPerson}`];
          }
        }
      }
    });
  }

  if (Object.keys(filteredHistory).length > 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Grouping Info</h1>
        {Object.keys(filteredHistory).map((grouping) => (
          <h4
            key={uuidv4()}
            style={
              filteredHistory[grouping] >= 4 && filteredHistory[grouping] < 8
                ? { color: "yellow" }
                : filteredHistory[grouping] >= 8
                ? { color: "red" }
                : { color: "white" }
            }
          >
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
