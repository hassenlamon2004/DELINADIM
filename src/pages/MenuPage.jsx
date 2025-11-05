import React from 'react';
import MenuCard from '../components/MenuCard'; // Importamos el componente de la tarjeta

// --- DATOS DEL MENÚ (Simulando una base de datos) ---
/**
 * Arreglo maestro de objetos que representan todos los platos del menú.
 * Incluye categorías, descripción, precio y estilos de color asociados.
 */
const allMenuItems = [
    // Entradas
    { id: 1,
    category: 'Entradas Frías',
    title: 'Hummus Clásico',
    description: 'Garbanzos molidos con tahini, limón y aceite de oliva virgen.',
    price: '25.000', 
    color: '800000',
    imageURL: '/assets/hummus.webp' }, // Vino
    { id: 2,
     category: 'Entradas Frías',
     title: 'Labneh de la Casa',
      description: 'Yogurt colado espeso, servido con especias Zatar.', 
      price: '28.000', 
      color: '1A1A1A', 
      imageURL: '/assets/labneh.webp' }, // Negro

    // Platos Fuertes
    { id: 3,
     category: 'Platos Fuertes',
     title: 'Kibbeh Frito',
     description: 'Carne y burgol horneado en capas con especias y piñones.',
     price: '45.000',
     color: 'D4AF37' ,
     imageURL: '/assets/kibbeh.webp' }, // Dorado Oscuro
    { id: 4,
     category: 'Platos Fuertes',
     title: 'Plato Mixto',
     description: 'incluye kibbeh, hojas de parra y repollo rellenas, tabule, arroz con almendras, hummus, kibbeh y siempre acompañado de pan árabe.',
     price: '38.000',
     color: 'D4AF37' ,
     imageURL: '/assets/platoMixto.webp' }, // Dorado Oscuro
    { id: 5, 
    category: 'Platos Fuertes',
    title: 'Falafel', 
    description: 'Bolitas fritas hechas de una pasta de garbanzos o habas triturados, hierbas frescas y especias.',
    price: '55.000', 
    color: '1A1A1A' ,
    imageURL: '/assets/falafel.webp' }, // Negro

    // Postres
    { id: 6,
     category: 'Postres', 
     title: 'Baklava Clásico',
     description: 'Masa filo, nueces y jarabe de miel.',
    price: '18.000', 
    color: '800000' ,
        imageURL: '/assets/baklava.webp' }, // Vino
    { id: 7,
    category: 'Postres',
    title: 'Mamoul',
    description: 'Galleta de sémola rellena de dátiles o nueces, espolvoreada con azúcar.',
    price: '15.000',
    color: 'D4AF37', 
    imageURL: '/assets/mamoul.webp' }, // Dorado Oscuro
];
// ----------------------------------------------------

/**
 * Función auxiliar para agrupar los ítems del menú en un objeto,
 * donde la clave es el nombre de la categoría.
 */
const categorizedMenu = allMenuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
}, {});


/**
 * Componente principal que renderiza el menú completo, organizado por categorías.
 */
const MenuPage = () => {
    // Definición de colores
    const DORADO = '#F2CF66';
    const VINO = '#800000';

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Título de la Página */}
                <h1 
                    className="text-5xl font-extrabold text-center text-gray-900 mb-4 border-b-4 pb-2 inline-block mx-auto font-serif"
                    // Estilo del borde con el color dorado
                    style={{ borderColor: DORADO }}
                >
                    Menú Completo
                </h1>
                <p className="text-center text-gray-600 mb-12">
                    Sabores auténticos de la gastronomía árabe, preparados con la receta familiar.
                </p>

                {/* Itera sobre las categorías del menú agrupado */}
                {Object.keys(categorizedMenu).map(category => (
                    <section key={category} className="mb-16">
                        {/* Título de la Categoría */}
                        <h2 
                            className="text-3xl font-bold mb-6 border-b-2 pb-2 font-serif"
                            // Estilo para el color Vino
                            style={{ color: VINO, borderColor: 'rgba(128, 0, 0, 0.5)' }}
                        >
                            {category}
                        </h2>
                        
                        {/* Contenedor de las Tarjetas: Diseño responsivo en cuadrícula */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categorizedMenu[category].map(item => (
                                // Usa el componente MenuCard para cada plato
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
