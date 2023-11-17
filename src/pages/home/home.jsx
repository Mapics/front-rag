import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";

import Product from "../../components/product/product";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const recup = async () => {
    try {
      let url = "http://localhost:8000/jeux";

      // Ajouter la logique pour rechercher par nom si le terme de recherche est présent
      if (searchTerm) {
        url += `?search=${searchTerm}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recup();
  }, [searchTerm]); // Effectuer la recherche à chaque changement de terme de recherche

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="home">
      <div className="filter">
        <input
          type="search"
          name="search"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher un jeu"
        />
        <div className="buttonsFilter">
          <button className="filterButton active" type="button">Tous</button>
          <button className="filterButton" type="button">FPS</button>
          <button className="filterButton" type="button">Action</button>
          <button className="filterButton" type="button">Aventure</button>
          <button className="filterButton" type="button">Sport</button>
          <button className="filterButton" type="button">Course</button>
          <button className="filterButton" type="button">Combat</button>
          <button className="filterButton" type="button">RPG</button>
        </div>
      </div>
      <div className="products">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          products.map((article) => (
            <Product
              key={article.id}
              id={article.id}
              image={article.images}
              titre={article.titre}
              description={article.description}
              plateforme={article.plateforme}
              price={article.prix}
            />
          ))
        )}

        {products.length === 0 && (
          <p className="noResult">Aucun jeu trouvé. Veuillez essayer un autre terme de recherche.</p>
        )}
      </div>
    </main>
  );
}
