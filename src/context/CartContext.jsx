// context.zip/context/CartContext.jsx
import React, { createContext, useState, useContext } from "react";

// 1. CREACIÓN DEL CONTEXTO: Aquí se almacena el estado y las funciones del carrito.
export const CartContext = createContext();

/**
 * Proveedor de Contexto que envuelve toda la aplicación y expone el estado del carrito.
 */
export const CartProvider = ({ children }) => {
  // Estado principal del carrito: un array de objetos { item, quantity }
  const [cart, setCart] = useState([]);

  // --- FUNCIONES LÓGICAS DEL CARRITO ---

  /**
   * Agrega un ítem al carrito o incrementa su cantidad si ya existe.
   * @param {object} item - El objeto del plato (con id, title, price, etc.).
   */
  const addItem = (item) => {
    // Asegura que el precio es un número limpio para cálculos
    // Nota: Este paso ya está en tu código original, manteniéndolo.
    const itemPriceCleaned = parseFloat(item.price.replace(".", ""));

    // Busca si el ítem ya está en el carrito
    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (itemIndex > -1) {
      // Caso 1: El ítem existe, incrementa la cantidad
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Caso 2: El ítem es nuevo, lo agrega con cantidad 1
      setCart([
        ...cart,
        { item: { ...item, price: itemPriceCleaned }, quantity: 1 },
      ]);
    }
  };

  /**
   * Incrementa la cantidad de un ítem existente en 1.
   * @param {number} itemId - ID del plato a incrementar.
   */
  const incrementItem = (itemId) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.item.id === itemId);
    if (itemIndex > -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    }
  };

  /**
   * Decrementa la cantidad de un ítem existente en 1.
   * Si la cantidad llega a 0, elimina el ítem del carrito.
   * @param {number} itemId - ID del plato a decrementar.
   */
  const decrementItem = (itemId) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.item.id === itemId);

    if (itemIndex > -1) {
      const newCart = [...cart];
      // Si la cantidad es mayor a 1, solo decrementa
      if (newCart[itemIndex].quantity > 1) {
        newCart[itemIndex].quantity -= 1;
        setCart(newCart);
      } else {
        // Si la cantidad es 1, lo elimina completamente
        removeItem(itemId);
      }
    }
  };

  /**
   * Elimina un ítem completamente del carrito.
   * @param {number} itemId - ID del plato a eliminar.
   */
  const removeItem = (itemId) => {
    const filteredCart = cart.filter((cartItem) => cartItem.item.id !== itemId);
    setCart(filteredCart);
  };

  /**
   * Vacía el carrito por completo.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Calcula el total de ítems en el carrito (suma de todas las cantidades).
   */
  const totalItems = cart.reduce((acc, current) => acc + current.quantity, 0);

  /**
   * Calcula el monto total del carrito.
   */
  const totalAmount = cart.reduce(
    (acc, current) => acc + current.item.price * current.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalAmount,
        // 🔑 Añade las nuevas funciones al valor del contexto
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto del carrito fácilmente.
 */
export const useCart = () => {
  return useContext(CartContext);
};
