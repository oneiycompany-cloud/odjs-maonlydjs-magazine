import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, LiveUpdate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const fetchLatestEDMNews = async (): Promise<{ articles: NewsArticle[], updates: LiveUpdate[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for the most recent and breaking news in the electronic music (EDM) industry from the following sources in the last 24 hours:
1. https://djmag.com/
2. https://edm.com/.rss/full/
3. https://weraveyou.com/category/exclusive/
4. https://spinninrecords.com/

For EACH article found, you MUST use the googleSearch tool to find a high-resolution, landscape (3:2 aspect ratio) press or editorial image that matches the article's topic (artist, event, or festival). 

IMAGE SEARCH INSTRUCTIONS:
- Extract keywords (artist, event, festival) from the title.
- Search for "[Keywords] EDM news landscape press photo".
- Prioritize high-resolution images with a 3:2 landscape aspect ratio.
- Select a direct image URL that is high quality.
- DO NOT use placeholders.

CATEGORIZATION:
Assign one of these categories: 'Industry', 'Releases', 'Exclusive', 'Label News', 'NEWS', 'PREMIERE', 'AWARDS', 'CHARTS'.

SOURCE MARKING:
Identify the source and set the 'source' field.

Return the data in a structured JSON format.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  category: { type: Type.STRING, enum: ['NEWS', 'PREMIERE', 'AWARDS', 'CHARTS', 'INDUSTRY', 'EDM NEWS', 'Industry', 'Releases', 'Exclusive', 'Label News'] },
                  date: { type: Type.STRING },
                  timeAgo: { type: Type.STRING },
                  image: { type: Type.STRING },
                  url: { type: Type.STRING },
                  source: { type: Type.STRING },
                  excerpt: { type: Type.STRING },
                  isTrending: { type: Type.BOOLEAN }
                },
                required: ['id', 'title', 'category', 'date', 'timeAgo', 'image', 'excerpt', 'url', 'source']
              }
            },
            updates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  message: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['CHART', 'UPLOAD', 'AWARD', 'LABEL'] }
                },
                required: ['id', 'message', 'timestamp', 'type']
              }
            }
          },
          required: ['articles', 'updates']
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // Ensure images are valid or use placeholders if model fails to provide good ones
    const processedArticles = (result.articles || []).map((art: any) => ({
      ...art,
      image: (art.image && art.image.startsWith('http')) ? art.image : `https://picsum.photos/seed/${art.id}/1200/600`
    }));

    return {
      articles: processedArticles,
      updates: result.updates || []
    };
  } catch (error) {
    console.error("Error fetching news from agent:", error);
    throw error;
  }
};
