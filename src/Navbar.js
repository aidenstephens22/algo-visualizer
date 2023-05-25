import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="title">Algoritihm Visualizer</h1>
      <ul>
        <li className="active">
          <a href="/pathfinding">Pathfinding</a>
        </li>
        <li>
          <a href="/sorting">Sorting</a>
        </li>
        <li>
          <a href="/other">Other</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
