import React, { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { generateTravelItinerary } from '../services/geminiService';
import { ItineraryRequest } from '../types';

export const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItineraryRequest>({
    destination: '',
    days: 5,
    budget: 'Médio',
    interests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const itinerary = await generateTravelItinerary(formData);
    setResult(itinerary);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="planner" className="py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info */}
          <div className="text-white pt-8">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 font-medium text-sm mb-6">
              <Sparkles size={16} />
              <span>Tecnologia Exclusiva Viviane Turismo</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Sua viagem dos sonhos <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400">
                planejada em segundos
              </span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Não sabe por onde começar? Nossa inteligência artificial cria um roteiro personalizado 
              baseado nos seus gostos, orçamento e tempo disponível. É gratuito e instantâneo.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Roteiros 100% personalizados",
                "Sugestões de restaurantes e atrações",
                "Otimização do seu tempo de viagem",
                "Dicas locais exclusivas"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-slate-200">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form & Result */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">Para onde você quer ir?</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    required
                    placeholder="Ex: Lisboa, Portugal"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    value={formData.destination}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="days" className="block text-sm font-medium text-slate-700 mb-1">Dias</label>
                    <input
                      type="number"
                      id="days"
                      name="days"
                      min="1"
                      max="30"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      value={formData.days}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">Orçamento</label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="Baixo">Econômico</option>
                      <option value="Médio">Confortável</option>
                      <option value="Alto">Luxuoso</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-slate-700 mb-1">O que você gosta? (Opcional)</label>
                  <textarea
                    id="interests"
                    name="interests"
                    rows={3}
                    placeholder="Ex: Museus, praias tranquilas, gastronomia local, aventura..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                    value={formData.interests}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Gerando Roteiro Mágico...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} /> Criar Roteiro Agora
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800">Seu Roteiro Sugerido</h3>
                  <button 
                    onClick={() => setResult(null)}
                    className="text-sm text-sky-500 hover:text-sky-700 font-medium"
                  >
                    Criar Novo
                  </button>
                </div>
                
                <div className="prose prose-sm prose-slate max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Rendering Markdown-like text simply */}
                  {result.split('\n').map((line, i) => (
                    <p key={i} className={`mb-2 ${line.startsWith('#') ? 'font-bold text-orange-600 mt-4 text-lg' : 'text-slate-600'}`}>
                      {line.replace(/^#+\s/, '')}
                    </p>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 text-center mb-4">Gostou da sugestão? Fale conosco para reservar!</p>
                  <a href="#contact" className="block w-full bg-slate-900 text-white text-center py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                    Solicitar Orçamento Deste Roteiro
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
