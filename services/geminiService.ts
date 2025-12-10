import { GoogleGenAI } from "@google/genai";
import { FlightResponse, SearchParams } from "../types";

export const searchFlights = async (params: SearchParams): Promise<FlightResponse> => {
  try {
    // Initialize AI client here to ensure process.env is available and prevent top-level crashes
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const tripTypeString = params.returnDate 
      ? `Viagem de IDA E VOLTA. Data de Volta: ${params.returnDate}` 
      : 'Viagem APENAS DE IDA';

    const prompt = `
      Atue como um consultor de viagens de luxo e alta eficiência da "Zupelli Turismo".
      Tarefa: Encontrar as passagens aéreas com o melhor custo-benefício para o cliente.
      
      Origem: ${params.origin}
      Destino: ${params.destination}
      Data de Ida: ${params.date}
      ${tripTypeString}

      Por favor, utilize a ferramenta de busca do Google para encontrar preços reais e atuais.
      
      Formato da Resposta:
      1. Comece com uma saudação elegante.
      2. Forneça um resumo claro das melhores opções encontradas (focando em preço e conforto).
      3. Liste as companhias aéreas, horários e preço total por pessoa.
      4. Mencione escalas de forma clara.
      5. Use uma linguagem profissional, cortês e confiável (tom de agência de turismo premium).
      6. Use formatação Markdown (negrito para preços e cias aéreas).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é o consultor sênior da Zupelli Turismo. Seu objetivo é encantar o cliente com clareza, precisão e polidez.",
        temperature: 0.1, 
      },
    });

    const text = response.text || "Não foi possível encontrar resultados no momento. Por favor, tente novamente em instantes.";
    
    // Extract grounding chunks
    const candidates = response.candidates;
    const groundingChunks = candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Filter and map to our GroundingSource type
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        web: {
          uri: chunk.web.uri,
          title: chunk.web.title
        }
      }));

    return {
      text,
      sources
    };

  } catch (error) {
    console.error("Erro ao buscar voos:", error);
    throw error;
  }
};