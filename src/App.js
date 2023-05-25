import Home from "./Components/Home.jsx";
import GrouperV1 from "./Components/v1/GrouperV1.jsx";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useState } from "react";

function App() {
  const [currentlyVisibleState, setCurrentlyVisibleState] = useState("home");
  return (
    <div className="App">
      <HashRouter>
        <Navbar setCurrentlyVisibleState={setCurrentlyVisibleState} />
        <Routes>
          <Route path="/" element={<Home currentlyVisibleState={currentlyVisibleState} setCurrentlyVisibleState={setCurrentlyVisibleState} />} />
          <Route path="/v1" element={<GrouperV1 />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignIn />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
