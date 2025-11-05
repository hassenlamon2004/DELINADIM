// context.zip/pages/ContactPage.jsx
import React from 'react';

// --- Componentes Icono (Rutas de Assets) ---
/**
 * Componente que renderiza el icono de WhatsApp.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.size - Clases de Tailwind para el tamaño (por defecto 'w-12 h-12').
 */
const WhatsappIcon = ({ size = 'w-12 h-12' }) => (
    <img src="/src/assets/icono-whatsapp.svg" alt="WhatsApp" className={size} />
);

/**
 * Componente que renderiza el icono de Rappi.
 * NOTA: La ruta utiliza .png según tu especificación anterior.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.size - Clases de Tailwind para el tamaño (por defecto 'w-12 h-12').
 */
const RappiIcon = ({ size = 'w-12 h-12' }) => (
    <img src="/src/assets/icono-rappi.png" alt="Rappi" className={size} />
);

/**
 * Componente que renderiza el icono de Instagram.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.size - Clases de Tailwind para el tamaño (por defecto 'w-12 h-12').
 */
const InstagramIcon = ({ size = 'w-12 h-12' }) => (
    <img src="/src/assets/icono-instagram.svg" alt="Instagram" className={size} />
);
// ----------------------------------------------------------------------


/**
 * Componente principal que renderiza la página de contacto con opciones de pedido y redes sociales.
 */
const ContactPage = () => {
    // Definición de la paleta de colores para consistencia visual
    const DORADO = '#F2CF66';
    const NEGRO = '#1A1A1A';
    const VINO = '#800000'; 
    
    // Lista de enlaces de contacto, configurada como un array de objetos para fácil mapeo
    const links = [
        { 
            name: 'Hacer un Pedido por WhatsApp', 
            IconComponent: WhatsappIcon, 
            color: 'bg-neutral-950 hover:bg-green-600', // Clases de color de Tailwind para WhatsApp
            // 🔑 Número de ejemplo consistente con el CartModal
            url: 'https://wa.me/+573106656644?text=Hola%20quiero%20hacer%20un%20pedido%20de%20Delinadim' 
        },
        { 
            name: 'Pedir por Rappi (Entrega Rápida)', 
            IconComponent: RappiIcon, 
            color: 'bg-neutral-950 hover:bg-red-700', // Clases de color de Tailwind para Rappi
            url: 'https://www.rappi.com.co/restaurantes/900450716-delinadim-arabe?csr=true' 
        },
        { 
            name: 'Síguenos en Instagram', 
            IconComponent: InstagramIcon, 
            color: 'bg-neutral-950 hover:bg-pink-700', // Clases de color de Tailwind para Instagram
            url: 'https://www.instagram.com/delinadim' 
        },
    ];

    return (
        <div className="py-20 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Título Principal */}
                <h1 
                    className="text-5xl font-extrabold text-center text-gray-900 mb-4 pb-2 inline-block mx-auto font-serif"
                    style={{ borderBottom: `4px solid ${DORADO}` }} // Separador dorado
                >
                    Contacto y Pedidos
                </h1>
                <p 
                    className="mt-4 text-2xl text-center max-w-2xl mx-auto mb-16"
                    style={{ color: VINO }} // Color vino para el subtítulo
                >
                     Elige tu método preferido para conectar con Delinadim. ¡Estamos listos para atenderte!
                </p>

                {/* Grid de Enlaces Grandes (Call-to-Action) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {links.map((link, index) => (
                        <a 
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            // Estilo de tarjeta con color dinámico y efecto hover
                            className={`flex flex-col items-center p-8 rounded-2xl shadow-xl transition duration-300 transform hover:scale-[1.03] text-white ${link.color} flex-grow`}
                        >
                            {/* Contenedor del Icono */}
                            <div className="mb-4">
                                <link.IconComponent size="w-12 h-12" /> 
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-extrabold text-center">{link.name}</h3>
                            {/* Mensaje secundario descriptivo */}
                            <p className="mt-2 text-sm opacity-90 font-light">
                                {link.name.includes('WhatsApp') ? 'Respuesta inmediata' : 
                                 link.name.includes('Rappi') ? 'Pide a domicilio aquí' : 'Mira nuestro feed'}
                            </p>
                        </a>
                    ))}
                </div>
                
                {/* Información Adicional (Horario, Teléfono, Ubicación) */}
                <div className="mt-20 text-center p-8 border-t-2 border-dashed" style={{ borderColor: DORADO }}>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Información de la Tienda</h3>
                    <p className="text-lg text-gray-700">📍 Ubicacion: Barrio, Paraiso</p>
                    {/* 🔑 Número de ejemplo consistente con el CartModal */}
                    <p className="text-lg text-gray-700">📞 Nmero Telefonico: +57 3106656644 </p>
                    <p className="text-lg text-gray-700">⏰ Horario de Atencin: Lun-Dom 12:00 PM - 10:00 PM</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;