import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-blue-100">
      <div className="flex-1">
        <Link to="/" className="btn-ghost btn text-xl normal-case">
          Smart Stock Tracker
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login" className="glass btn">
              Me connecter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
