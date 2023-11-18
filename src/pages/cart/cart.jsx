import React, { useEffect, useState } from "react";
import "./cart.scss";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <main className="cart">
      <div className="cartProducts">
        <h2 className="titleCart">Panier</h2>
        <div className="cartScroll">
          <div className="cartContainer">
            {cartItems.length === 0 && (
              <p className="emptyCart">Votre panier est vide.</p>
            )}
            {cartItems.map((item, index) => (
              <div className="cartProduct" key={index}>
                <div className="cartProductInfos">
                  <img src={item.images} alt={item.titre} />
                  <div className="cartProductInfo">
                    <h5 className="cartProductName">{item.titre}</h5>
                    <p className="cartProductPrice">{item.prix}€/jour</p>
                    <p className="date">Date de début : {item.dateStart}</p>
                    <p className="date">Date de fin : {item.dateEnd}</p>
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
          <p className="cartTotalPrice">
            {cartItems.reduce((acc, item) => acc + item.prix, 0)}€
          </p>
          <button>
            <span>Payer</span>
          </button>
        </div>
      </div>
    </main>
  );
}
