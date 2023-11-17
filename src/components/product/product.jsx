import React from "react";
import "./product.scss";

import { Link } from "react-router-dom";

export default function Product(props) {
  return (
    <Link to={`/game/${props.id}`} className="product">
      <article key={props.key}>
        <p className={`platform ${props.plateforme.toLowerCase()}`}>{props.plateforme}</p>
        <picture>
          <img className="productImage" src={props.image} alt={props.name} />
        </picture>
        <div className="productInfo">+
          <h5 className="productName">{props.titre}</h5>
          <p className="productPrice">{props.price} €</p>
        </div>
      </article>
    </Link>
  );
}
