import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./game.scss"; // Assurez-vous d'ajuster le chemin d'importation en fonction de votre structure de fichiers

export default function Game() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [endDate, setEndDate] = useState(getFormattedDate());
  const [addButton, setAddButton] = useState("");
  const [commentary, setCommentary] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

    const fetchGamesComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/location/comment/${id}`
        );
        const commentData = await Promise.all(
          response.data.map(async (comment) => {
            const userResponse = await axios.get(
              `http://localhost:8000/user/${comment.id_user}/username`
            );
            return {
              ...comment,
              username: userResponse.data[0].username,
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

  function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const addToCart = () => {
    // Vérification de la validité des dates
    const startDate = new Date(currentDate);
    const endDateValue = new Date(endDate);

    if (endDateValue <= startDate) {
      // Afficher un message d'erreur
      setErrorMessage(
        "La date de fin doit être postérieure à la date de début"
      );
      return;
    }

    // Réinitialiser le message d'erreur
    setErrorMessage("");

    // Le reste du code pour ajouter l'élément au panier

    const cartItem = {
      id: gameDetails.id,
      titre: gameDetails.titre,
      images: gameDetails.images,
      prix: gameDetails.prix,
      dateStart: currentDate,
      dateEnd: endDate,
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
          <p className={`type ${gameDetails.plateforme.toLowerCase()}`}>
            {gameDetails.plateforme}
          </p>
          <picture>
            <img src={gameDetails.images} alt={gameDetails.titre} />
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
                  disabled={addButton === "✅"}
                >
                  <span>{addButton}</span>
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
                commentary.map((comment) =>
                  <div className="commentary" key={comment.id}>
                    <p className="userName">{`${comment.username}`}</p>
                    <p className="commentaryContent">{comment.commentaire}</p>
                  </div>
                )
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
