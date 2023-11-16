import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./game.scss"; // Assurez-vous d'ajuster le chemin d'importation en fonction de votre structure de fichiers

export default function Game() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jeux/${id}`);
        setGameDetails(response.data[0]); // Supposant que la réponse est un tableau et que vous voulez le premier élément
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du jeu :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  return (
    <main className="game">
      {loading ? (
        <p>Chargement...</p>
      ) : gameDetails ? (
        <div className="gameDetails">
          <picture>
            <img src={gameDetails.images} alt={gameDetails.titre} />
          </picture>
          <div className="gameInfo">
            <div>
              <h2 className="title">{gameDetails.titre}</h2>
              <p>{gameDetails.description}</p>
              <p className="price">{gameDetails.prix} €</p>
              <p className={`type ${gameDetails.plateforme.toLowerCase()}`}>{gameDetails.plateforme}</p>
            </div>
            <button className="addToCart">Acheter</button>
            {/* Ajoutez d'autres champs en fonction de votre modèle de données */}
          </div>
        </div>
      ) : (
        <p>Aucun détail trouvé pour ce jeu.</p>
      )}
    </main>
  );
}
