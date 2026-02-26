import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { NewsArticle } from '../types';

interface FeaturedStoryProps {
  article: NewsArticle;
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({ article }) => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-[2px] w-12 bg-white" />
        <span className="text-xs font-heading tracking-[0.5em] uppercase">FEATURED STORY</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
        >
          <div className="aspect-[16/9] lg:aspect-[4/5] overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
            />
          </div>
          {article.imageCredit && (
            <span className="absolute bottom-4 right-4 text-[8px] font-heading tracking-widest text-white/40 uppercase">
              {article.imageCredit}
            </span>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1.5 tracking-widest uppercase">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-[10px] text-text-secondary tracking-widest uppercase">
              <Calendar size={12} />
              {article.date}
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] tracking-tighter uppercase mb-8 group-hover:text-text-interactive transition-colors">
            {article.title}
          </h2>

          <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-xl">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 mb-12 border-l-2 border-white/20 pl-6">
            {article.author && (
              <>
                <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full grayscale" />
                <div>
                  <p className="text-xs font-black tracking-widest uppercase">{article.author.name}</p>
                  <p className="text-[10px] text-text-secondary tracking-widest uppercase">{article.author.role}</p>
                </div>
              </>
            )}
          </div>

          <button className="group flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase hover:gap-6 transition-all">
            READ FULL FEATURE <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
