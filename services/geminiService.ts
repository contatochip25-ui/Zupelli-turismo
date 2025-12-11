import { GoogleGenAI } from "@google/genai";
import { FlightResponse, SearchParams } from "../types";

// Declare process to avoid TypeScript errors
declare var process: any;

export const searchFlights = async (params: SearchParams): Promise<FlightResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    
    // Validar se a chave existe antes de tentar instanciar o cliente
    if (!apiKey) {
      throw new Error("A chave da API (API_KEY) não está configurada. Configure as variáveis de ambiente no painel da Vercel.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const tripTypeString = params.returnDate 
      ? `IDA E VOLTA (Volta: ${params.returnDate})` 
      : 'APENAS IDA';

    // Construção de um prompt mais diretivo para garantir o uso da ferramenta
    const prompt = `
      ATUE COMO: O sistema de inteligência artificial de viagens mais avançado do mundo, o "Zupelli AI".
      
      OBJETIVO: Pesquisar e analisar passagens aéreas reais.
      
      PARÂMETROS DA BUSCA:
      - Origem: ${params.origin}
      - Destino: ${params.destination}
      - Data de Ida: ${params.date}
      - Tipo: ${tripTypeString}

      INSTRUÇÕES PARA O MODELO (IMPORTANTE):
      1. USE A FERRAMENTA DE BUSCA (Google Search) para encontrar preços atuais. Pesquise por termos como "passagem aérea ${params.origin} para ${params.destination} ${params.date}".
      2. Se não encontrar o preço exato para o dia específico nos resultados da busca, use preços de datas próximas como referência e deixe claro que é uma estimativa.
      3. Seja transparente: Se os resultados da busca não mostrarem preços, diga que está monitorando as tarifas e sugira os melhores sites (Google Flights, Skyscanner) para consulta direta.
      4. NÃO invente valores aleatórios. Use os dados retornados pela ferramenta de busca (Grounding).
      
      FORMATO DE RESPOSTA (Markdown Elegante):
      
      # ✈️ Relatório de Voo: ${params.origin} ➔ ${params.destination}
      
      **Status da Busca:** [Encontrado / Estimado]
      
      ## 🏅 Destaque da IA (Melhor Custo-Benefício)
      > [Destaque a melhor opção encontrada ou recomendada com base na busca]
      
      ## 📊 Análise de Tarifas
      * **Opção Econômica:** R$ [Valor] (Cia: [Nome]) - *[Obs: escalas/bagagem]*
      * **Opção Rápida:** R$ [Valor] (Cia: [Nome]) - *[Obs: tempo total]*
      
      ## 💡 Insights Zupelli
      * [Dica sobre o destino ou época do ano]
      * [Alerta sobre antecedência de compra]

      ---
      *Nota: Os valores são baseados nos resultados de busca disponíveis publicamente e podem variar.*
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um assistente de viagens de luxo, polido, direto e extremamente útil. Responda sempre em Português do Brasil com formatação Markdown impecável.",
        temperature: 0.2, // Temperatura baixa para respostas mais factuais
      },
    });

    const text = response.text || "Desculpe, não consegui recuperar os dados dos voos neste momento. Por favor, tente novamente em alguns instantes.";
    
    // Extração segura das fontes (Grounding)
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
    console.error("Erro detalhado na busca:", error);
    
    // Tratamento de erros específicos para feedback visual
    let errorMessage = "Ocorreu um erro inesperado ao buscar voos.";
    
    if (error.message?.includes("API_KEY")) {
      errorMessage = "Erro de Configuração: API Key ausente ou inválida. Verifique a Vercel.";
    } else if (error.status === 429) {
      errorMessage = "Muitas requisições. Por favor, aguarde um momento.";
    } else if (error.message?.includes("fetch")) {
      errorMessage = "Erro de conexão. Verifique sua internet.";
    }

    throw new Error(errorMessage);
  }
};