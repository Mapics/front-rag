import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.scss";

import Cookies from "js-cookie";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Vérification de la présence du cookie ici
    console.log("connecté ?");
    const userIsConnected = Cookies.get("token") !== undefined;
    setIsConnected(userIsConnected);
  }, []);

  const handleLogout = () => {
    console.log("Deconnection");
    Cookies.remove("token");
    setIsConnected(false);
  };

  return (
    <header>
      <Link className="logo" to="/">
        RAG.com
      </Link>
      <nav>
        <ul>
          {/* Si l'utilisateur n'est pas connecté */}
          {!isConnected ? (
            <>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              <li>
                <Link to="/register">Inscription</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/library">Mes jeux</Link>
              </li>
              <li>
                <Link className="caddie" to="/cart"></Link>
              </li>
              <li>
                <Link
                  className="disconnect"
                  to="/"
                  onClick={handleLogout}
                ></Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
