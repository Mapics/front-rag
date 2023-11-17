import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("ca passe");
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      });
      
      if (response.ok) {
        console.log("Inscription réussie");
        navigate("/login"); // Redirige vers la page de connexion après l'inscription
      } else {
        console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur inattendue", error);
    }
  };

  return (
    <div className="register">
      <div className="containerRegister">
        <form onSubmit={handleSignup}>
          <h2 className="title">Inscription</h2>
          <p>Créez votre compte</p>
          <label htmlFor="firstname">Username</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Entrez votre prénom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <div className="containerPassword">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              required
            />
            <button
              type="button"
              className="passwordVisibility"
              onClick={handleShowPassword}
            ></button>
          </div>
          <button type="submit">Continuer</button>
        </form>
        <div className="haveAccount">
          <p>Déjà un compte ?</p>
          <Link to="/login">Connectez-vous</Link>
        </div>
      </div>
    </div>
  );
}
