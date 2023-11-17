import React from 'react'
import './cart.scss'

import axios from 'axios';

const productCart = () => {
    return (
        <div className="cartProduct">
            <img src="" alt="" />
        </div>
    );
};



export default function Cart(props) {
  return (
    <main className="cart">
        <h2 className='titleCart'>Panier</h2>
        <div className="cartProducts">
        
        </div>
    </main>
  )
}
