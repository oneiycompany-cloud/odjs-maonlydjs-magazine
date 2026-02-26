import React from 'react';
import { BrandLogo } from '../Logo';
import { Instagram, Twitter, Youtube, Mail, ArrowUpRight } from 'lucide-react';

export const MagazineFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-32 pb-12 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-4">
            <BrandLogo size="lg" light={true} />
            <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-sm italic">
              "OnlyDJS Magazine is a global electronic music editorial platform delivering the latest news, exclusive interviews, in-depth reviews, artist features, music technology insights and dance culture coverage from around the world."
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase mb-8 opacity-40">SECTIONS</h4>
            <ul className="space-y-4">
              {['NEWS', 'INTERVIEWS', 'RELEASES', 'EVENTS', 'TECH', 'CHARTS'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs font-black tracking-widest uppercase hover:text-text-interactive transition-colors flex items-center gap-2">
                    {link} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase mb-8 opacity-40">COMPANY</h4>
            <ul className="space-y-4">
              {['ABOUT US', 'EDITORIAL MISSION', 'CONTACT', 'ADVERTISE', 'CAREERS'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs font-black tracking-widest uppercase hover:text-text-interactive transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase mb-8 opacity-40">NEWSLETTER</h4>
            <p className="text-sm text-text-secondary mb-8">GET THE LATEST EDITORIALS DELIVERED TO YOUR INBOX WEEKLY.</p>
            <div className="flex border-b border-white/20 pb-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none text-xs font-black tracking-widest w-full placeholder:text-white/20"
              />
              <button className="text-xs font-black tracking-widest uppercase hover:text-text-interactive transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-text-interactive transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-text-interactive transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-text-interactive transition-colors"><Youtube size={20} /></a>
            <a href="#" className="hover:text-text-interactive transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black tracking-widest uppercase opacity-40">
            <span>© 2026 ONLYDJS MAGAZINE</span>
            <a href="#" className="hover:opacity-100">PRIVACY POLICY</a>
            <a href="#" className="hover:opacity-100">TERMS OF SERVICE</a>
            <a href="#" className="hover:opacity-100">COOKIE POLICY</a>
            <a href="#" className="hover:opacity-100">MEDIA KIT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
