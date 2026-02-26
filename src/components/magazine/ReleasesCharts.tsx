import React from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp, ArrowRight } from 'lucide-react';
import { Track } from '../types';

interface ReleasesChartsProps {
  tracks: Track[];
}

export const ReleasesCharts: React.FC<ReleasesChartsProps> = ({ tracks }) => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* RELEASES */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-white" />
            <span className="text-xs font-heading tracking-[0.5em] uppercase">NEW RELEASES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.slice(0, 4).map((track, i) => (
              <motion.div 
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-6 bg-white/5 p-6 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                  <img src={track.image} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={32} fill="white" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-black text-text-interactive tracking-widest uppercase mb-2">OUT NOW</span>
                  <h4 className="text-lg font-black leading-tight uppercase mb-1">{track.title}</h4>
                  <p className="text-sm text-text-secondary uppercase tracking-widest mb-4">{track.artist}</p>
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-40">{track.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CHARTS */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-white" />
            <span className="text-xs font-heading tracking-[0.5em] uppercase">MONTHLY TOP 10</span>
          </div>

          <div className="bg-white text-black p-8">
            <div className="space-y-6">
              {tracks.map((track, i) => (
                <div key={track.id} className="flex items-center gap-6 group cursor-pointer border-b border-black/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-4xl font-black tracking-tighter italic opacity-20 group-hover:opacity-100 transition-opacity">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                  <div className="flex-grow">
                    <h5 className="text-sm font-black leading-tight uppercase group-hover:translate-x-2 transition-transform">{track.title}</h5>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{track.artist}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <TrendingUp size={14} className={track.trend === 'up' ? 'text-green-600' : track.trend === 'down' ? 'text-red-600' : 'text-gray-400'} />
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-1">{track.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-12 text-[10px] font-black tracking-[0.4em] py-4 border-t-2 border-black hover:bg-black hover:text-white transition-all uppercase">
              VIEW FULL CHARTS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
