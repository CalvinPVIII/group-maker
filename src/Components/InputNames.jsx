import { useState } from "react";

export default function InputNames(props) {
  const [namesInput, setNamesInput] = useState("");

  const handleNamesSubmit = () => {
    const names = namesInput.split(/\r?\n/).filter((name) => name.replace(/ /g, "") !== "");
    console.log(names);
  };

  return (
    <>
      <h2>Enter Names Separated by Lines</h2>
      <div className="input-area">
        <textarea style={{ height: "200px" }} className="input-names" onChange={(e) => setNamesInput(e.target.value)} value={namesInput} />
        <br />
        <button onClick={handleNamesSubmit}>Add People</button>
      </div>
    </>
  );
}
