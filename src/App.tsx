import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Navbar from "./components/Navbar";
import CollectionForm from "./components/CollectionForm";
import CollectionInfo from "./components/CollectionInfo";

function App() {
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", fontSize: "52px" }}>Group Maker</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserPage />} />
        <Route path="/new" element={<CollectionForm type="new" />} />
        <Route path="/collection/:id" element={<CollectionInfo />} />
      </Routes>
    </>
  );
}

export default App;
