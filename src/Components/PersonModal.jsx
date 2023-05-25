export default function PersonModal(props) {
  const wordStyle = { wordWrap: "break-word" };
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",

          zIndex: "2",
          top: "0%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        onClick={props.handleExit}
      ></div>
      <div
        className="person-modal"
        style={{
          textAlign: "left",
          paddingLeft: "5px",
          width: "200px",
          zIndex: "3",
          position: "absolute",
          border: "1px solid #10002b",
          backgroundColor: "#240046",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p style={wordStyle}>Name: {props.person.name}</p>
        <p style={wordStyle}>
          Pair history:
          {Object.values(props.person.pairHistory).map((p) => (
            <li>
              {p.name}: {p.timesMatched}
            </li>
          ))}
        </p>
        <p style={wordStyle}>
          Group history:
          {Object.values(props.person.groupHistory).map((p) => (
            <li>
              {p.name}: {p.timesMatched}
            </li>
          ))}
        </p>
        <p style={wordStyle}>Blacklist:</p>
      </div>
    </>
  );
}
