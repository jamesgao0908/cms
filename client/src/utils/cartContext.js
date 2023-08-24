/* eslint-disable */

import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([]);

  // console.log(cartItems);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
