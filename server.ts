import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini for fallback search
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Initialize SQLite Database for Image Cache
const db = new Database("image_cache.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS cache (
    hash TEXT PRIMARY KEY,
    url TEXT,
    content_type TEXT,
    data BLOB,
    created_at INTEGER
  )
`);

const insertCache = db.prepare("INSERT OR REPLACE INTO cache (hash, url, content_type, data, created_at) VALUES (?, ?, ?, ?, ?)");
const getCache = db.prepare("SELECT * FROM cache WHERE hash = ?");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Image Proxy & Cache Endpoint
  app.get(["/api/image-proxy", "/api/image-cache/:hash"], async (req, res) => {
    const imageUrl = req.query.url as string;
    const hashParam = req.params.hash;

    let hash = hashParam;
    if (!hash && imageUrl) {
      hash = crypto.createHash("md5").update(imageUrl).digest("hex");
    }

    if (!hash) {
      return res.status(400).send("URL or Hash is required");
    }

    // Check Cache
    const cached = getCache.get(hash) as any;
    if (cached) {
      // Cache for 24 hours (86400 seconds)
      const now = Date.now();
      if (now - cached.created_at < 86400000) {
        res.setHeader("Content-Type", cached.content_type);
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.send(cached.data);
      }
    }

    if (!imageUrl) {
      return res.status(404).send("Image not found in cache and no URL provided");
    }

    try {
      const response = await fetch(imageUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": new URL(imageUrl).origin,
        },
        signal: AbortSignal.timeout(5000), // 5s timeout
      });

      if (!response.ok) {
        console.warn(`Proxy fetch failed for ${imageUrl}: ${response.status} ${response.statusText}`);
        return res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "image/jpeg";
      if (!contentType.startsWith("image/")) {
        return res.status(415).send("URL did not return an image");
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Save to Cache
      insertCache.run(hash, imageUrl, contentType, buffer, Date.now());

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(buffer);
    } catch (error) {
      console.error("Image proxy error:", error);
      res.status(500).send("Error proxying image");
    }
  });

  // Google Image Search Endpoint (with Gemini Fallback)
  app.get("/api/search-image", async (req, res) => {
    const query = req.query.q as string;
    const apiKey = process.env.GOOGLE_IMAGE_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_CX;

    if (!query) {
      return res.status(400).json({ error: "Query 'q' is required" });
    }

    // Attempt Google Custom Search if keys are present
    if (apiKey && cx) {
      try {
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&num=5&q=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl, { signal: AbortSignal.timeout(5000) });
        
        const contentType = response.headers.get("content-type") || "";
        if (response.ok && contentType.includes("application/json")) {
          const data = await response.json();
          const firstImage = data.items?.[0]?.link;
          if (firstImage) {
            return res.json({ image: firstImage });
          }
        }
      } catch (error) {
        console.warn("Google Search API failed, falling back to Gemini:", error);
      }
    }

    // Fallback to Gemini Image Search
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find a high-quality, direct URL to a landscape press photo or editorial image for this news topic: "${query}". 
        Return ONLY the raw image URL. Do not include any other text.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const imageUrl = response.text?.trim().match(/https?:\/\/[^\s"']+/)?.[0] || null;
      res.json({ image: imageUrl });
    } catch (error) {
      console.error("Gemini search fallback failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
