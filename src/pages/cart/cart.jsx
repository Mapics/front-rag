import React, { useEffect, useState } from "react";
import "./cart.scss";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer le panier depuis le localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(existingCart);
  }, []);

  const removeFromCart = (index) => {
    // Copier le panier actuel
    const updatedCart = [...cartItems];

    // Supprimer l'élément du panier en fonction de l'index
    updatedCart.splice(index, 1);

    // Mettre à jour le state et le localStorage
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateItemTotal = (item) => {
    // Calculer le nombre de jours entre la date de début et la date de fin
    const startDate = new Date(item.dateStart);
    const endDate = new Date(item.dateEnd);
    const numberOfDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Calculer le coût total pour cet article
    const itemTotal = parseFloat(item.prix) * numberOfDays;

    // Retourner le coût total avec le format fixé à 2 décimales
    return itemTotal.toFixed(2);
  };

  const calculateTotal = () => {
    // Calculer le total général en additionnant le coût total de chaque article
    return cartItems
      .reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0)
      .toFixed(2);
  };

  const buyCart = async () => {
    try {
      // Récupérer les jeux du panier depuis le stockage local
      const cartItems = JSON.parse(localStorage.getItem("cart"));

      // Vérifier si le panier n'est pas vide
      if (cartItems && cartItems.length > 0) {
        // Récupérer l'ID utilisateur depuis le localStorage
        const userId = localStorage.getItem("userId");

        // Vérifier si l'ID utilisateur existe
        if (userId) {
          // Ajouter l'userId à chaque objet du panier
          const cartItemsWithUserId = cartItems.map((item) => ({
            id: item.id,
            userId,
            dateStart: item.dateStart,
            dateEnd: item.dateEnd,
          }));

          console.log("cartItemsWithUserId", cartItemsWithUserId);
          // Envoyer une requête au serveur pour ajouter les jeux à la base de données
          const response = await fetch(
            `http://localhost:8000/location/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cartItemsWithUserId),
            }
          );

          if (response.ok) {
            // Si l'ajout à la base de données est réussi

            // Nettoyer le panier local
            localStorage.removeItem("cart");
            setCartItems([]);
          } else {
            console.error(
              "Erreur lors de l'ajout des jeux à la base de données"
            );
          }
        } else {
          // Si l'ID utilisateur n'existe pas
          console.error("ID utilisateur non trouvé");
        }
      }
    } catch (error) {
      console.error("Erreur inattendue lors de l'achat :", error);
    }
  };

  return (
    <main className="cart">
      {cartItems.length === 0 ? (
        <div className="emptyCartContainer">
          <p className="emptyTotal">Votre panier est vide</p>
          <button className="emptyCart" onClick={() => navigate("/")}>
            Retour à l'accueil
          </button>
        </div>
      ) : (
        <>
          <div className="cartProducts">
            <h2 className="titleCart">Panier</h2>
            <div className="cartScroll">
              <div className="cartContainer">
                {cartItems.map((item, index) => (
                  <div className="cartProduct" key={index}>
                    <div className="cartProductInfos">
                      <img src={item.images} alt={item.titre} />
                      <div className="cartProductInfo">
                        <div className="cartProductInfoContainer">
                          <h5 className="cartProductName">{item.titre}</h5>
                          <p className="cartProductPrice">{`${item.prix}€/jour`}</p>
                        </div>
                        <div className="cartProductDateContainer">
                          <p className="date">
                            Date de début : {item.dateStart}
                          </p>
                          <p className="date">Date de fin : {item.dateEnd}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="delete"
                      onClick={() => removeFromCart(index)}
                    ></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="cartTotal">
            <h2 className="cartTotalTitle">Total</h2>
            <div className="cartTotalContainer">
              <div className="cartTotalList">
                {cartItems.map((item, index) => (
                  <div key={index} className="cartTotalProduct">
                    <p className="title">{item.titre}</p>
                    <p className="price">{`${calculateItemTotal(item)}€`}</p>
                  </div>
                ))}
              </div>
              <div className="cartTotalPrice">
                <div className="cartTotalPriceContainer">
                  <p className="titleTotal">Total</p>
                  <p className="totalPrice">{`${calculateTotal()}€`}</p>
                </div>
                <button className="buy" onClick={buyCart}>
                  Payer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
