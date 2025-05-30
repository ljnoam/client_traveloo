// src/components/layout/Navbar.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import logoLight from "../../assets/logo-light.png"; // Logo pour le mode clair
import logoDark from "../../assets/logo-dark.png"; // Logo pour le mode sombre
import { ROUTES } from "../../routes/routes.js"; // Utiliser routes constants

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const loginBtn = darkMode
    ? "bg-purple-500 hover:bg-purple-600"
    : "bg-green-500 hover:bg-green-600";

  const signupBtn = darkMode
    ? "bg-purple-700 hover:bg-purple-800"
    : "bg-green-700 hover:bg-green-800";

  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-500">
        <Link to={ROUTES.home} className="flex items-center gap-3">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Logo"
            className="h-8 w-auto md:h-10 transition-opacity duration-500"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          <li><Link to={ROUTES.home}>Home</Link></li>
          <li><Link to={ROUTES.tripForm}>Planifier</Link></li>
          <li><Link to={ROUTES.about}>À propos</Link></li>
          <li><Link to={ROUTES.support}>Support</Link></li>
          {!user ? (
            <>
              <li>
                <Link
                  to={ROUTES.login}
                  className={`px-4 py-2 rounded-full font-bold text-sm text-white ${loginBtn}`}
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.register}
                  className={`px-4 py-2 rounded-full font-bold text-sm text-white ${signupBtn}`}
                >
                  S'inscrire
                </Link>
              </li>
            </>
          ) : (
            <li><Link to={ROUTES.profile}>Profil</Link></li>
          )}
          <li>
            <label className="switch">
              <input
                type="checkbox"
                className="input__check"
                checked={darkMode}
                onChange={toggleDark}
              />
              <span className="slider transition-opacity duration-300"></span>
            </label>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <label className="switch">
            <input
              type="checkbox"
              className="input__check"
              checked={darkMode}
              onChange={toggleDark}
            />
            <span className="slider transition-opacity duration-300"></span>
          </label>
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen(prev => !prev)}
            className="text-2xl text-gray-700 dark:text-gray-200"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white dark:bg-gray-800 shadow-xl rounded-2xl mt-2 px-6 py-4 flex flex-col gap-3 font-medium text-gray-700 dark:text-gray-200 transition-colors duration-500"
        >
          <Link to={ROUTES.home} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to={ROUTES.tripForm} onClick={() => setMenuOpen(false)}>Planifier</Link>
          <Link to={ROUTES.about} onClick={() => setMenuOpen(false)}>À propos</Link>
          <Link to={ROUTES.support} onClick={() => setMenuOpen(false)}>Support</Link>
          {!user ? (
            <>
              <Link
                to={ROUTES.login}
                onClick={() => setMenuOpen(false)}
                className={`text-center rounded-full px-4 py-2 font-bold text-sm text-white ${loginBtn}`}
              >
                Connexion
              </Link>
              <Link
                to={ROUTES.register}
                onClick={() => setMenuOpen(false)}
                className={`text-center rounded-full px-4 py-2 font-bold text-sm text-white ${signupBtn}`}
              >
                S'inscrire
              </Link>
            </>
          ) : (
            <Link to={ROUTES.profile} onClick={() => setMenuOpen(false)}>Profil</Link>
          )}
        </div>
      )}
    </header>
  );
}