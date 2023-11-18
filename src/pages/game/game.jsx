import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./game.scss"; // Assurez-vous d'ajuster le chemin d'importation en fonction de votre structure de fichiers

export default function Game() {
  const { id } = useParams(); // Récupération du paramètre id du jeu dans l'URL
  const [gameDetails, setGameDetails] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [endDate, setEndDate] = useState(getFormattedDate());
  const [commentary, setCommentary] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => { // Effectue une requête pour récupérer les informations du jeu
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jeux/${id}`); // Tant que la requête n'est pas terminée, on affiche un message de chargement
        setGameDetails(response.data[0]); // Une fois la requête terminée, on met à jour le state avec les informations récupérées
      } catch (error) { // En cas d'erreur, on affiche un message à l'utilisateur
        console.error(
          "Erreur lors de la récupération des détails du jeu :",
          error
        );
        // Afficher un message à l'utilisateur en cas d'erreur
      } finally {
        setLoading(false); // Dans tous les cas, on passe loading à false pour indiquer que le chargement est terminé
      }
    };

    const fetchGamesComments = async () => { // Effectue une requête pour récupérer les commentaires du jeu
      try {
        const response = await axios.get(
          `http://localhost:8000/location/comment/${id}`
        );
        const commentData = await Promise.all(
          response.data.map(async (comment) => {
            const userResponse = await axios.get(
              `http://localhost:8000/user/${comment.id_user}/username`
            );
    
            // Vérifiez si userResponse.data[0] existe avant de l'utiliser
            const username = userResponse.data[0]?.username || 'Utilisateur inconnu';
    
            return {
              ...comment,
              username: username,
            };
          })
        );
        setCommentary(commentData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires du jeu :",
          error
        );
        // Afficher un message à l'utilisateur en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameDetails();
    fetchGamesComments();
  }, [id]);

  function getFormattedDate() { // Récupère la date du jour au format YYYY-MM-DD
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const addToCart = () => {
    // Vérification de la validité des dates
    const startDate = new Date(currentDate); // Création d'un objet Date à partir de la date de début
    const endDateValue = new Date(endDate);

    if (endDateValue <= startDate) { // Si la date de fin est inférieure ou égale à la date de début, on affiche un message d'erreur
      setErrorMessage(
        "La date de fin doit être postérieure à la date de début"
      );
      return;
    }

    setErrorMessage(""); // On supprime le message d'erreur s'il y en avait un

    const cartItem = { // Création d'une variable cartItem qui contient les informations du jeu et les dates de début et de fin de location
      id: gameDetails.id,
      titre: gameDetails.titre,
      images: gameDetails.images,
      prix: gameDetails.prix,
      dateStart: currentDate,
      dateEnd: endDate,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || []; // Si le panier existe déjà, on le récupère, sinon on crée un tableau vide
    const updatedCart = [...existingCart, cartItem]; // On insert les informations du jeu dans le panier

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // On met à jour le panier dans le localStorage
  };

  return (
    <main className="game">
      {loading ? ( // Tant que la requête n'est pas terminée, on affiche un message de chargement
        <p>Chargement...</p>
      ) : gameDetails ? (
        <div className="gameDetails">
          <p className={`type ${gameDetails.plateforme.toLowerCase()}`}> {/* On ajoute une classe CSS en fonction de la plateforme du jeu */}
            {gameDetails.plateforme} 
          </p>
          <picture>
            <img src={gameDetails.images} alt={gameDetails.titre} />
            <div className="gameInfo">
              <div>
                <h2 className="title">{gameDetails.titre}</h2>
                <p className="price">{gameDetails.prix} €/jour</p>
              </div>
              <div>
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
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  />
                  {errorMessage && <p className="errorDate">{errorMessage}</p>}
              </div>
              <div className="buttons">
                <Link to="/cart">
                  <button className="buyNow" onClick={addToCart}>
                    Louer maintenant
                  </button>
                </Link>
                <button
                  className="addToCart"
                  onClick={addToCart}
                >
                </button>
              </div>
            </div>
          </picture>
          <div className="description">
            <h2 className="titleDescription">Description</h2>
            <p className="content">{gameDetails.description}</p>
          </div>
          <div className="commentaryContainer">
            <h2 className="titleCommentary">Commentaires</h2>
            <div className="descriptionContainer">
            {loading ? (
                <p>Chargement...</p>
              ) : (
                commentary.map((comment) => (
                  comment.commentaire && (
                    <div className="commentary" key={comment.id}>
                      <p className="userName">{`${comment.username}`}</p>
                      <p className="commentaryContent">{comment.commentaire}</p>
                    </div>
                  )
                ))
              )}

              {commentary.length === 0 && (
                <p className="emptyCommentary">
                  Aucun commentaire pour ce jeu.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Aucun détail trouvé pour ce jeu.</p>
      )}
    </main>
  );
}
