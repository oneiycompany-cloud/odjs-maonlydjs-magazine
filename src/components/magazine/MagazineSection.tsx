import React from 'react';
import { motion } from 'motion/react';
import { MagazineAutoNewsFeed } from './MagazineAutoNewsFeed';

export const MagazineSection: React.FC = () => {
  return (
    <section id="onlydjss-magazine" className="relative bg-white text-black overflow-hidden border-t border-black/10">
      {/* STEP 2 — Magazine Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-[140px] pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="text-sm font-black tracking-[0.6em] uppercase mb-6 text-black/30">ONLYDJSS MAGAZINE</h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-black">
            Latest Electronic <br /> Music News
          </p>
          <div className="mt-12 h-[2px] w-24 bg-black mx-auto" />
        </motion.div>

        {/* STEP 3 & 4 — Auto News System & Grid */}
        <MagazineAutoNewsFeed />
      </div>
    </section>
  );
};
