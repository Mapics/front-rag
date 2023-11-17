import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Vérification de la présence du cookie ici
    console.log("connecté ?")
    const userIsConnected = Cookies.get('token') !== undefined;
    setIsConnected(userIsConnected);
  }, []);

  const handleLogout = () => {
    console.log("Deconnection")
    Cookies.remove('token');
    setIsConnected(false)
  };

  return (
    <header>
      <Link className="logo" to="/">RAG</Link>
      <nav>
        <ul>
          {/* Si l'utilisateur n'est pas connecté */}
          {!isConnected ? (
            <li>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </li>
          ) : (
          <li>
            <Link to="/" onClick={handleLogout}>Déconnexion</Link>
          </li>
          )}
          <li>
            <Link to="/cart">Panier</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
