import { useEffect, useState } from "react";
import { menuItems } from "../data/menu";


export default function MenuPreview() {
  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(3);
      } else {
        setItemsToShow(6);
      }
    }

    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  return (
    <section className="py-16 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nuestro Menú</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.slice(0, itemsToShow).map((item, index) => (
          <div key={index} className="bg-black/85 border border-gray-600 rounded-2xl shadow-md p-6 hover:scale-[1.02] hover:border-red-500 transition-transform">
            <img src={item.imagen} alt={`Pizza ${item.nombre}`} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.nombre}</h3>
            <p className="text-gray-400 mb-3">{item.descripcion}</p>
            <span className="text-red-500 font-bold text-lg">${item.precio}</span>
          </div>
        ))}
      </div>
      <a href="/menu" className="mt-8 block text-lg text-center text-red-500 hover:font-bold">
        Ver menú completo →
      </a>
    </section>
  );
}