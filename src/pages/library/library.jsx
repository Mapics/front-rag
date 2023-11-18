import React, { useEffect, useState } from "react";
import "./library.scss";
import Product from "../../components/product/product";

export default function Library() {
  const [userGamesInLocation, setUserGamesInLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGamesInLocation = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:8000/user/${userId}/gamesInLocation`
        );
        const data = await response.json();
        setUserGamesInLocation(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des jeux en location de l'utilisateur :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserGamesInLocation();
  }, []);

  const handleCommentSubmit = async (gameId, commentary) => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(`http://localhost:8000/game/${gameId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          commentary,
        }),
      });

      if (response.ok) {
        // Ajouter la logique nécessaire après la soumission du commentaire
        console.log("Commentaire soumis avec succès");
      } else {
        console.error("Erreur lors de la soumission du commentaire");
      }
    } catch (error) {
      console.error("Erreur inattendue lors de la soumission du commentaire :", error);
    }
  };

  return (
    <main className="library">
      {/* ... (le reste du code reste inchangé) */}
      {loading ? (
        <p>Chargement...</p>
      ) : userGamesInLocation.length > 0 ? (
        <div className="productList">
          {userGamesInLocation.map((article) => (
            <div key={article.id} className="gameContainer">
              <Product
                id={article.id}
                image={article.images}
                titre={article.titre}
                description={article.description}
                plateforme={article.plateforme}
                price={article.prix}
              />

              <form
                className="formCommentary"
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentary = e.target.commentaire.value;
                  handleCommentSubmit(article.id, commentary);
                }}
              >
                <textarea
                  className="commentaire"
                  id="commentaire"
                  name="commentaire"
                  placeholder="Un avis sur ce jeu ?"
                  rows="4"
                  cols="50"
                ></textarea>
                <input
                  className="submitComment"
                  type="submit"
                  value="Soumettre le commentaire"
                />
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun jeu en location pour le moment.</p>
      )}
      {/* ... (le reste du code reste inchangé) */}
    </main>
  );
}
