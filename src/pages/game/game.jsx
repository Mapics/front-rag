import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./game.scss"; // Assurez-vous d'ajuster le chemin d'importation en fonction de votre structure de fichiers

export default function Game() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [addButton, setAddButton] = useState("Louer");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jeux/${id}`);
        setGameDetails(response.data[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du jeu :",
          error
        );
        // Afficher un message à l'utilisateur en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const addToCart = () => {
    const cartItem = {
      id: gameDetails.id,
      titre: gameDetails.titre,
      images: gameDetails.images,
      prix: gameDetails.prix,
      dateStart: currentDate,
      // dateEnd: /* récupérer la date de fin ici */,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setAddButton("✅");

    // Désactiver le bouton pendant 3 secondes
    setTimeout(() => {
      setAddButton("Louer");
    }, 3000);

    console.log("Ajouté au panier");
  };

  return (
    <main className="game">
      {loading ? (
        <p>Chargement...</p>
      ) : gameDetails ? (
        <div className="gameDetails">
          <picture>
            <img src={gameDetails.images} alt={gameDetails.titre} />
            <p className={`type ${gameDetails.plateforme.toLowerCase()}`}>
              {gameDetails.plateforme}
            </p>
            <div className="gameInfo">
              <div>
                <h2 className="title">{gameDetails.titre}</h2>
                <p className="price">{gameDetails.prix} €/jour</p>
                <label htmlFor="dateStart">Date de début :</label>
                <input
                  className="date"
                  type="date"
                  name="dateStart"
                  id="dateStart"
                  placeholder="Entrez la date de début de location"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
                <label htmlFor="dateEnd">Date de fin :</label>
                <input
                  className="date"
                  type="date"
                  name="dateEnd"
                  id="dateEnd"
                  placeholder="Entrez la date de fin de location"
                  /* Ajouter la gestion de la date de fin ici */
                />
              </div>
              <button
                className="addToCart"
                onClick={addToCart}
                disabled={addButton === "✅"}
              >
                <span>{addButton}</span>
              </button>
            </div>
          </picture>
          <div className="description">
            <h2 className="titleDescription">Description</h2>
            <p className="content">{gameDetails.description}</p>
          </div>
          <div className="commentary">
            <h2 className="titleCommentary">Commentaires</h2>
            <div className="descriptionContainer">
              <p>Très bon jeu, je ne regrette pas mon achat.</p>
              <p>Je n'ai pas aimé ce jeu, je ne le recommande pas.</p>
              <p>Incroyable ! Je recommande vivement ce jeu !</p>
              <p>Très bon jeu, je ne regrette pas mon achat.</p>
              <p>Incroyable ! Je recommande vivement ce jeu !</p>
              <p>Très bon jeu, je ne regrette pas mon achat.</p>
              <p>Très bon jeu, je ne regrette pas mon achat.</p>
              <p>Je n'ai pas aimé ce jeu, je ne le recommande pas.</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Aucun détail trouvé pour ce jeu.</p>
      )}
    </main>
  );
}
