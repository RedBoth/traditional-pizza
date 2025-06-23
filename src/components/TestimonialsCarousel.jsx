import { useRef } from "react";
import { testimonios } from "../data/testimonies";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsCarousel() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({left: -300, behavior: "smooth"});
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth"});
  };

  return (
    <section id="reseñas" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <h2 className="text-4xl font-bold text-white">Reseñas</h2>
        <div className="flex gap-4">
          <button onClick={scrollLeft} aria-label="Reseña anterior" className="font-bold bg-neutral-800 hover:bg-red-500 text-white p-2 px-6 rounded-full cursor-pointer">
            <ArrowLeft width={24} strokeWidth={2} />
          </button>
          <button onClick={scrollRight} aria-label="Siguiente reseña" className="font-bold bg-neutral-800 hover:bg-red-500 text-white p-2 px-6 rounded-full cursor-pointer">
            <ArrowRight width={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="flex overflow-x-auto no-scrollbar gap-6 scroll-smooth">
        {testimonios.map(({ nombre, texto, imagen }, idx) => (
          <div key={idx} className="min-w-[280px] max-w-sm flex-shrink-0 bg-neutral-900 p-6 rounded-2xl shadow-md text-white flex flex-col items-center text-center">
            <img src={imagen} alt={nombre} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-red-500"/>
            <p className="italic text-sm mb-4">"{texto}"</p>
            <span className="font-semibold text-red-400">{nombre}</span>
          </div>
        ))}
      </div>
    </section>
  );
}