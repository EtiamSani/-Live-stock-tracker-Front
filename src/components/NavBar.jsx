import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const [isNavOpen, SetIsNavOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvel état pour vérifier si l'utilisateur est connecté

  useEffect(() => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem("token");

    // Vérifier si le token existe
    if (token) {
      try {
        // Décoder le token pour obtenir les informations
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);

        // Vérifier si le décodage a réussi
        if (decodedToken) {
          // Récupérer le chemin de la photo de profil depuis les informations du token
          const photoPath = `http://localhost:3000/${decodedToken.data.profilpicture}`;

          // Mettre à jour l'état avec le chemin de la photo de profil
          setProfilePhoto(photoPath);
          setIsLoggedIn(true); // Définir isLoggedIn sur true lorsque l'utilisateur est connecté
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

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
            <li onClick={handleLogout}>
              <a>Se déconnecter</a>
            </li>
          </ul>
        </button>
      </div>

      {isLoggedIn && (
        <div className="avatar">
          <div className="mask mask-squircle w-10">
            <img src={profilePhoto} alt="Profile" />
          </div>
        </div>
      )}

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
        <ul className="menu menu-horizontal px-1">
          <li>
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
