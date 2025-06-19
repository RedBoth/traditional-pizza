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
        const mostrar = colapsado ? items.slice(0, 3) : items;

        return (
          <div key={categoria} className="mb-10 p-6 rounded-xl bg-black/20 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold uppercase text-white border-l-4 border-red-500 pl-4">{categoria}</h2>
              <button onClick={() => toggleCategoria(categoria)} className="text-md text-red-500 hover:scale-110 cursor-pointer">
                {colapsado ? "Ver más" : "Ver menos"}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mostrar.map((item, index) => (
                <div key={index} className="bg-black/85 p-6 rounded-2xl shadow-md border border-gray-600 hover:scale-[1.02] hover:border-red-500 transition-transform">
                  <img src={item.imagen} alt="item.nombre" className="w-full h-48 object-cover rounded-xl mb-4"/>
                  <h3 className="text-lg font-semibold mb-2">{item.nombre}</h3>
                  <p className="text-sm text-gray-400 mv-3">{item.descripcion}</p>
                  <p className="text-red-500 font-bold">${item.precio}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}