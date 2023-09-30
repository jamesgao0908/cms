/* eslint-disable */

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // 检查购物车中是否已经存在该商品
    const existingItem = cartItems.find(
      (cartItem) => cartItem.product_id === item.product_id,
    );

    if (existingItem) {
      // 如果商品已经存在，增加其数量
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.product_id === item.product_id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
      setCartItems(updatedCart);
    } else {
      // 如果商品不存在，添加新的商品项
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.product_id === item.product_id,
    );
    if (existingItem) {
      if (existingItem.quantity > 1) {
        // 如果商品数量大于 1，减少其数量
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.product_id === item.product_id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );
        setCartItems(updatedCart);
      } else {
        // 如果商品数量为 1，从购物车中移除该商品
        const updatedCart = cartItems.filter(
          (cartItem) => cartItem.product_id !== item.product_id,
        );
        setCartItems(updatedCart);
      }
    }
  };

  const removeAllFromCart = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.product_id !== item.product_id,
    );
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeAllFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
