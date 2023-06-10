import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import fetchInvestor from "../APIServices/fetchInvestor";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
  const [isNavOpen, SetIsNavOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvel état pour vérifier si l'utilisateur est connecté
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        // console.log(decodedToken);

        if (decodedToken) {
          // const photoPath = `http://localhost:3000/${decodedToken.data.profilpicture}`;
          // setProfilePhoto(photoPath);
          setIsLoggedIn(true);

          //   const response = await fetch(
          //     `http://localhost:3000/investor/${decodedToken.data.id}`
          //   );
          //   const data = await response.json();
          //   const fetchedUsername = data.nickname;
          //   const fetchedProfilPicture = data.profilpicture;
          //   setUsername(fetchedUsername);
          //   setProfilePhoto(fetchedProfilPicture);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const results = useQuery(["investor"], fetchInvestor, {
    onSuccess: (data) => {
      const fetchedUsername = data.nickname;
      const fetchedProfilPicture = data.profilpicture;
      setUsername(fetchedUsername);
      setProfilePhoto(fetchedProfilPicture);
    },
  });

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Recharger la page pour revenir à la page de connexion
    window.location.href = "/login";
  };

  return (
    <div className="navbar w-full min-w-full bg-blue-100 ">
      <div className="flex-1 items-center justify-between ">
        <Link
          to="/"
          className="btn-ghost btn hidden text-xl normal-case lg:block"
        >
          <p className="mt-2">Smart Stock Tracker</p>
        </Link>
      </div>
      {isLoggedIn && (
        <div className="mr-5">
          <p>
            Bonjour <span className="font-bold">{username}</span>
          </p>
        </div>
      )}

      {isLoggedIn && (
        <div className="avatar mt-3">
          <div className="mask mask-squircle w-10">
            <Link to="/mon-compte">
              <div className="mask mask-squircle w-10">
                <img
                  src={`http://localhost:3000/${profilePhoto}`}
                  alt="Profile"
                />
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className="dropdown-end dropdown z-40 flex-none">
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
              <Link to="/">Page d'acceuil</Link>
            </li>
            <li>
              <Link to="/watchlists">Mes listes</Link>
            </li>
            <li>
              <Link to="/mon-compte">Mon compte</Link>
            </li>
            <li onClick={handleLogout}>
              <a>Se déconnecter</a>
            </li>
          </ul>
        </button>
      </div>

      {!isLoggedIn && (
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login" className="glass btn hidden lg:block">
              <p className="mt-1">Connexion</p>
            </Link>
          </li>
        </ul>
      )}

      {isLoggedIn && (
        <ul className="menu menu-horizontal hidden px-1 lg:block">
          <li>
            <Link to="/watchlists" className="mx-3">
              <p>Mes listes</p>
            </Link>
            <a
              to="/login"
              className="btn hidden lg:block"
              onClick={handleLogout}
            >
              <p className="mt-1 text-white">Déconnexion</p>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
