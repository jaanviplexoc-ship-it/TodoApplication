import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
    <nav>
        <NavLink to="/">Todo Dashboard</NavLink> | {" "}
        <NavLink to="/TodoForm">Todo Form</NavLink> | {" "}
        <NavLink to="/TodoList">Todo List</NavLink>
    </nav>
    </div>
  )
};

export default Navbar;