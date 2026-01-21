
import { GoogleGenAI, Type } from "@google/genai";
import { ValuationResult } from "../types";

export class GeminiService {
  
  private cleanJsonResponse(text: string): string {
    // Remove markdown code blocks if present
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  }

  async calculateValuation(userContext: string): Promise<ValuationResult> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userContext,
        config: {
          systemInstruction: `You are the PayPerValue AI Valuation Agent. 
          Analyze the provided service description and calculate the economic value using:
          1. Time-saved (e.g. 5 hours * $50/hr = $250)
          2. Outcome-based (e.g. 10% of revenue generated or cost reduced)
          3. Market benchmarks
          4. Quality premiums.
          
          Provide your output strictly in JSON format matching the schema.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              minFairValue: { type: Type.NUMBER },
              recommendedValue: { type: Type.NUMBER },
              premiumValue: { type: Type.NUMBER },
              reasoning: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              metrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["summary", "minFairValue", "recommendedValue", "premiumValue", "reasoning", "metrics"]
          }
        }
      });

      const text = response.text || "{}";
      const cleaned = this.cleanJsonResponse(text);
      return JSON.parse(cleaned) as ValuationResult;
    } catch (e) {
      console.error("Gemini Valuation Error:", e);
      throw new Error("Valuation failed. Please ensure your prompt has enough detail.");
    }
  }

  async getAgentValuation(context: string): Promise<ValuationResult> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: context,
        config: {
          systemInstruction: `You are a World-Class ROI Analyst for the AI Marketplace.
          Your goal is to calculate the specific business impact of deploying an AI agent.
          
          If the user has not provided specific business variables (Team Size, Current Manual Cost, Task Volume), you must ASK for them in the summary but still provide an ESTIMATED valuation based on market averages.
          
          Output MUST be valid JSON. 
          'minFairValue' should represent the per-transaction cost.
          'recommendedValue' should represent the projected MONTHLY NET SAVINGS for the user.
          'premiumValue' should represent the projected ANNUAL ROI in dollars.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              minFairValue: { type: Type.NUMBER },
              recommendedValue: { type: Type.NUMBER },
              premiumValue: { type: Type.NUMBER },
              reasoning: { type: Type.ARRAY, items: { type: Type.STRING } },
              metrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["summary", "minFairValue", "recommendedValue", "premiumValue", "reasoning", "metrics"]
          }
        }
      });

      const text = response.text || "{}";
      const cleaned = this.cleanJsonResponse(text);
      return JSON.parse(cleaned) as ValuationResult;
    } catch (e) {
      console.error("Gemini Agent ROI Error:", e);
      throw new Error("Could not calculate agent ROI. Please provide more business context.");
    }
  }
}

export const geminiService = new GeminiService();
