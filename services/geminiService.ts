import { GoogleGenAI } from "@google/genai";
import { FlightResponse, SearchParams } from "../types";

// Declare process to avoid TypeScript errors
declare var process: any;

export const searchFlights = async (params: SearchParams): Promise<FlightResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    
    // Validar se a chave existe antes de tentar instanciar o cliente
    if (!apiKey) {
      throw new Error("API_KEY não configurada. Verifique as variáveis de ambiente na Vercel.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const tripTypeString = params.returnDate 
      ? `Viagem de IDA E VOLTA. Data de Volta: ${params.returnDate}` 
      : 'Viagem APENAS DE IDA';

    const prompt = `
      ATUE COMO: O melhor agente de viagens de luxo do mundo (Zupelli Turismo).
      MISSÃO: Realizar uma varredura minuciosa na web para encontrar as passagens aéreas MAIS BARATAS e com MELHOR CUSTO-BENEFÍCIO.
      
      DADOS DO CLIENTE:
      - Origem: ${params.origin}
      - Destino: ${params.destination}
      - Data de Ida: ${params.date}
      - ${tripTypeString}

      INSTRUÇÕES ESTRITAS:
      1. Use a ferramenta Google Search para buscar preços REAIS em múltiplos sites (Skyscanner, Google Flights, Kayak, Decolar).
      2. Compare exaustivamente as opções.
      3. Se encontrar voos muito baratos, verifique se há escalas longas e avise.
      
      FORMATO DA RESPOSTA (Markdown):
      # ✈️ Análise de Voos Exclusiva
      
      **Resumo Executivo:** [Uma frase de impacto sobre a melhor oportunidade]
      
      ## 🏆 Melhor Escolha (Custo-Benefício)
      * **Preço:** R$ [Valor]
      * **Cia Aérea:** [Nome]
      * **Horários:** [Ida] | [Volta se houver]
      * **Detalhe:** [Por que essa é a melhor opção?]

      ## 💰 Opção Mais Econômica (Menor Preço Absoluto)
      * **Preço:** R$ [Valor]
      * **Detalhes:** [Cia, escalas, tempo total]

      ## 💎 Opção Mais Confortável (Direto/Executiva)
      * [Detalhes se disponível]

      ---
      *Dica Zupelli:* [Uma dica valiosa sobre o destino ou a data]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um assistente de viagens sofisticado, preciso e obcecado por encontrar o menor preço para o cliente. Responda em Português do Brasil com elegância.",
        temperature: 0.2, 
      },
    });

    const text = response.text || "Não foi possível encontrar resultados específicos no momento. Tente refinar as datas.";
    
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

  } catch (error: any) {
    console.error("Erro na busca:", error);
    // Retornar erro amigável se for problema de chave
    if (error.message.includes("API_KEY")) {
      throw new Error("Erro de Configuração: Chave de API não encontrada.");
    }
    throw error;
  }
};