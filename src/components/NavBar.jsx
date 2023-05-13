import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [isNavOpen, SetIsNavOpen] = useState(false);
  return (
    <div className="navbar w-full min-w-full bg-blue-100 ">
      <div className="flex-1 items-center justify-between ">
        <Link
          to="/"
          className="btn-ghost btn hidden text-xl normal-case lg:block"
        >
          Smart Stock Tracker
        </Link>
      </div>
      <div className="dropdown-end dropdown flex-none">
        <button
          className="btn-squared btn-ghost btn md:block lg:hidden"
          onClick={() => SetIsNavOpen((prev) => !prev)}
        >
          <label tabIndex={0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content menu rounded-box menu-compact mt-48 w-48 bg-base-100 p-2  shadow ${
              isNavOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <a>Page d'acceuil</a>
            </li>
            <li>
              <a>Mon compte</a>
            </li>
            <li>
              <a>Se déconnecter</a>
            </li>
          </ul>
        </button>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login" className="glass btn hidden lg:block">
              Me connecter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
