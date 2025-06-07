import { useState } from "react";

export default function NavbarIsland() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-3 w-full mx-auto px-4 md:px-10 relative">
      {/* Logo */}
      <a href="/" className="w-48 md:w-60">
        <img src="/traditional.svg" alt="logo" />
      </a>

      {/* Botón hamburguesa */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menú móvil */}
      <nav className={`absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-4 py-4 px-6 opacity-95 md:hidden z-50 transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="hover:text-red-500">Inicio</a>
        <a href="#" className="hover:text-red-500">Especialidades</a>
        <a href="#" className="hover:text-red-500">Menu</a>
        <a href="#" className="hover:text-red-500">Reservación</a>
        <a href="#" className="hover:text-red-500">Eventos</a>
        <a href="#" className="hover:text-red-500">Contacto</a>
      </nav>

      {/* Menú escritorio */}
      <nav className="hidden md:flex flex-row gap-x-10 opacity-80 text-lg">
        <a href="#" className="hover:text-red-500">Inicio</a>
        <a href="#" className="hover:text-red-500">Especialidades</a>
        <a href="#" className="hover:text-red-500">Menu</a>
        <a href="#" className="hover:text-red-500">Reservación</a>
        <a href="#" className="hover:text-red-500">Eventos</a>
        <a href="#" className="hover:text-red-500">Contacto</a>
      </nav>
    </header>
  );
}