import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AdConcept {
  title: string;
  hook: string;
  slides: {
    title: string;
    description: string;
    visualSuggestion: string;
    duration: string;
  }[];
  scripts: string;
}

export async function generateAdConcept(businessName: string, product: string, targetAudience: string): Promise<AdConcept> {
  const prompt = `Génère un concept de publicité vidéo PowerPoint pour l'entreprise "${businessName}".
  Produit/Service: ${product}
  Cible: ${targetAudience}
  
  Le résultat doit être une structure de présentation PowerPoint optimisée pour être exportée en vidéo.
  Inclus un titre accrocheur, une phrase d'accroche (hook), une structure de diapositives détaillée et un script complet pour le narrateur (ou textes à l'écran).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          hook: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                visualSuggestion: { type: Type.STRING },
                duration: { type: Type.STRING }
              },
              required: ["title", "description", "visualSuggestion", "duration"]
            }
          },
          scripts: { type: Type.STRING }
        },
        required: ["title", "hook", "slides", "scripts"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Erreur lors de la génération du concept.");
  }
}
