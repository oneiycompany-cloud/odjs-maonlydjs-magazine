import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import { NewsArticle } from '../types';

interface EDMNewsSectionProps {
  news: NewsArticle[];
}

export const EDMNewsSection: React.FC<EDMNewsSectionProps> = ({ news }) => {
  // Filter for EDM NEWS category or just take the latest if none categorized specifically
  const edmArticles = news.filter(a => a.category === 'EDM NEWS').slice(0, 6);
  const displayArticles = edmArticles.length > 0 ? edmArticles : news.slice(0, 6);

  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-4 border-black pb-8">
          <div>
            <span className="bg-[#FFFF00] text-black text-[10px] font-black px-3 py-1.5 tracking-[0.3em] uppercase mb-4 inline-block border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
              LATEST UPDATES
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              EDM.COM <br /> NEWSROOM
            </h2>
          </div>
          <p className="text-lg font-bold max-w-md opacity-60 leading-tight">
            DIRECT FEED FROM THE GLOBAL ELECTRONIC MUSIC AUTHORITY. REAL-TIME COVERAGE OF FESTIVALS, RELEASES, AND INDUSTRY SHIFTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayArticles.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full border-2 border-black bg-white hover:bg-[#FFFF00] transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden border-b-2 border-black relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-[9px] font-black px-2 py-1 tracking-widest uppercase">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-black opacity-40">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.timeAgo}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-4 leading-tight uppercase group-hover:text-black transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm font-bold opacity-60 mb-8 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/10 group-hover:border-black/20">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase">READ FULL STORY</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a 
            href="https://edm.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white font-black text-sm px-12 py-5 border-2 border-black shadow-[8px_8px_0px_0px_#FFFF00] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#FFFF00] transition-all uppercase tracking-[0.2em]"
          >
            EXPLORE EDM.COM
          </a>
        </div>
      </div>
    </section>
  );
};
