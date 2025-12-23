import React, { useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src="/logo.png" alt="Viviane Turismo" className="h-16 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-orange-500 transition-colors font-medium">Início</Link>
            <a href="/#packages" className="text-slate-600 hover:text-orange-500 transition-colors font-medium">Pacotes</a>
            <a href="/#services" className="text-slate-600 hover:text-orange-500 transition-colors font-medium">Serviços</a>
            <Link to="/blog" className="text-slate-600 hover:text-orange-500 transition-colors font-medium">Blog</Link>
            <a href="#contact" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-orange-500 transition-colors font-medium shadow-lg">
              Fale Conosco
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-orange-500 font-medium">Início</Link>
            <a href="/#packages" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-orange-500 font-medium">Pacotes</a>
            <a href="/#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-orange-500 font-medium">Serviços</a>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-orange-500 font-medium">Blog</Link>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-orange-500 font-bold">Fale Conosco</a>
          </div>
        </div>
      )}
    </nav>
  );
};