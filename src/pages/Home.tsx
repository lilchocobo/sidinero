import React from 'react';
import { Header } from '../components/Header';
import { TokenCard } from '../components/TokenCard';

export function Home() {
  return (
    <>
      <Header />
      <div className="mb-20 p-4">
        <TokenCard
          message="This is a post from the token."
          price="$0.03"
          percentage="119.4%"
          mcap="2.8M MCAP"
        />
        <TokenCard
          message="HAHAHA so fucking bullish lmao"
          price="$0.03"
          percentage="119.4%"
          mcap="2.8M MCAP"
        />
        <TokenCard
          message="HAHAHA so fucking bullish lmao"
          price="$0.03"
          percentage="119.4%"
          mcap="2.8M MCAP"
          hasImage={true}
          imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba"
        />
        <TokenCard
          message="HAHAHA so fucking bullish lmao"
          price="$0.03"
          percentage="119.4%"
          mcap="2.8M MCAP"
        />
      </div>
    </>
  );
}