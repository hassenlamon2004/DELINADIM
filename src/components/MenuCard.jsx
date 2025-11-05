// context.zip/components/MenuCard.jsx
import React from 'react';
import PropTypes from 'prop-types'; 
// 🔑 Importa el Hook useCart para la función addItem
import { useCart } from '../context/CartContext'; 

/**
 * Componente que renderiza una tarjeta individual para un ítem del menú.
 */
const MenuCard = ({ item }) => {
    // 🔑 Obtiene la función addItem del contexto
    const { addItem } = useCart();
    
    // Paleta de colores para consistencia
    const borderColor = item.color ? `#${item.color}` : '#D4AF37';
    const priceColor = '#F2CF66'; 
    const NEGRO = '#1A1A1A'; 
    
    // Función de manejo para añadir al carrito
    const handleAddItem = () => {
        addItem(item);
        // Opcional: podrías mostrar una notificación aquí
    };

    return (
        <div 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out flex flex-col"
            style={{ borderLeft: `5px solid ${borderColor}` }}
        >
            {item.imageURL && ( 
                <img 
                    src={item.imageURL} 
                    alt={item.title} 
                    className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
                />
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{item.title}</h3>
            
            <p className="text-sm text-gray-600 mb-3 flex-grow">{item.description}</p>
            
            {/* Sección de Precio y Botón */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                {/* Precio Destacado */}
                <span 
                    className="text-2xl font-extrabold"
                    style={{ color: priceColor }}
                >
                    ${item.price}
                </span>
                
                {/* Botón para Añadir al Carrito */}
                <button
                    onClick={handleAddItem} // Llama a la función addItem
                    className="ml-4 py-2 px-4 text-sm font-bold rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
                    style={{ backgroundColor: priceColor, color: NEGRO }} // Dorado y Negro
                >
                    + Añadir
                </button>
            </div>
        </div>
    );
};

// --- VALIDACIÓN DE PROPIEDADES (PropTypes) ---
MenuCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        imageURL: PropTypes.string, 
        color: PropTypes.string,     
    }).isRequired,
};

export default MenuCard;