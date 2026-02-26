import { NewsArticle, Author } from './types';

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'a1',
    name: 'MARCUS VANCE',
    role: 'Editor-in-Chief',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: 'a2',
    name: 'ELENA ROSSI',
    role: 'Senior Tech Editor',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  },
  {
    id: 'a3',
    name: 'JULIAN CHASE',
    role: 'Culture Correspondent',
    avatar: 'https://picsum.photos/seed/julian/100/100'
  }
];

export const MAGAZINE_ARTICLES: NewsArticle[] = [
  {
    id: 'm1',
    slug: 'future-of-techno-2026',
    title: 'THE FUTURE OF TECHNO: BEYOND THE WAREHOUSE',
    category: 'Exclusive',
    date: 'FEB 25, 2026',
    timeAgo: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=1920&h=1080',
    imageCredit: 'Photo by Lenske Media',
    excerpt: 'As we move into 2026, the techno landscape is undergoing its most significant transformation since the early 90s. We explore the intersection of AI-driven production and raw industrial aesthetics.',
    author: MOCK_AUTHORS[0],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'm2',
    slug: 'interview-amelie-lens',
    title: 'AMELIE LENS: ARCHITECTING THE SONIC VOID',
    category: 'Interviews',
    date: 'FEB 24, 2026',
    timeAgo: '1 day ago',
    image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=1200&h=800',
    imageCredit: 'Photo by KNTXT Press',
    excerpt: 'In an exclusive sit-down, the Lenske founder discusses her new creative direction and the pressure of maintaining a global empire.',
    author: MOCK_AUTHORS[1],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'm3',
    slug: 'tech-review-modular-future',
    title: 'MODULAR SYNTHESIS IN THE AGE OF QUANTUM COMPUTING',
    category: 'Tech',
    date: 'FEB 23, 2026',
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=1200&h=800',
    imageCredit: 'Photo by TechPulse',
    excerpt: 'How the next generation of hardware is bridging the gap between analog warmth and digital precision.',
    author: MOCK_AUTHORS[2],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'm4',
    slug: 'release-radar-march-2026',
    title: 'RELEASE RADAR: THE ESSENTIAL TRACKS FOR MARCH',
    category: 'Releases',
    date: 'FEB 25, 2026',
    timeAgo: 'Just now',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200&h=800',
    imageCredit: 'Photo by VinylHub',
    excerpt: 'From deep melodic journeys to peak-time weapons, these are the records that will define the coming month.',
    author: MOCK_AUTHORS[0],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'm5',
    slug: 'events-ibiza-opening-2026',
    title: 'IBIZA 2026: THE OPENING PARTIES GUIDE',
    category: 'Events',
    date: 'FEB 22, 2026',
    timeAgo: '3 days ago',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200&h=800',
    imageCredit: 'Photo by Pacha Media',
    excerpt: 'The White Isle prepares for its biggest season yet. We break down the must-attend events and new venue debuts.',
    author: MOCK_AUTHORS[1],
    isFeatured: false,
    isTrending: true
  }
];
