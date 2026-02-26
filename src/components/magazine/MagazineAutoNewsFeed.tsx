import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, ArrowRight, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { NewsArticle } from '../../types';
import { fetchLatestEDMNews } from '../../services/newsAgent';

const ProxiedImage: React.FC<{ src: string; alt: string; onImageFound?: (url: string) => void }> = ({ src, alt, onImageFound }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);

  const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(currentSrc)}`;
  const fallbackUrl = `https://picsum.photos/seed/${encodeURIComponent(alt)}/600/400`;

  const handleImageError = async () => {
    // If already searching or we already tried a search result, give up and show error
    if (isSearching || (currentSrc !== src && currentSrc !== '')) {
      setError(true);
      return;
    }

    setIsSearching(true);
    try {
      // Search for a relevant landscape image
      const response = await fetch(`/api/search-image?q=${encodeURIComponent(alt + " EDM news landscape press photo")}`);
      
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        throw new Error(`Search API returned ${response.status}`);
      }

      if (!contentType.includes("application/json")) {
        throw new Error("Search API did not return JSON");
      }

      const data = await response.json();
      
      if (data.image) {
        setCurrentSrc(data.image);
        setError(false);
        if (onImageFound) {
          onImageFound(data.image);
        }
      } else {
        setError(true);
      }
    } catch (e) {
      console.error("Search image fallback failed:", e);
      setError(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Trigger search if src is missing or looks like a placeholder
  useEffect(() => {
    setCurrentSrc(src);
    setError(false);
    if (!src || src.includes('picsum.photos') || src.includes('placeholder') || src === '') {
      handleImageError();
    }
  }, [src]);

  return (
    <div className="relative w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
      {!error ? (
        <img 
          src={proxyUrl} 
          alt={alt} 
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSearching ? 'opacity-30 blur-md' : 'opacity-100'}`}
          style={{ aspectRatio: '3/2' }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-black/20 p-4 text-center">
          <ImageIcon size={40} className="mb-2" />
          <span className="text-[10px] font-black uppercase tracking-widest">ONLYDJSS</span>
          <img 
            src={fallbackUrl}
            alt="Fallback"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      {isSearching && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
          <RefreshCw className="animate-spin text-black/40" size={24} />
        </div>
      )}
    </div>
  );
};

export const MagazineAutoNewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLatestEDMNews();
      const filtered = data.articles.filter(a => 
        a.source === 'We Rave You' || 
        a.source === "Spinnin' Records" ||
        ['Industry', 'Releases', 'Exclusive', 'Label News'].includes(a.category)
      );
      const finalArticles = filtered.length > 0 ? filtered : data.articles;
      setNews(finalArticles);
      
      // Cache
      localStorage.setItem('magazine_news_cache', JSON.stringify(finalArticles));
      localStorage.setItem('magazine_news_last_sync', Date.now().toString());
    } catch (error) {
      console.error("Magazine fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageFound = (articleId: string, imageUrl: string) => {
    setNews(prev => {
      const updated = prev.map(art => art.id === articleId ? { ...art, image: imageUrl } : art);
      // Update cache as well
      localStorage.setItem('magazine_news_cache', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const cached = localStorage.getItem('magazine_news_cache');
    const lastSync = localStorage.getItem('magazine_news_last_sync');

    if (cached && lastSync && (Date.now() - parseInt(lastSync) < 30 * 60 * 1000)) {
      setNews(JSON.parse(cached));
    } else {
      fetchNews();
    }

    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {news.map((article, i) => (
        <motion.div 
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group"
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
            <div className="aspect-[3/2] overflow-hidden mb-6 bg-gray-100 border border-black/5">
              <ProxiedImage 
                src={article.image} 
                alt={article.title} 
                onImageFound={(url) => handleImageFound(article.id, url)}
              />
            </div>
            <div className="flex flex-col h-[calc(100%-12rem)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-black/40 uppercase tracking-widest bg-black/5 px-2 py-0.5">
                  {article.category}
                </span>
                <span className="text-[10px] font-black text-black/60 uppercase tracking-widest">
                  {article.source}
                </span>
              </div>
              <h4 className="text-lg font-black leading-tight uppercase mb-4 group-hover:underline underline-offset-4 line-clamp-3 text-black">
                {article.title}
              </h4>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[10px] font-bold text-black/30 uppercase">{article.date}</span>
                <ExternalLink size={14} className="text-black/20 group-hover:text-black transition-colors" />
              </div>
            </div>
          </a>
        </motion.div>
      ))}
      {isLoading && news.length === 0 && (
        <div className="col-span-full flex justify-center py-20">
          <RefreshCw className="animate-spin text-black/20" size={40} />
        </div>
      )}
    </div>
  );
};
