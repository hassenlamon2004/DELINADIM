// context.zip/components/CartModal.jsx
import React from 'react';
// 🔑 Importa useCart para acceder a todas las funciones y estados
import { useCart } from '../context/CartContext'; 

/**
 * Componente modal (ventana emergente) para visualizar y gestionar el carrito.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 */
const CartModal = ({ isOpen, onClose }) => {
    // Obtiene el estado y las funciones del carrito
    const { 
        cart, 
        removeItem, 
        clearCart, 
        totalAmount, 
        // 🔑 Importa las nuevas funciones
        incrementItem,
        decrementItem
    } = useCart();
    
    // Paleta de colores para consistencia
    const DORADO = '#F2CF66';
    const VINO = '#800000';
    const NEGRO = '#1A1A1A';

    if (!isOpen) return null;

    // Función para formatear el total para el mensaje de WhatsApp
    const generateWhatsappMessage = () => {
        if (cart.length === 0) return "Hola, me gustaría pedir información sobre el menú de Delinadim.";

        let message = "Hola Delinadim, me gustaría hacer un pedido con los siguientes productos:\n\n";
        
        cart.forEach(cartItem => {
            // El precio se limpia en CartContext, aquí lo reformateamos para la visualización
            const formattedPrice = new Intl.NumberFormat('es-CO').format(cartItem.item.price * cartItem.quantity);
            message += `*${cartItem.quantity}x* ${cartItem.item.title} ($${formattedPrice} COP)\n`;
        });

        // Formatea el monto total para el mensaje
        const formattedTotal = new Intl.NumberFormat('es-CO').format(totalAmount);
        message += `\nTotal estimado: *$${formattedTotal} COP*.\n\nPor favor, confírmenme la disponibilidad y el costo de envío. ¡Gracias!`;
        
        // Codifica el mensaje para ser una URL de WhatsApp
        return encodeURIComponent(message);
    };
    
    // Genera la URL completa de WhatsApp para el botón de pedido final
    const whatsappLink = `https://wa.me/+573106656644?text=${generateWhatsappMessage()}`;


    return (
        // Overlay de fondo oscuro
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
            onClick={onClose} // Cierra el modal al hacer clic fuera del contenido
        >
            {/* Contenedor principal del modal */}
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 p-6 relative transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Previene que el clic dentro cierre el modal
            >
                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl"
                    aria-label="Cerrar Carrito"
                >
                    ✕
                </button>
                
                {/* Encabezado del Carrito */}
                <h2 
                    className="text-3xl font-serif font-extrabold mb-6 pb-2 text-center"
                    style={{ color: VINO, borderBottom: `2px solid ${DORADO}` }}
                >
                    Tu Pedido Delinadim
                </h2>

                {/* Contenido del Carrito */}
                {cart.length === 0 ? (
                    <p className="text-center text-gray-600 py-10">
                        Tu carrito está vacío. ¡Añade nuestros deliciosos platos árabes!
                    </p>
                ) : (
                    <>
                        {/* Lista de Ítems */}
                        <div className="max-h-80 overflow-y-auto mb-4 border-b pb-4">
                            {cart.map((cartItem, index) => (
                                <div key={index} className="flex justify-between items-start py-3 border-b last:border-b-0">
                                    {/* Nombre del Producto */}
                                    <div className="flex-grow pr-4">
                                        <p className="text-gray-900 font-semibold">{cartItem.item.title}</p>
                                        <p className="text-sm text-gray-500">
                                            Total: <span className="font-bold">${new Intl.NumberFormat('es-CO').format(cartItem.item.price * cartItem.quantity)}</span>
                                        </p>
                                    </div>
                                    
                                    {/* Control de Cantidad y Botón Eliminar */}
                                    <div className="flex flex-col items-end">
                                        
                                        {/* Controladores de Cantidad (+ / Cantidad / -) */}
                                        <div className="flex items-center mb-2 border rounded-md" style={{ borderColor: DORADO }}>
                                            {/* Botón Decrementar */}
                                            <button
                                                onClick={() => decrementItem(cartItem.item.id)}
                                                className="px-3 py-1 text-xl font-bold rounded-l-md hover:bg-gray-100"
                                                style={{ color: VINO }}
                                            >
                                                -
                                            </button>
                                            
                                            {/* Contador */}
                                            <span className="px-3 py-1 text-base font-semibold border-x" style={{ color: NEGRO, borderColor: DORADO }}>
                                                {cartItem.quantity}
                                            </span>
                                            
                                            {/* Botón Incrementar */}
                                            <button
                                                onClick={() => incrementItem(cartItem.item.id)}
                                                className="px-3 py-1 text-xl font-bold rounded-r-md hover:bg-gray-100"
                                                style={{ color: VINO }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        {/* Botón de Eliminar (Todo el Ítem) */}
                                        <button
                                            onClick={() => removeItem(cartItem.item.id)}
                                            className="text-red-500 hover:text-red-700 text-xs mt-1 p-1"
                                            aria-label={`Eliminar ${cartItem.item.title}`}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totales */}
                        <div className="mt-4 pt-2 border-t-2" style={{ borderColor: DORADO }}>
                            <div className="flex justify-between items-center font-bold text-xl">
                                <span style={{ color: NEGRO }}>Total General:</span>
                                <span style={{ color: VINO }}>${new Intl.NumberFormat('es-CO').format(totalAmount)}</span>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="mt-6 space-y-3">
                            {/* Botón Finalizar Pedido por WhatsApp */}
                            <a 
                                href={whatsappLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={clearCart} // Opcional: limpiar al iniciar el pedido 
                                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-lg font-extrabold text-white transition duration-300 transform hover:scale-[1.02] shadow-lg"
                                style={{ backgroundColor: '#25D366' }} // Verde WhatsApp
                            >
                                📱 Finalizar Pedido por WhatsApp
                            </a>
                            
                            {/* Botón de Vaciar Carrito */}
                            <button
                                onClick={clearCart}
                                className="w-full py-2 px-4 rounded-xl text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-300"
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;