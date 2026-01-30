import { Link } from "react-router-dom";
import { useState } from "react";
import "../style/navbar.css";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <nav className="navbar">
      <h1 className="logo">Logo</h1>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-link ${open ? "active" : ""}`}>
        <li>
          <Link to="/">List</Link>
        </li>
        <li>
          <Link to="/Addtask">Add Task </Link>
        </li>
      </ul>
    </nav>
  );
}
