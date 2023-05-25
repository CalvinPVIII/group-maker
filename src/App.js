import Home from "./Components/Home.jsx";
import GrouperV1 from "./Components/v1/GrouperV1.jsx";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn.jsx";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/v1" element={<GrouperV1 />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignIn />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
