import React, { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import axios from 'axios';

interface ApiPackage {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
  image: string;
  hotel?: string;
  has_breakfast?: number;
  has_lunch?: number;
  has_dinner?: number;
  flight_info?: string;
  services_info?: string;
  people_count?: string;
  active: number;
}

export const Packages: React.FC = () => {
  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<ApiPackage | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/promotions')
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch packages", err);
        setLoading(false);
      });
  }, []);

  // Helper to get image URL
  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:3001${path}`;
  };

  const openModal = (pkg: ApiPackage) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Destinos em Destaque</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Selecionamos os melhores destinos com condições exclusivas para você viver momentos inesquecíveis.
          </p>
        </div>

        {loading ? (
          <div className="text-center">Carregando promoções...</div>
        ) : packages.length === 0 ? (
          <div className="text-center text-slate-500">Nenhuma promoção encontrada no momento.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(pkg.image)}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Oferta
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sky-500 text-sm font-medium mb-2">
                    <MapPin size={16} className="mr-1" />
                    {pkg.title}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.title.split(',')[0]}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center text-slate-400 text-xs">
                      <Clock size={14} className="mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">A partir de</span>
                      <span className="text-lg font-bold text-orange-600">{pkg.price}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openModal(pkg)}
                  className="block text-center w-full bg-slate-900 text-white py-3 font-medium hover:bg-sky-500 transition-colors"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="h-64 sm:h-80 w-full relative">
              <img
                src={getImageUrl(selectedPackage.image)}
                alt={selectedPackage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white mb-1">{selectedPackage.title}</h3>
                <p className="text-white/90 text-lg">{selectedPackage.price}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Sobre o Pacote</h4>
                <p className="text-slate-600 leading-relaxed">{selectedPackage.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedPackage.hotel && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Hotel</h4>
                    <p className="text-slate-800 font-medium">{selectedPackage.hotel}</p>
                  </div>
                )}

                {selectedPackage.duration && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Duração</h4>
                    <p className="text-slate-800 font-medium flex items-center">
                      <Clock size={16} className="mr-2 text-orange-500" />
                      {selectedPackage.duration}
                    </p>
                  </div>
                )}

                {selectedPackage.people_count && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Pessoas</h4>
                    <p className="text-slate-800 font-medium">
                      {selectedPackage.people_count}
                    </p>
                  </div>
                )}
              </div>

              {(selectedPackage.has_breakfast || selectedPackage.has_lunch || selectedPackage.has_dinner) && (
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Refeições Inclusas</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* SQLite stores booleans as 1 or 0 usually, check logic */}
                    {(selectedPackage.has_breakfast === 1 || selectedPackage.has_breakfast === true) && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Café da Manhã</span>
                    )}
                    {(selectedPackage.has_lunch === 1 || selectedPackage.has_lunch === true) && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Almoço</span>
                    )}
                    {(selectedPackage.has_dinner === 1 || selectedPackage.has_dinner === true) && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Jantar</span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedPackage.flight_info && (
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center">
                      Aéreo
                    </h4>
                    <p className="text-slate-600 text-sm">{selectedPackage.flight_info}</p>
                  </div>
                )}

                {selectedPackage.services_info && (
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center">
                      Serviços / Passeios
                    </h4>
                    <p className="text-slate-600 text-sm">{selectedPackage.services_info}</p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <a
                  href={`https://wa.me/5519993628002?text=Olá, gostaria de saber mais sobre a promoção: ${selectedPackage.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Solicitar Orçamento no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
