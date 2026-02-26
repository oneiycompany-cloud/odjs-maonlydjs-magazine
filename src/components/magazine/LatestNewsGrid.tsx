import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { NewsArticle } from '../types';

interface LatestNewsGridProps {
  articles: NewsArticle[];
}

export const LatestNewsGrid: React.FC<LatestNewsGridProps> = ({ articles }) => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-white" />
          <span className="text-xs font-heading tracking-[0.5em] uppercase">LATEST NEWS</span>
        </div>
        <button className="text-[10px] font-black tracking-[0.3em] uppercase hover:opacity-60 transition-opacity flex items-center gap-2">
          VIEW ALL NEWS <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.map((article, i) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/2] overflow-hidden mb-6 relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 tracking-widest uppercase border border-white/10">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] text-text-secondary tracking-widest uppercase flex items-center gap-2">
                <Calendar size={12} />
                {article.date}
              </span>
              {article.isTrending && (
                <span className="text-[9px] font-black text-red-500 tracking-widest uppercase animate-pulse">
                  TRENDING
                </span>
              )}
            </div>

            <h3 className="text-2xl font-heading leading-tight uppercase mb-4 group-hover:text-text-interactive transition-colors">
              {article.title}
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] font-black tracking-widest uppercase opacity-40">
                BY {article.author?.name || 'STAFF'}
              </span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
