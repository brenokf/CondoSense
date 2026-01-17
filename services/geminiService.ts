
import { GoogleGenAI, Type } from "@google/genai";
import { RegulationItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const regulationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'Título curto e direto para a regra' },
      category: { 
        type: Type.STRING, 
        description: 'Categoria da regra (Geral, Silêncio e Ruídos, Animais de Estimação, Garagem e Tráfego, Áreas Comuns e Lazer, Obras e Reformas, Segurança e Acesso, Lixo e Sustentabilidade, Taxas e Multas, Assembleias e Gestão)' 
      },
      content: { type: Type.STRING, description: 'O texto técnico original da regra' },
      summary: { type: Type.STRING, description: 'Um resumo de 1 frase em linguagem simples' },
      explanation: { type: Type.STRING, description: 'Explique POR QUE a regra existe de forma amigável' },
      importance: { type: Type.STRING, description: 'Por que esta regra é importante para a comunidade' },
      tags: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: 'Palavras-chave para busca'
      },
    },
    required: ['title', 'category', 'content', 'summary', 'explanation', 'importance', 'tags'],
  },
};

export async function analyzeRegulations(pdfBase64: string): Promise<RegulationItem[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: pdfBase64
          }
        },
        {
          text: `Analise este regulamento interno de condomínio e transforme-o em um array JSON estruturado seguindo o schema fornecido. 
          IMPORTANT: All output text must be in Portuguese (Brazil). 
          Explain each rule in a friendly way for residents.`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: regulationSchema,
        temperature: 0.1,
      },
    });

    const results = JSON.parse(response.text || '[]');
    return results.map((item: any, index: number) => ({
      ...item,
      id: `ai-${Date.now()}-${index}`,
    }));
  } catch (error) {
    console.error("Falha na análise do Gemini:", error);
    throw error;
  }
}
