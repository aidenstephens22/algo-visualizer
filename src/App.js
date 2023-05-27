import "./App.css";
import Navbar from "./Navbar";
import PathfindingPage from "./pathfinding/PathfindingPage";
import SortingPage from "./sorting/SortingPage";
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
