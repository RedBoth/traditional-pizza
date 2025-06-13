import { useState } from "react";
import { menuItems } from "../data/menu";

export default function Menu() {
  const categorias = [...new Set (menuItems.map(item => item.categoria))];

  const [expandidas, setExpandidas] = useState({});

  const toggleCategoria = (cat) => {
    setExpandidas(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  return (
    <section className="px-4 py-12 max-w-5xl mx-auto text-white">
      {categorias.map(categoria => {
        const items = menuItems.filter(item => item.categoria === categoria)
        const colapsado = !expandidas[categoria];
        const mostrar = colapsado ? items.slice(0, 2) : items;

        return (
          <div key={categoria} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{categoria}</h2>
              <button onClick={() => toggleCategoria(categoria)} className="text-sm text-red-500 hover:underline cursor-pointer">
                {colapsado ? "Ver más" : "Ver menos"}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mostrar.map((item, index) => (
                <div key={index} className="bg-black/80 p-4 rounded-lg shadow-lg border border-gray-700">
                  <img src={item.imagen} alt="item.nombre" className="w-full h-40 object-cover rounded mb-3"/>
                  <h3 className="text-lg font-semibold">{item.nombre}</h3>
                  <p className="text-sm text-gray-400">{item.descripcion}</p>
                  <p className="text-red-400 font-bold mt-2">${item.precio}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}