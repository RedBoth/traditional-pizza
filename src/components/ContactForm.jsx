import { useState } from "react";
import TwitterIcon from "./icons/twitter.jsx";
import FacebookIcon from "./icons/facebook.jsx";
import InstagramIcon from "./icons/instagram.jsx";

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", form);
    //Aca se conectaria a Formspree, EmailJS u otro
    alert("Gracias por contactarte. Te responderemos pronto.");
    setForm({ nombre: "", email: "", mensaje: ""});
  };

  return (
    <section className="w-full bg-neutral-900 text-white py-12 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contáctanos</h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Info de contacto */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div>
            <p className="text-red-500 font-semibold mb-1">Teléfono</p>
            <p>+54 123 456 789</p>
          </div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Email</p>
            <p>traditional@pizza.com</p>
          </div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Redes Sociales</p>
            <div className="flex gap-4 mt-2 text-xl">
              <a href="#" ><InstagramIcon className="w-6 h-6 fill-white hover:fill-red-500"/></a>
              <a href="#" ><FacebookIcon className="w-6 h-6 fill-white hover:fill-red-500"/></a>
              <a href="#" ><TwitterIcon className="w-6 h-6 fill-white hover:fill-red-500"/></a>
            </div>
          </div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Ubicación</p>
            <iframe src="https://www.google.com/maps/embed?pb=..." className="w-full h-48 rounded border-none" loading="lazy"></iframe>
          </div>
        </div>

        {/* Fromulario */}
        <form onSubmit={handleSumbit} className="md:w-1/2 bg-[#111111] p-6 rounded-lg flex flex-col gap-4">
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Tu email" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Tu mensaje" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <button type="submit" className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded transition">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}