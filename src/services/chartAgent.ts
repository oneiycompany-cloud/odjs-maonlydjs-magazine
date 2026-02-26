import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const fetchBeatportCharts = async (): Promise<Track[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for the current Top 10 tracks on Beatport (https://www.beatport.com/es). Return the data in a structured JSON format including track title, artist name, current trend (up, down, or stable), and the actual cover art image URL for each track.",
      config: {
        tools: [{ googleSearch: {} }, { urlContext: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              image: { type: Type.STRING },
              trend: { type: Type.STRING, enum: ['up', 'down', 'stable'] }
            },
            required: ['id', 'title', 'artist', 'trend']
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    
    // Ensure images are valid or use placeholders
    return result.map((track: any) => ({
      ...track,
      image: track.image?.startsWith('http') ? track.image : `https://picsum.photos/seed/${track.id}/400/400`
    }));
  } catch (error) {
    console.error("Error fetching charts from Beatport:", error);
    return [];
  }
};
