import { 
  Trophy, 
  TrendingUp, 
  Music, 
  Radio, 
  Users, 
  Award, 
  Search, 
  Menu, 
  Play, 
  SkipForward, 
  SkipBack, 
  Volume2,
  Upload,
  CheckCircle2,
  Globe,
  Star,
  Zap
} from 'lucide-react';

export interface DJ {
  id: string;
  name: string;
  rank: number;
  previousRank: number;
  image: string;
  verified: boolean;
  genre: string;
  country: string;
  followers: number;
  awards: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  label: string;
  image: string;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Label {
  id: string;
  name: string;
  image: string;
  rosterCount: number;
  verified: boolean;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'News' | 'Interviews' | 'Releases' | 'Events' | 'Tech' | 'Charts' | 'Exclusive' | 'Industry' | 'PREMIERE' | 'AWARDS' | 'EDM NEWS' | 'Label News';
  date: string;
  timeAgo: string;
  image: string;
  imageCredit?: string;
  excerpt: string;
  content?: string;
  author?: Author;
  url?: string;
  source?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface LiveUpdate {
  id: string;
  message: string;
  timestamp: string;
  type: 'CHART' | 'UPLOAD' | 'AWARD' | 'LABEL';
}

export interface TickerItem {
  id: string;
  category: 'CHARTS' | 'NEWS' | 'AWARDS' | 'RADIO' | 'PREMIERE' | 'LABEL';
  headline: string;
  timestamp: string;
}

export const MOCK_TICKER_ITEMS: TickerItem[] = [
  { id: 't1', category: 'CHARTS', headline: 'AMELIE LENS REACHES #1 GLOBAL TECHNO CHART', timestamp: 'JUST NOW' },
  { id: 't2', category: 'AWARDS', headline: 'ONLYDJS DJ AWARDS VOTING OFFICIALLY LIVE', timestamp: '2 MIN AGO' },
  { id: 't3', category: 'RADIO', headline: 'LENSKE RADIO EPISODE 402 PREMIERES TODAY', timestamp: '5 MIN AGO' },
  { id: 't4', category: 'NEWS', headline: 'NEW UNDERGROUND TECHNO ARTIST TRENDING GLOBALLY', timestamp: '12 MIN AGO' },
  { id: 't5', category: 'PREMIERE', headline: 'EXCLUSIVE: CHARLOTTE DE WITTE DROPS NEW KNTXT EP', timestamp: '20 MIN AGO' },
  { id: 't6', category: 'CHARTS', headline: 'PEGGY GOU CLIMBS 15 POSITIONS IN HOUSE RANKINGS', timestamp: '30 MIN AGO' },
  { id: 't7', category: 'NEWS', headline: 'TOMORROWLAND 2026 LINEUP LEAKED ONLINE', timestamp: '45 MIN AGO' },
  { id: 't8', category: 'LABEL', headline: 'DRUMCODE ANNOUNCES WORLDWIDE TALENT SEARCH', timestamp: '1 HOUR AGO' },
  { id: 't9', category: 'CHARTS', headline: 'AFTERLIFE RECORDS DOMINATES TOP 10 MELODIC TECHNO', timestamp: '1 HOUR AGO' },
  { id: 't10', category: 'AWARDS', headline: 'KORE NOMINATED FOR RISING STAR 2026', timestamp: '2 HOURS AGO' },
];

export const MOCK_DJS: DJ[] = [
  {
    id: '1',
    name: 'AMELIE LENS',
    rank: 1,
    previousRank: 2,
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=800&h=800',
    verified: true,
    genre: 'Techno',
    country: 'Belgium',
    followers: 2400000,
    awards: ['DJ of the Year 2025', 'Best Techno Artist']
  },
  {
    id: '2',
    name: 'CHARLOTTE DE WITTE',
    rank: 2,
    previousRank: 1,
    image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=800&h=800',
    verified: true,
    genre: 'Techno',
    country: 'Belgium',
    followers: 3100000,
    awards: ['Global Icon 2024']
  },
  {
    id: '3',
    name: 'BORIS BREJCHA',
    rank: 3,
    previousRank: 3,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800&h=800',
    verified: true,
    genre: 'High-Tech Minimal',
    country: 'Germany',
    followers: 1800000,
    awards: ['Innovation Award']
  },
  {
    id: '4',
    name: 'PEGGY GOU',
    rank: 4,
    previousRank: 6,
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800&h=800',
    verified: true,
    genre: 'House',
    country: 'South Korea',
    followers: 4200000,
    awards: ['Style Icon 2025']
  }
];

export const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'CYBERPUNK RHYTHM',
    artist: 'Amelie Lens',
    label: 'Lenske',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=400',
    rank: 1,
    trend: 'up'
  },
  {
    id: 't2',
    title: 'NEON DREAMS',
    artist: 'Boris Brejcha',
    label: 'Fckng Serious',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400',
    rank: 2,
    trend: 'stable'
  },
  {
    id: 't3',
    title: 'ACID RAIN',
    artist: 'Charlotte de Witte',
    label: 'KNTXT',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=400&h=400',
    rank: 3,
    trend: 'down'
  }
];

export const MOCK_LABELS: Label[] = [
  { id: 'l1', name: 'LENSKE', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400&h=400', rosterCount: 12, verified: true },
  { id: 'l2', name: 'KNTXT', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400&h=400', rosterCount: 8, verified: true },
  { id: 'l3', name: 'DRUMCODE', image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=400&h=400', rosterCount: 45, verified: true },
  { id: 'l4', name: 'AFTERLIFE', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400&h=400', rosterCount: 22, verified: true }
];

export const MOCK_LIVE_UPDATES: LiveUpdate[] = [
  { id: 'u1', message: 'AMELIE LENS rises to #1 on ONLYDJS Global Techno Chart', timestamp: 'Just now', type: 'CHART' },
  { id: 'u2', message: 'KNTXT Records announces new "Acid Rain" compilation', timestamp: '5 mins ago', type: 'LABEL' },
  { id: 'u3', message: 'New Track Upload: "Neon Pulse" by Cyberpunk (Lenske)', timestamp: '12 mins ago', type: 'UPLOAD' },
  { id: 'u4', message: 'Charlotte de Witte nominated for DJ of the Year 2026', timestamp: '1 hour ago', type: 'AWARD' },
  { id: 'u5', message: 'Afterlife enters Top 5 Trending Labels ranking', timestamp: '2 hours ago', type: 'CHART' },
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'TOMORROWLAND 2026: THE FUTURE OF EDM REVEALED',
    category: 'INDUSTRY',
    date: 'FEB 24, 2026',
    timeAgo: '12 minutes ago',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200&h=600',
    excerpt: 'The world\'s biggest festival announces revolutionary stage designs and a carbon-neutral lineup for the next decade.',
    isTrending: true
  },
  {
    id: 'n2',
    title: 'AMELIE LENS ANNOUNCES GLOBAL TOUR',
    category: 'NEWS',
    date: 'FEB 23, 2026',
    timeAgo: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1200&h=600',
    excerpt: 'The techno queen is set to visit 40 cities across 5 continents in her most ambitious production yet.',
    isTrending: true
  },
  {
    id: 'n3',
    title: 'EXCLUSIVE: PEGGY GOU PREMIERES NEW SINGLE',
    category: 'PREMIERE',
    date: 'FEB 24, 2026',
    timeAgo: 'Just now',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800&h=400',
    excerpt: 'The South Korean icon drops her most experimental track to date, blending traditional sounds with futuristic house.',
    isTrending: false
  },
  {
    id: 'n4',
    title: 'DRUMCODE REVEALS ADE 2026 LINEUP',
    category: 'INDUSTRY',
    date: 'FEB 24, 2026',
    timeAgo: '45 minutes ago',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800&h=400',
    excerpt: 'Adam Beyer brings the heavyweights to Amsterdam for a 12-hour showcase at Gashouder.',
    isTrending: false
  }
];
