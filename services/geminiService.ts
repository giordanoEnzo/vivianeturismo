import { GoogleGenAI } from "@google/genai";
import { ItineraryRequest } from "../types";

// Initialize the Gemini Client
// Note: In a production app, ensure your API key is secured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelItinerary = async (request: ItineraryRequest): Promise<string> => {
  try {
    const prompt = `
      Atue como um agente de viagens experiente da "Viviane Turismo".
      Crie um roteiro de viagem personalizado e detalhado para o seguinte perfil:
      
      - Destino: ${request.destination}
      - Duração: ${request.days} dias
      - Orçamento: ${request.budget}
      - Interesses: ${request.interests}
      
      O tom deve ser inspirador, profissional e acolhedor.
      Formate a resposta utilizando Markdown para facilitar a leitura (use negrito para títulos de dias, listas para atividades).
      Inclua uma breve introdução dando boas vindas ao cliente em nome da Viviane Turismo.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Desculpe, não conseguimos gerar o roteiro no momento. Tente novamente mais tarde.";
  } catch (error) {
    console.error("Erro ao gerar roteiro:", error);
    return "Ocorreu um erro ao conectar com nossa inteligência artificial. Por favor, verifique sua conexão.";
  }
};