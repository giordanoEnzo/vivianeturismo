import React from 'react';
import { Plane, Hotel, Map, ShieldCheck, Headphones, CreditCard } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    icon: <Plane size={32} />,
    title: 'Passagens Aéreas',
    description: 'Encontramos as melhores tarifas e conexões para o seu destino.'
  },
  {
    icon: <Hotel size={32} />,
    title: 'Hospedagem',
    description: 'De resorts luxuosos a pousadas charmosas, temos a opção ideal.'
  },
  {
    icon: <Map size={32} />,
    title: 'Roteiros Personalizados',
    description: 'Viagens desenhadas sob medida para o seu perfil e orçamento.'
  },
  {
    icon: <ShieldCheck size={32} />,
    title: 'Seguro Viagem',
    description: 'Viaje tranquilo com as melhores coberturas do mercado.'
  },
  {
    icon: <Headphones size={32} />,
    title: 'Suporte 24h',
    description: 'Estaremos com você via WhatsApp durante toda a sua viagem.'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Pagamento Facilitado',
    description: 'Parcele sua viagem no cartão ou boleto com condições especiais.'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
          <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group bg-slate-50/50 hover:bg-white">
              <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
