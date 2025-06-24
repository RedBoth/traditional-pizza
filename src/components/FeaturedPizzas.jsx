import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const pizzas = [
  { img: "/margherita.webp", name: "Pizza Margherita", desc: "Tomate, mozzarella y albahaca fresca." },
  { img: "/pepperoni.webp", name: "Pizza Pepperoni", desc: "Extra queso y pepperoni crujiente." },
  { img: "/vegetariana.jpeg", name: "Pizza Vegetariana", desc: "Pimientos, champiñones y aceitunas." },
];

export default function FeaturedPizzas() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative -mt-16 z-10 px-4 sm:px-6">
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-3 max-w-7xl mx-auto">
        {pizzas.map((pizza, i) => (
          <div
            key={pizza.name}
            className="bg-black/85 text-white border border-gray-900 p-6 text-center shadow-lg rounded-xl"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img
              src={pizza.img}
              alt={pizza.name}
              className="mx-auto w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg md:text-xl font-bold">{pizza.name}</h3>
            <p className="text-sm md:text-lg text-gray-400">{pizza.desc}</p>
            <a
              href="/menu"
              className="mt-4 inline-block px-4 py-2 md:px-6 md:py-4 text-red-500 font-semibold border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
            >
              Descubre más
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}