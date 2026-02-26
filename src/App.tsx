/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Music, 
  Radio, 
  Users, 
  Award, 
  Play, 
  Upload,
  Globe, 
  Star, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Share2
} from 'lucide-react';
import { Navbar, RadioPlayer, SectionHeader } from './components/Layout';
import { BrandLogo } from './components/Logo';
import { NewsTicker } from './components/NewsTicker';
import { AwardsHero } from './components/AwardsHero';
import { FeaturedStory } from './components/magazine/FeaturedStory';
import { LatestNewsGrid } from './components/magazine/LatestNewsGrid';
import { InterviewsSection } from './components/magazine/InterviewsSection';
import { ReleasesCharts } from './components/magazine/ReleasesCharts';
import { MagazineFooter } from './components/magazine/MagazineFooter';
import { MOCK_DJS, MOCK_TRACKS, MOCK_LABELS, MOCK_NEWS, MOCK_LIVE_UPDATES, DJ, Track, LiveUpdate, NewsArticle } from './types';
import { MAGAZINE_ARTICLES } from './mockMagazineData';
import { fetchLatestEDMNews } from './services/newsAgent';
import { fetchBeatportCharts } from './services/chartAgent';

const DJCard = ({ dj }: { dj: DJ }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative aspect-[3/4] overflow-hidden bg-bg-surface"
  >
    <img src={dj.image} alt={dj.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
    
    <div className="absolute top-4 left-4 flex flex-col gap-1">
      <span className="chart-number">0{dj.rank}</span>
    </div>

    <div className="absolute bottom-6 left-6 right-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-heading leading-none">{dj.name}</h3>
        {dj.verified && <CheckCircle2 size={14} className="text-blue-500" />}
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-text-secondary tracking-widest uppercase">{dj.genre}</span>
          <span className="text-[10px] text-text-secondary tracking-widest uppercase">{dj.country}</span>
        </div>
        <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

const LiveNewsFeed = ({ news, updates, onRefresh, isLoading }: { 
  news: NewsArticle[], 
  updates: LiveUpdate[], 
  onRefresh: () => void,
  isLoading: boolean 
}) => {
  const topStory = news[0] || MOCK_NEWS[0];
  const latestNews = news.length > 1 ? news.slice(1) : MOCK_NEWS.slice(1);
  const trendingNow = news.filter(n => n.isTrending);

  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <SectionHeader title="LIVE NEWS FEED" subtitle="EDM INDUSTRY 24/7" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-[10px] font-heading tracking-widest opacity-70">
              {isLoading ? 'AGENT SEARCHING...' : 'AGENT ACTIVE'}
            </span>
          </div>
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="btn-secondary py-2 px-4 flex items-center gap-2 disabled:opacity-50"
          >
            <Zap size={14} className={isLoading ? 'animate-spin' : ''} />
            SYNC LATEST
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 1. TOP STORY */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[21/9] overflow-hidden mb-8">
              <img 
                src={topStory.image} 
                alt={topStory.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white text-black text-[10px] font-heading px-3 py-1.5 tracking-widest">
                  TOP STORY
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-heading tracking-widest text-white border border-white/20 px-2 py-1">
                {topStory.category}
              </span>
              <span className="text-[10px] text-text-secondary tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {topStory.timeAgo}
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-heading mb-6 leading-tight group-hover:text-text-interactive transition-colors">
              {topStory.title}
            </h3>
            <p className="text-lg text-text-secondary max-w-3xl mb-8 leading-relaxed">
              {topStory.excerpt}
            </p>
            <button className="text-xs font-heading tracking-[0.3em] flex items-center gap-3 group-hover:gap-5 transition-all">
              READ FULL STORY <ArrowRight size={16} />
            </button>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            {latestNews.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="aspect-video overflow-hidden mb-6">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-heading tracking-widest opacity-50">{article.category}</span>
                  <span className="text-[10px] text-text-secondary tracking-widest">{article.timeAgo}</span>
                </div>
                <h4 className="text-xl font-heading mb-4 group-hover:text-text-interactive transition-colors leading-tight">
                  {article.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* SIDEBAR: LATEST NEWS, TRENDING, LIVE UPDATES */}
        <div className="lg:col-span-4 space-y-16">
          {/* 2. LATEST NEWS COLUMN */}
          <div className="bg-white/5 p-8 border border-white/10">
            <h4 className="font-heading text-xs tracking-widest mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LATEST NEWSROOM
            </h4>
            <div className="space-y-8">
              {(news.length > 0 ? news : MOCK_NEWS).map((article) => (
                <div key={article.id} className="group cursor-pointer border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-heading tracking-widest text-text-secondary">{article.category}</span>
                    <span className="text-[9px] text-text-secondary">{article.timeAgo}</span>
                  </div>
                  <h5 className="text-sm font-heading leading-snug group-hover:text-text-interactive transition-colors">
                    {article.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          {/* 3. TRENDING NOW */}
          <div>
            <h4 className="font-heading text-xs tracking-widest mb-8 flex items-center gap-2">
              <TrendingUp size={16} />
              TRENDING NOW
            </h4>
            <div className="space-y-6">
              {(trendingNow.length > 0 ? trendingNow : MOCK_NEWS.filter(n => n.isTrending)).map((article, i) => (
                <div key={article.id} className="flex gap-4 group cursor-pointer">
                  <span className="chart-number text-2xl">0{i + 1}</span>
                  <div>
                    <h5 className="text-xs font-heading mb-1 group-hover:text-text-interactive transition-colors">{article.title}</h5>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest">{article.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. LIVE CHART UPDATES */}
          <div className="bg-white text-black p-8">
            <h4 className="font-heading text-xs tracking-widest mb-8 flex items-center gap-2">
              <Zap size={16} fill="black" />
              LIVE CHART UPDATES
            </h4>
            <div className="space-y-6">
              {(updates.length > 0 ? updates : MOCK_LIVE_UPDATES).map((update) => (
                <div key={update.id} className="flex flex-col gap-1 border-b border-black/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-heading tracking-widest opacity-50">{update.type}</span>
                    <span className="text-[8px] font-heading tracking-widest">{update.timestamp}</span>
                  </div>
                  <p className="text-[11px] font-heading leading-tight italic">
                    "{update.message}"
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 text-[10px] font-heading tracking-[0.3em] py-4 border-t border-black/10 hover:opacity-60 transition-opacity">
              FULL RANKINGS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AwardsSection = () => (
  <section className="bg-black py-32 overflow-hidden border-t-[10px] border-[#FFFF00]">
    {/* Marquee Header Strip */}
    <div className="bg-[#FFFF00] border-b-[3px] border-black py-6 overflow-hidden mb-24">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-black font-black text-3xl tracking-tighter mx-12 uppercase">
            ONLYDJS AWARDS 2026 • THE FUTURE OF EDM • ONLYDJS AWARDS 2026 • THE FUTURE OF EDM •
          </span>
        ))}
      </div>
    </div>

    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div className="relative">
          <div className="absolute -left-20 top-0 text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none">
            26
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black text-[#FFFF00] leading-[0.8] tracking-tighter uppercase mb-12 relative z-10">
            AWARDS<br />WATCH
          </h2>
          <div className="flex items-center gap-8 mb-12">
            <div className="h-[10px] w-40 bg-[#FFFF00]" />
            <span className="text-2xl font-black text-white tracking-widest uppercase">GLOBAL RECOGNITION</span>
          </div>
          <p className="text-3xl font-bold text-white/40 max-w-xl leading-none uppercase italic tracking-tighter">
            THE HIGHEST RECOGNITION IN THE GLOBAL ELECTRONIC MUSIC INDUSTRY.
          </p>
        </div>

        <div className="relative group">
          <div className="relative z-10 border-[8px] border-black shadow-[30px_30px_0px_0px_#FFFF00] overflow-hidden">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1578416062787-db0555369c70?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="ONLYDJS Award Trophy" 
              className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl p-10 border-t-[8px] border-black">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[12px] font-black tracking-[0.5em] text-[#FFFF00] uppercase">OFFICIAL TROPHY</span>
              </div>
              <h4 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">THE ONLYDJS GOLDEN DISC</h4>
            </div>
          </div>
          
          {/* Vertical Rail Text */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap">
            <span className="text-[10px] font-black tracking-[1em] text-white/20 uppercase">
              EXCELLENCE • INNOVATION • LEADERSHIP
            </span>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFFF00] -z-10 opacity-20 blur-3xl animate-pulse" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: 'DJ OF THE MONTH', winner: 'AMELIE LENS', icon: <Award size={64} />, category: 'PERFORMANCE' },
          { title: 'TRACK OF THE MONTH', winner: 'CYBERPUNK RHYTHM', icon: <Music size={64} />, category: 'PRODUCTION' },
          { title: 'RISING STAR', winner: 'KORE', icon: <Zap size={64} />, category: 'BREAKTHROUGH' }
        ].map((award, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: -4, y: -4 }}
            className="bg-[#1A1A1A] border-[3px] border-black p-8 flex flex-col items-start text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_#FFFF00] transition-all"
          >
            <div className="bg-[#FFFF00] text-black p-4 border-[3px] border-black mb-8 shadow-[4px_4px_0px_0px_#000000]">
              {award.icon}
            </div>
            <span className="text-[12px] font-black tracking-[0.2em] mb-2 text-[#FFFF00] uppercase">
              {award.category} • FEB 2026
            </span>
            <h3 className="text-3xl font-black mb-6 leading-none uppercase">{award.title}</h3>
            <div className="w-full h-[3px] bg-black mb-6" />
            <p className="text-4xl font-black text-[#FFFF00] tracking-tighter uppercase italic break-words w-full">
              {award.winner}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-12 bg-[#1A1A1A] border-[3px] border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-2xl">
          <h4 className="text-2xl font-black mb-4 uppercase text-[#FFFF00]">RECOGNIZING EXCELLENCE</h4>
          <p className="text-lg font-bold leading-relaxed opacity-80">
            THE ONLYDJS AWARDS RECOGNIZE EXCELLENCE IN ELECTRONIC MUSIC PRODUCTION, PERFORMANCE, AND INDUSTRY LEADERSHIP. VOTE NOW FOR YOUR FAVORITE ARTISTS.
          </p>
        </div>
        <button className="bg-[#FFFF00] text-black font-black text-lg px-12 py-6 border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000000] transition-all uppercase tracking-tighter">
          VIEW ALL NOMINEES
        </button>
      </div>
    </div>
  </section>
);

const LabelSection = () => (
  <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
    <SectionHeader title="LABEL HOUSE" subtitle="TRENDING RECORD LABELS" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {MOCK_LABELS.map((label) => (
        <div key={label.id} className="group cursor-pointer">
          <div className="aspect-square bg-bg-surface mb-4 overflow-hidden relative">
            <img src={label.image} alt={label.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading text-sm">{label.name}</h4>
                {label.verified && <CheckCircle2 size={12} className="text-blue-500" />}
              </div>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase">{label.rosterCount} ARTISTS</p>
            </div>
            <button className="text-[10px] font-heading tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              VIEW ROSTER
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('GLOBAL');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshNews = async () => {
    setIsLoading(true);
    try {
      const [newsData, chartData] = await Promise.all([
        fetchLatestEDMNews(),
        fetchBeatportCharts()
      ]);
      setNews(newsData.articles);
      setUpdates(newsData.updates);
      setTracks(chartData);
      
      // Cache results
      localStorage.setItem('onlydjs_news', JSON.stringify(newsData.articles));
      localStorage.setItem('onlydjs_updates', JSON.stringify(newsData.updates));
      localStorage.setItem('onlydjs_tracks', JSON.stringify(chartData));
      localStorage.setItem('onlydjs_last_sync', Date.now().toString());
    } catch (error) {
      console.error("Failed to sync news and charts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-update every 30 minutes
  useEffect(() => {
    // Try to load from cache first
    const cachedNews = localStorage.getItem('onlydjs_news');
    const cachedUpdates = localStorage.getItem('onlydjs_updates');
    const cachedTracks = localStorage.getItem('onlydjs_tracks');
    const lastSync = localStorage.getItem('onlydjs_last_sync');

    if (cachedNews && cachedUpdates && cachedTracks && lastSync) {
      setNews(JSON.parse(cachedNews));
      setUpdates(JSON.parse(cachedUpdates));
      setTracks(JSON.parse(cachedTracks));
      
      // If cache is older than 30 mins, refresh
      if (Date.now() - parseInt(lastSync) > 30 * 60 * 1000) {
        handleRefreshNews();
      }
    } else {
      handleRefreshNews(); // Initial fetch if no cache
    }

    const interval = setInterval(handleRefreshNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <NewsTicker news={news} />
      
      <main>
        <AwardsHero />
        
        {/* MAGAZINE SECTIONS */}
        <FeaturedStory article={MAGAZINE_ARTICLES[0]} />
        
        <LatestNewsGrid articles={MAGAZINE_ARTICLES.slice(1, 4)} />
        
        <InterviewsSection articles={MAGAZINE_ARTICLES.filter(a => a.category === 'Interviews')} />
        
        <ReleasesCharts tracks={tracks.length > 0 ? tracks : MOCK_TRACKS} />

        {/* Trending DJs Section - Kept as part of the ecosystem */}
        <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-white/10">
          <SectionHeader title="TRENDING DJs" subtitle="GLOBAL RANKINGS" />
          
          <div className="flex gap-8 mb-12 border-b border-white/10 overflow-x-auto no-scrollbar">
            {['GLOBAL', 'TECHNO', 'HOUSE', 'TRANCE', 'D&B'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] font-heading tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? 'text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {MOCK_DJS.map((dj) => (
              <div key={dj.id}>
                <DJCard dj={dj} />
              </div>
            ))}
          </div>
        </section>

        {/* Viral Loop CTA */}
        <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-bg-base to-bg-surface border-t border-white/10">
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="flex items-center justify-center mb-8">
                <BrandLogo size="lg" light={true} />
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-heading mb-8 leading-tight uppercase">
              READY TO ENTER<br />THE CHARTS?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 italic">
              Upload your latest track, earn achievement badges, and climb the global rankings. 
              Join the world's most elite electronic music ecosystem.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="btn-primary px-12 py-5 text-sm">UPLOAD YOUR TRACK</button>
              <button className="btn-secondary px-12 py-5 text-sm">CREATE DJ PROFILE</button>
            </div>
          </div>
        </section>
      </main>

      <MagazineFooter />
      <RadioPlayer />
    </div>
  );
}
