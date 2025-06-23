import { useState, useEffect } from "react";
import TwitterIcon from "./icons/twitter.jsx";
import FacebookIcon from "./icons/facebook.jsx";
import InstagramIcon from "./icons/instagram.jsx";
import LinkedinIcon from "./icons/linkedin.jsx";

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({
    nombre : false,
    email: false,
    mensaje: false,
  });

  // Validamos cada vez que el formulario cambia
  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0)
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true}));
  };

  const validate = () => {
    let newErrors = {};

    if(!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    if(!form.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "El correo no es valido.";
    }

    if(!form.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio.";
    } else if (form.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    
    if(!isValid) return;

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
              <a href="#"><LinkedinIcon className="w-6 h-6 fill-white hover:fill-red-500"/></a>
            </div>
          </div>
          <div>
            <p className="text-red-500 font-semibold mb-1">Ubicación</p>
            <iframe src="https://www.google.com/maps/embed?pb=..." className="w-full h-48 rounded border-none" loading="lazy"></iframe>
          </div>
        </div>

        {/* Fromulario */}
        <form onSubmit={handleSumbit} className="md:w-1/2 bg-[#111111] p-6 rounded-lg flex flex-col gap-4">
          <div>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} onBlur={handleBlur} placeholder="Tu nombre" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"/>
            {touched.nombre && errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Tu email" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"/>
            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} onBlur={handleBlur} placeholder="Tu mensaje" required className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-gray-400 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 w-full"/>
            {touched.mensaje && errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>}
          </div>
          <button type="submit" disabled={!isValid} className={`mt-2 font-bold py-3 rounded transition ${isValid ? 'bg-red-500 hover:bg-red-900 text-white cursor-pointer' : 'bg-gray-600 cursor-not-allowed text-gray-300'}`}>
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}