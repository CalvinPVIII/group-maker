import Home from "./Components/Home.jsx";
import GrouperV1 from "./Components/v1/GrouperV1.jsx";
import "./App.css";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/v1" element={<GrouperV1 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
