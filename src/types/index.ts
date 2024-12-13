export interface Post {
  id: string;
  symbol: string;
  content: string;
  price: number;
  percentageChange: number;
  marketCap: number;
  image?: string;
}

export type TabType = 'trending' | 'holding';

export interface TokenDetails {
  name: string;
  ticker: string;
  image: File | null;
  address: string;
}