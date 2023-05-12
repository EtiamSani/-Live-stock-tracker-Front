import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar w-full min-w-full bg-blue-100 ">
      <div className="flex-1 items-center justify-between ">
        <Link to="/" className="btn-ghost btn text-xl normal-case">
          Smart Stock Tracker
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn-ghost btn-square btn md:block lg:hidden">
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
