import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext();
export default CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev,{...product,quantity:1}];
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  const decreaseQuantity = (productId) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
