
import { GoogleGenAI, Type } from "@google/genai";
import { RegulationItem, RegulationUpdate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const regulationSchema = {
  type: Type.OBJECT,
  properties: {
    regulations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          content: { type: Type.STRING },
          summary: { type: Type.STRING },
          explanation: { type: Type.STRING },
          importance: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title', 'category', 'content', 'summary', 'explanation', 'importance', 'tags'],
      }
    },
    updateSummary: {
      type: Type.OBJECT,
      properties: {
        reason: { type: Type.STRING, description: 'Motivo principal da atualização detectada' },
        changes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: 'added, removed ou modified' },
              itemTitle: { type: Type.STRING },
              description: { type: Type.STRING, description: 'Resumo da alteração para o morador' }
            }
          }
        }
      }
    }
  },
  required: ['regulations', 'updateSummary']
};

export async function analyzeAndCompareRegulations(pdfBase64: string, currentRegulations: RegulationItem[]): Promise<{ items: RegulationItem[], update: RegulationUpdate | null }> {
  try {
    const currentContext = JSON.stringify(currentRegulations.map(r => ({ title: r.title, content: r.content })));
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        {
          inlineData: { mimeType: "application/pdf", data: pdfBase64 }
        },
        {
          text: `Você é um especialista jurídico em condomínios. 
          1. Extraia todas as regras do PDF.
          2. Compare com as regras atuais: ${currentContext}.
          3. Identifique o que mudou.
          4. Se for a primeira vez (contexto vazio), o updateSummary deve refletir "Implantação Inicial".
          
          Responda estritamente em Português do Brasil no formato JSON especificado.`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: regulationSchema,
        temperature: 0.1,
      },
    });

    const data = JSON.parse(response.text || '{}');
    const versionId = `v-${Date.now()}`;
    
    const items: RegulationItem[] = data.regulations.map((item: any, index: number) => ({
      ...item,
      id: `reg-${versionId}-${index}`,
    }));

    const hasRealChanges = data.updateSummary?.changes?.length > 0;
    
    const update: RegulationUpdate | null = hasRealChanges ? {
      versionId,
      date: new Date().toLocaleDateString('pt-BR'),
      reason: data.updateSummary.reason,
      changes: data.updateSummary.changes
    } : null;

    return { items, update };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
