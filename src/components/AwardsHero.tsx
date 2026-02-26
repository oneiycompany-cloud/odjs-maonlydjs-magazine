import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, ArrowRight, Trophy } from 'lucide-react';

export const AwardsHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1578416062787-db0555369c70?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="ONLYDJS Awards Trophy" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Glassmorphism Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#D4AF37] text-black text-[10px] font-black px-4 py-2 tracking-[0.4em] uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                GLOBAL ANNOUNCEMENT
              </span>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
            </div>

            <h1 className="text-7xl md:text-[12rem] font-black text-white leading-[0.8] tracking-tighter uppercase mb-12">
              ONLY DJS<br />
              <span className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">AWARDS</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-12 mb-16">
              <div className="flex items-center gap-6">
                <div className="w-20 h-[2px] bg-[#D4AF37]" />
                <p className="text-xl font-bold text-white/80 uppercase tracking-widest max-w-xs leading-tight">
                  CELEBRATING THE PINNACLE OF ELECTRONIC MUSIC EXCELLENCE
                </p>
              </div>
              
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="bg-[#D4AF37] p-3 rounded-full">
                  <Trophy size={24} className="text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">VOTING STATUS</p>
                  <p className="text-lg font-black text-white uppercase">OFFICIALLY OPEN</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#D4AF37] text-black font-black text-sm px-12 py-6 border-2 border-[#D4AF37] shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(212,175,55,0.4)] transition-all uppercase tracking-[0.2em] flex items-center gap-3"
              >
                CAST YOUR VOTE <ArrowRight size={18} />
              </motion.button>
              
              <motion.button 
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="border-2 border-white/20 text-white font-black text-sm px-12 py-6 backdrop-blur-sm transition-all uppercase tracking-[0.2em]"
              >
                VIEW NOMINEES
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="border-l-2 border-[#D4AF37] pl-8"
          >
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-4">MAGAZINE EXCLUSIVE</p>
            <h3 className="text-3xl font-black text-white uppercase leading-none mb-6">
              THE FUTURE OF THE INDUSTRY IS IN YOUR HANDS.
            </h3>
            <p className="text-sm font-bold text-white/40 uppercase leading-relaxed">
              JOIN MILLIONS OF FANS WORLDWIDE IN RECOGNIZING THE ARTISTS WHO DEFINED THE SOUND OF 2026.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Magazine Detail Elements */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 vertical-text hidden xl:block">
        <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[1em] opacity-30">
          ONLYDJS GLOBAL AWARDS • EDITION 2026 • ONLYDJS GLOBAL AWARDS • EDITION 2026
        </span>
      </div>
    </section>
  );
};
