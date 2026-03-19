import React from 'react';
import { Navbar } from '../components/Navbar';
import { ContactFooter } from '../components/ContactFooter';

export function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Sobre a Viviane Turismo</h1>
            <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-3xl transform translate-x-4 translate-y-4"></div>
                <img 
                  src="/viviane.jpg" 
                  alt="Viviane Nascimento" 
                  className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-[3/4]"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                A Viviane Turismo nasceu da experiência e da paixão por viagens de sua fundadora, Viviane Nascimento, que acumula mais de 25 anos de atuação na organização e gestão de viagens.
              </p>
              
              <p>
                Ao longo de sua carreira como secretária executiva, Viviane foi responsável pelo planejamento completo de deslocamentos de CEOs, presidentes e colaboradores, cuidando de cada etapa com excelência — desde a saída de suas residências ou empresas até o retorno. Sempre com um acompanhamento próximo e atento, garantiu viagens seguras, organizadas e eficientes, tanto no Brasil quanto no exterior, em contextos corporativos e de lazer.
              </p>
              
              <p>
                Com essa sólida bagagem, a Viviane Turismo surge com o propósito de oferecer uma consultoria de viagens personalizada, unindo conhecimento, cuidado e atenção aos detalhes para proporcionar experiências únicas.
              </p>
              
              <p className="font-semibold text-xl text-slate-900 border-l-4 border-orange-500 pl-6 mt-8 italic">
                Mais do que planejar viagens, a Viviane Turismo se dedica a "transformar sonhos em memórias" inesquecíveis, com atendimento próximo, confiança e excelência em cada roteiro.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <ContactFooter />
    </div>
  );
}
