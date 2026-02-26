import React, { useEffect, useState } from 'react';
import { TickerItem, MOCK_TICKER_ITEMS, NewsArticle } from '../types';

interface NewsTickerProps {
  news?: NewsArticle[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  const [items, setItems] = useState<TickerItem[]>(MOCK_TICKER_ITEMS);

  // Sync news to ticker items
  useEffect(() => {
    if (news && news.length > 0) {
      const newsItems: TickerItem[] = news.map(art => ({
        id: art.id,
        category: art.category === 'EDM NEWS' ? 'NEWS' : art.category as any,
        headline: art.title,
        timestamp: art.timeAgo
      }));
      setItems(prev => [...newsItems, ...prev].slice(0, 20));
    }
  }, [news]);

  // Simulate auto-updating logic for platform activity
  useEffect(() => {
    const interval = setInterval(() => {
      const categories: TickerItem['category'][] = ['CHARTS', 'NEWS', 'AWARDS', 'RADIO', 'PREMIERE', 'LABEL'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const newItem: TickerItem = {
        id: Date.now().toString(),
        category: randomCategory,
        headline: `PLATFORM UPDATE: NEW ${randomCategory} ACTIVITY DETECTED ON ONLYDJS`,
        timestamp: 'JUST NOW'
      };

      setItems(prev => [newItem, ...prev.slice(0, 19)]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border-y border-white/10 py-2 overflow-hidden relative z-50">
      <div className="flex items-center">
        {/* Fixed LIVE Indicator */}
        <div className="bg-red-600 text-white px-3 py-1 flex items-center gap-2 z-10 relative shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase">LIVE</span>
        </div>

        {/* Scrolling Content */}
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex items-center gap-4 mx-8 group cursor-default">
              <span className="text-[10px] font-black text-[#FFFF00] tracking-widest">
                [{item.category}]
              </span>
              <span className="text-[11px] font-bold text-white uppercase tracking-tight group-hover:text-[#FFFF00] transition-colors">
                {item.headline}
              </span>
              <span className="text-[9px] font-medium text-white/40 tracking-widest">
                {item.timestamp}
              </span>
              <span className="text-white/20 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
