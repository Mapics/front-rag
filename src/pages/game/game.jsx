import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './game.scss'; // Assurez-vous d'ajuster le chemin d'importation en fonction de votre structure de fichiers

export default function Game() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jeux/${id}`);
        setGameDetails(response.data[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du jeu :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const addToCart = () => {
    console.log('Ajouté au panier');
  };

  function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

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
                />
              </div>
              <button className="addToCart" onClick={addToCart}>
                Louer
              </button>
            </div>
          </picture>
          <div className="description">
            <h2 className="titleDescription">Description</h2>
            <p>{gameDetails.description}</p>
          </div>
        </div>
      ) : (
        <p>Aucun détail trouvé pour ce jeu.</p>
      )}
    </main>
  );
}
