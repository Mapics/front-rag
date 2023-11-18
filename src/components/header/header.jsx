import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification de la présence de l'ID utilisateur dans le localStorage
    console.log("connecté ?");
    const userIsConnected = localStorage.getItem("userId") !== null;
    setIsConnected(userIsConnected);
  }, []);
  

  const handleLogout = () => {
    console.log("Déconnexion");
  
    // Supprimer l'ID utilisateur du localStorage
    localStorage.removeItem("userId");
  
    setIsConnected(false);
  
    // Rediriger l'utilisateur vers la page de connexion, par exemple
    navigate("/login");
  };

  return (
    <header>
      <Link className="logo" to="/">
        RAG<span>.com</span>
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
