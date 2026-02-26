import React from 'react';
import { 
  Search, 
  Menu, 
  Upload, 
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Radio,
  Music,
  Trophy,
  Users,
  Award,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './Logo';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" light={true} />
            <div className="hidden md:block">
              <h1 className="text-sm leading-none font-heading tracking-tighter">ONLY DJS</h1>
              <p className="text-[10px] tracking-[0.2em] opacity-50">MAGAZINE</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            {['NEWS', 'INTERVIEWS', 'RELEASES', 'EVENTS', 'TECH', 'CHARTS'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black tracking-widest hover:text-text-interactive transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-xs font-black tracking-widest hover:text-text-interactive">
            <Search size={16} />
            SEARCH
          </button>
          <button className="btn-primary flex items-center gap-2 text-[10px] font-black tracking-widest">
            <Upload size={14} />
            UPLOAD
          </button>
          <button className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export const RadioPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/10 h-24 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-1/3">
          <img src="https://picsum.photos/seed/nowplaying/100/100" alt="Now Playing" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-sm" />
          <div className="overflow-hidden">
            <h4 className="text-xs md:text-sm font-heading truncate">CYBERPUNK RHYTHM</h4>
            <p className="text-[10px] md:text-xs text-text-secondary truncate">AMELIE LENS — LENSKE RADIO #402</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button className="opacity-50 hover:opacity-100"><SkipBack size={20} /></button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
              <Play size={20} fill="currentColor" />
            </button>
            <button className="opacity-50 hover:opacity-100"><SkipForward size={20} /></button>
          </div>
          <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white" 
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-red-500 animate-pulse" />
            <span className="text-[10px] font-heading tracking-widest">LIVE NOW</span>
          </div>
          <div className="flex items-center gap-2 w-32">
            <Volume2 size={16} />
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div className="w-2/3 h-full bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex items-center gap-6 mb-8">
    <div className="flex flex-col">
      <h2 className="text-2xl md:text-4xl font-heading whitespace-nowrap">{title}</h2>
      {subtitle && <p className="text-[10px] tracking-[0.3em] text-text-secondary uppercase">{subtitle}</p>}
    </div>
    <div className="flex-1 h-2 bg-white" />
  </div>
);
