import React from "react";

export default function ProductCart(props) {
  return (
    <div className="cartProduct">
      <img src={props.image} alt={props.name} />
      

    </div>
  );
}
