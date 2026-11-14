import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80" 
          alt="Tropical Beach Sunset" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay using Logo Colors (Navy to Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl">
          <h2 className="text-orange-400 font-bold tracking-wider uppercase mb-2 text-sm md:text-base">
            Viviane Turismo apresenta
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transformando seu <span className="text-orange-500">sonho</span> em <span className="text-sky-400">memórias</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
            Especialistas em criar experiências inesquecíveis. Do planejamento ao retorno, cuidamos de cada detalhe da sua viagem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#packages" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg shadow-orange-500/30 text-center flex items-center justify-center gap-2">
              Ver Pacotes <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};