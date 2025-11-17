import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
  const {
    cart,
    removeItem,
    clearCart,
    totalAmount,
    incrementItem,
    decrementItem,
  } = useCart();

  const DORADO = "#F2CF66";
  const VINO = "#800000";
  const NEGRO = "#1A1A1A";

  if (!isOpen) return null;

  const generateWhatsappMessage = () => {
    if (cart.length === 0)
      return "Hola, me gustaría pedir información sobre el menú de Delinadim.";

    let message =
      "Hola Delinadim, me gustaría hacer un pedido con los siguientes productos:\n\n";

    cart.forEach((cartItem) => {
      const formattedPrice = new Intl.NumberFormat("es-CO").format(
        cartItem.item.price * cartItem.quantity
      );
      message += `*${cartItem.quantity}x* ${cartItem.item.title} ($${formattedPrice} COP)\n`;
    });

    const formattedTotal = new Intl.NumberFormat("es-CO").format(totalAmount);
    message += `\nTotal estimado: *$${formattedTotal} COP*.\n\nPor favor, confírmenme la disponibilidad y el costo de envío. ¡Gracias!`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/+573102078916?text=${generateWhatsappMessage()}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 p-6 relative transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl"
        >
          ✕
        </button>

        <h2
          className="text-3xl font-serif font-extrabold mb-6 pb-2 text-center"
          style={{ color: VINO, borderBottom: `2px solid ${DORADO}` }}
        >
          Tu Pedido Delinadim
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 py-10">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="max-h-80 overflow-y-auto mb-4 border-b pb-4">
              {cart.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-b-0"
                >
                  {/* Imagen del producto */}
                  <img
                    src={cartItem.item.imageURL}
                    alt={cartItem.item.title}
                    className="w-16 h-16 object-cover rounded-lg mr-3 border"
                    style={{ borderColor: DORADO }}
                  />

                  <div className="flex-grow pr-4">
                    <p className="text-gray-900 font-semibold">
                      {cartItem.item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total:{" "}
                      <span className="font-bold">
                        $
                        {new Intl.NumberFormat("es-CO").format(
                          cartItem.item.price * cartItem.quantity
                        )}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    {/* Input numérico editable + botones */}
                    <div
                      className="flex items-center mb-2 border rounded-md overflow-hidden"
                      style={{ borderColor: DORADO }}
                    >
                      <button
                        onClick={() => decrementItem(cartItem.item.id)}
                        className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
                        style={{ color: VINO }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > 0) {
                            const diff = value - cartItem.quantity;
                            if (diff > 0) {
                              for (let i = 0; i < diff; i++)
                                incrementItem(cartItem.item.id);
                            } else {
                              for (let i = 0; i < Math.abs(diff); i++)
                                decrementItem(cartItem.item.id);
                            }
                          }
                        }}
                        className="w-12 text-center outline-none"
                      />

                      <button
                        onClick={() => incrementItem(cartItem.item.id)}
                        className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
                        style={{ color: VINO }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(cartItem.item.id)}
                      className="text-red-500 hover:text-red-700 text-xs mt-1 p-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 pt-2 border-t-2"
              style={{ borderColor: DORADO }}
            >
              <div className="flex justify-between items-center font-bold text-xl">
                <span>Total General:</span>
                <span style={{ color: VINO }}>
                  ${new Intl.NumberFormat("es-CO").format(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={clearCart}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-lg font-extrabold text-white transition duration-300 transform hover:scale-[1.02] shadow-lg"
                style={{ backgroundColor: "#25D366" }}
              >
                📱 Finalizar Pedido por WhatsApp
              </a>

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
