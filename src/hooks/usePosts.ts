import { useState, useEffect } from 'react';
import { Post } from '../types';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80'
];

const MOCK_CONTENT = [
  'HAHAHA so fucking bullish lmao',
  'wen moon ser?',
  'LFG!!! 🚀🚀🚀',
  'WAGMI frens',
  'Probably nothing...',
  'gm',
  'Who\'s still holding? 💎🙌',
  'First time?',
  'Buy the dip!'
];

const MOCK_SYMBOLS = ['$YES', '$PEPE', '$DOGE', '$SHIB', '$WOJAK', '$CHAD'];

function generatePost(id: string): Post {
  return {
    id,
    symbol: MOCK_SYMBOLS[Math.floor(Math.random() * MOCK_SYMBOLS.length)],
    content: MOCK_CONTENT[Math.floor(Math.random() * MOCK_CONTENT.length)],
    price: Number((Math.random() * 0.1).toFixed(3)),
    percentageChange: Number((Math.random() * 200 - 100).toFixed(1)),
    marketCap: Number((Math.random() * 10).toFixed(1)),
    image: Math.random() > 0.5 ? MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)] : undefined
  };
}

const INITIAL_POSTS = Array.from({ length: 10 }, (_, i) => generatePost(`initial-${i}`));

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Add new posts periodically
    const interval = setInterval(() => {
      setPosts(currentPosts => {
        const newPost = generatePost(`post-${Date.now()}`);
        return [newPost, ...currentPosts.slice(0, 49)]; // Keep maximum 50 posts
      });
    }, 20000); // Add new post every 3 seconds

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(interval);
    };
  }, []);

  return { posts, loading };
}