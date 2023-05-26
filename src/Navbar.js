import React from "react";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="title">Algoritihm Visualizer</h1>
      <ul>
        <CustomLink to="/pathfinding">Pathfinding</CustomLink>
        <CustomLink to="/sorting">Sorting</CustomLink>
      </ul>
    </nav>
  );
}

export default Navbar;

function CustomLink({ to, children }) {
  const path = useResolvedPath(to);
  const isCurrent = useMatch({ path: path.pathname, end: true });

  return (
    <li className={isCurrent ? "active" : ""}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}
