import { GoogleGenAI } from "@google/genai";
import { FlightResponse, SearchParams } from "../types";

// Declare process to satisfy TypeScript compiler
declare var process: { env: { API_KEY?: string } };

export const searchFlights = async (params: SearchParams): Promise<FlightResponse> => {
  try {
    // Access safely thanks to the polyfill in index.tsx
    // Trim whitespace to prevent copy-paste errors
    const apiKey = process.env.API_KEY ? process.env.API_KEY.trim() : "";
    
    // Critical Check
    if (!apiKey) {
      throw new Error("CONFIG_ERROR: API Key não encontrada.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const tripTypeString = params.returnDate 
      ? `IDA E VOLTA (Volta: ${params.returnDate})` 
      : 'APENAS IDA';

    const prompt = `
      ATUE COMO: "Zupelli AI", o consultor de viagens definitivo.
      CONTEXTO: Busca em tempo real de passagens aéreas.
      
      DADOS:
      - Origem: ${params.origin}
      - Destino: ${params.destination}
      - Data: ${params.date}
      - Tipo: ${tripTypeString}

      INSTRUÇÃO DE FERRAMENTA:
      1. Utilize 'googleSearch' para encontrar voos reais e preços atuais em sites confiáveis (Google Flights, Skyscanner, Kayak).
      2. Se o preço exato para a data não estiver disponível no snippet, forneça a melhor estimativa baseada em datas próximas e avise o usuário.
      
      RESPOSTA (Markdown):
      # ✈️ ${params.origin} ➔ ${params.destination}
      
      **Resumo:** [Breve frase de impacto sobre a disponibilidade/preço]

      ## 💎 A Escolha Zupelli (Melhor Custo-Benefício)
      * **Cia Aérea:** [Nome]
      * **Valor Estimado:** R$ [Preço]
      * **Por que escolhemos:** [Motivo: preço, horário ou conforto]

      ## 📉 Opção Mais Barata
      * **Valor:** R$ [Preço] - [Detalhes da Cia/Escalas]

      ## 🚀 Opção Mais Rápida/Confortável
      * **Valor:** R$ [Preço] - [Detalhes]

      ---
      *Dica Pro:* [Uma dica valiosa sobre o destino ou aeroporto]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um assistente de viagens sofisticado. Use formatação Markdown limpa e elegante. Preços em Reais (BRL).",
        temperature: 0.2, 
      },
    });

    const text = response.text || "O sistema de busca retornou vazio. Por favor, tente novamente em alguns instantes.";
    
    // Extract grounding chunks securely
    const candidates = response.candidates;
    const groundingChunks = candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
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

  } catch (error: any) {
    console.error("Zupelli AI Error:", error);
    
    let errorMessage = "Ocorreu uma falha na comunicação com a IA.";
    
    // User-friendly error mapping
    if (error.message.includes("CONFIG_ERROR") || error.message.includes("API Key")) {
      errorMessage = "Chave de API não configurada. Verifique as variáveis de ambiente na Vercel (API_KEY).";
    } else if (error.status === 403) {
      errorMessage = "Acesso negado. Verifique se a API Key é válida e tem permissões.";
    } else if (error.status === 429) {
      errorMessage = "Alto tráfego detectado. Aguarde alguns segundos e tente novamente.";
    } else if (error.message.includes("fetch") || error.message.includes("network")) {
      errorMessage = "Erro de conexão. Verifique sua internet.";
    }

    throw new Error(errorMessage);
  }
};