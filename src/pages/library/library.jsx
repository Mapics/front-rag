import React, { useEffect, useState } from "react";
import "./library.scss";
import Product from "../../components/product/product"; // Assure-toi d'ajuster le chemin d'importation en fonction de ta structure de fichiers

export default function Library() {
  const [userGamesInLocation, setUserGamesInLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGamesInLocation = async () => {
      try {
        const userId = "1"; // verifier ici l'id du user actuellement connecte
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

  return (
    <main className="library">
      <h2 className="titleLibrary">Mes jeux en location</h2>
      <div className="games">
        {/* A SUPPRIMER */}
        <div className="gameList">
          <div>
            <Product
              key={1}
              id={1}
              image={
                "https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-82eb5cf8f725e329d3194920c0c0b64f"
              }
              titre={"The Witcher 3"}
              description={"Un jeu de rôle à la troisième personne"}
              plateforme={"PS4"}
              price={"4.99"}
            />
            <form className="formCommentary">
              <textarea
                className="commentaire"
                id="commentaire"
                name="commentaire"
                placeholder="Entrez votre commentaire"
                rows="4"
                cols="50"
              ></textarea>
              <input
                className="submitComment"
                type="submit"
                value="✅"
              ></input>
            </form>
          </div>

          <Product
            key={1}
            id={1}
            image={
              "https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-82eb5cf8f725e329d3194920c0c0b64f"
            }
            titre={"The Witcher 3"}
            description={"Un jeu de rôle à la troisième personne"}
            plateforme={"PS4"}
            price={"4.99"}
          />
        </div>
        {/* A SUPPRIMER */}

        {loading ? (
          <p>Chargement...</p>
        ) : userGamesInLocation.length > 0 ? (
          <div className="productList">
            {userGamesInLocation.map((article) => (
              <Product
                key={article.id}
                id={article.id}
                image={article.images}
                titre={article.titre}
                description={article.description}
                plateforme={article.plateforme}
                price={article.prix}
              />
            ))}
          </div>
        ) : (
          <p>Aucun jeu en location pour le moment.</p>
        )}
        {/* <h2 className="titleComment">Commentaires</h2> */}
      </div>
    </main>
  );
}
