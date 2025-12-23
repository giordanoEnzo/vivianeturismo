import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <span className="text-3xl font-bold text-white">VIVIANE</span>
              <span className="text-3xl font-light text-orange-500 ml-1">TURISMO</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Transformamos sonhos em memórias. Nossa missão é proporcionar experiências de viagem únicas, seguras e inesquecíveis para você e sua família. Especialistas em roteiros nacionais e internacionais.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/viviane_turismo_viagens" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:pl-12">
            <h3 className="text-xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Nossos Contatos</h3>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mr-4 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-slate-400 text-sm mb-1">Telefone / WhatsApp</span>
                  <span className="text-lg font-medium hover:text-orange-400 cursor-pointer transition-colors">(19) 99362-8002</span>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mr-4 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-slate-400 text-sm mb-1">Email</span>
                  <span className="text-lg font-medium hover:text-orange-400 cursor-pointer transition-colors">viviane@vivianeturismo.com.br</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Viviane Turismo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};