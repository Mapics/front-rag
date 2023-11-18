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

  const buyCart = () => {
    alert("Merci pour votre achat !");
    localStorage.removeItem("cart");
    setCartItems([]);
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
                    <div className="cartProductInfoContainer">
                      <h5 className="cartProductName">{item.titre}</h5>
                      <p className="cartProductPrice">{item.prix}€/jour</p>
                    </div>
                    <div className="cartProductDateContainer">
                      <p className="date">Date de début : {item.dateStart}</p>
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
              <p className="cartTotalProduct">
                <p className="title">{item.titre}</p>
                <p className="price">{`${item.prix}€/jour`}</p>
              </p>
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
    </main>
  );
}
