import { Link } from "react-router-dom";
import "../style/navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Logo</h1>

      <ul className="nav-link">
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
