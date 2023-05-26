import "./App.css";
import Navbar from "./Navbar";
import PathfindingPage from "./PathfindingPage";
import SortingPage from "./SortingPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pathfinding" element={<PathfindingPage />} />
        <Route path="/sorting" element={<SortingPage />} />
      </Routes>
    </div>
  );
}

export default App;
