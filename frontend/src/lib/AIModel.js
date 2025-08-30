import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI with the API key
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});

// Configuration object
const config = {
  responseMimeType: "text/plain",
};

const model = "gemini-2.0-flash"; // Ensure this model name is valid

export async function getAIRecommendation(prompt) {
  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error sending message: ", error);
    return null;
  }
}
