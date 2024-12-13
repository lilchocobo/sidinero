import { Header } from '../components/Header';

const mockTokenPosts = [
  {
    message: "This is a post from the token.",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "This is a post from the token.",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "This is a post from the token.",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "This is a post from the token.",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    message: "HAHAHA so fucking bullish lmao",
    price: "$0.03",
    percentage: "119.4%",
    mcap: "2.8M MCAP",
  },
];

export function FeedPage() {
  return (
    <>
      <Header />
      <div className="mb-20 p-4">
        {mockTokenPosts.map((post, index) => (
          <TokenCard key={index} {...post} />
        ))}
      </div>
    </>
  );
}

import { Smile } from 'lucide-react';

interface TokenCardProps {
  message: string;
  price: string;
  percentage: string;
  mcap: string;
  hasImage?: boolean;
  imageUrl?: string;
}

export function TokenCard({ message, price, percentage, mcap, hasImage, imageUrl }: TokenCardProps) {
  return (
    <div className="mb-4 overflow-hidden rounded-3xl bg-violet-500 p-4 text-white">
      <div className="flex items-start space-x-2">
        <div className="rounded-full bg-white p-1">
          <Smile className="h-5 w-5 text-black" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">$YES</div>
          <div className="mt-1">{message}</div>
          {hasImage && imageUrl && (
            <div className="mt-2 overflow-hidden rounded-xl">
              <img src={imageUrl} alt="Post content" className="w-full" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{price}</span>
          <span className="text-green-300">▲ {percentage}</span>
          <span>{mcap}</span>
        </div>
        <button className="rounded-full bg-yellow-300 px-4 py-1 text-sm font-bold text-black">
          BUY
        </button>
      </div>
    </div>
  );
}