import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface InterviewsSectionProps {
  articles: NewsArticle[];
}

export const InterviewsSection: React.FC<InterviewsSectionProps> = ({ articles }) => {
  return (
    <section className="py-32 bg-white text-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-black" />
              <span className="text-xs font-black tracking-[0.5em] uppercase">THE INTERVIEWS</span>
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase">
              DEEP<br />FOCUS
            </h2>
          </div>
          <p className="text-xl font-bold max-w-md leading-tight uppercase italic tracking-tighter opacity-60">
            EXCLUSIVE CONVERSATIONS WITH THE ARCHITECTS OF MODERN ELECTRONIC MUSIC CULTURE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative bg-white p-12 lg:p-20 border border-black/5 flex flex-col justify-between min-h-[600px] cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              </div>

              <div className="relative z-10">
                <span className="inline-block border-2 border-black group-hover:border-white px-4 py-1 text-xs font-black tracking-widest uppercase mb-8 group-hover:text-white transition-colors">
                  {article.category}
                </span>
                <h3 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8 group-hover:text-white transition-colors">
                  {article.title}
                </h3>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div className="group-hover:text-white transition-colors">
                  <p className="text-xs font-black tracking-widest uppercase mb-2">FEATURING</p>
                  <p className="text-2xl font-black tracking-tighter uppercase italic">{article.title.split(':')[0]}</p>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-black group-hover:border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
