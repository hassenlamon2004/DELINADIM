import React from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

/**
 * Componente que renderiza una tarjeta individual para un ítem del menú.
 */
const MenuCard = ({ item }) => {
  const { addItem } = useCart();

  const borderColor = item.color ? `#${item.color}` : "#D4AF37";
  const priceColor = "#F2CF66";
  const NEGRO = "#1A1A1A";

  const handleAddItem = () => {
    addItem(item);
  };

  return (
    <div
      className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out flex flex-col"
      style={{ borderLeft: `5px solid ${borderColor}` }}
    >
      {/* Imagen con zoom al hover */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <img
          src={item.imageURL}
          alt={item.title}
          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110 bg-white"
        />
      </div>

      {/* Título */}
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-serif">
        {item.title}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-3 flex-grow">{item.description}</p>

      {/* Precio + Botón */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
        <span className="text-2xl font-extrabold" style={{ color: priceColor }}>
          ${item.price}
        </span>

        <button
          onClick={handleAddItem}
          className="font-extrabold py-2 px-4 rounded-xl transition duration-300 transform hover:scale-105 shadow-md text-sm"
          style={{ backgroundColor: NEGRO, color: priceColor }}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default MenuCard;
