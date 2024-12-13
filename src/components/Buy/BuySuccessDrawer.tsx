import { Drawer } from 'vaul';
import { useNavigate } from 'react-router-dom';
import { Achievement } from './Achievement';
import { TokenPurchaseDetails } from './TokenPurchaseDetails';
import { ActionButtons } from './ActionButtons';
import { ShareDrawer } from '../Share/ShareDrawer';
import { useState } from 'react';
import { TokenData } from '../../hooks/useTokenData';

interface BuySuccessDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  token: TokenData;
  amount: number;
  amountUSD: number;
  tokenAmount: number;
  achievement?: {
    title: string;
    description: string;
  };
}

export function BuySuccessDrawer({ 
  isOpen, 
  onClose, 
  token, 
  amount,
  amountUSD,
  tokenAmount,
  achievement 
}: BuySuccessDrawerProps) {
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);

  const handleShare = () => {
    onClose(); // Close success drawer first
    setTimeout(() => setShowShare(true), 100); // Slight delay before opening share drawer
  };

  return (
    <>
      <Drawer.Root 
        open={isOpen} 
        onOpenChange={onClose}
        shouldScaleBackground
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content 
            className="bg-gradient-to-b from-yellow-300 to-green-400 flex flex-col rounded-t-[32px] h-[90vh] fixed bottom-0 left-0 right-0"
            aria-label="Purchase Success"
          >
            <Drawer.Title className="sr-only">Purchase Success</Drawer.Title>
            <div className="p-6 flex flex-col items-center justify-center h-full relative">
              {/* Background "BUYING" text pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="whitespace-nowrap text-black text-2xl font-bold">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <span key={j} className="mr-4">BUYING</span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto">
                {/* Add token image */}
                <img 
                  src={token.metadata.image} 
                  alt={`${token.symbol} token`}
                  className="w-24 h-24 rounded-full mb-6 shadow-lg"
                />

                <TokenPurchaseDetails 
                  amount={tokenAmount.toString()}
                  token={token}
                />

                {achievement && (
                  <Achievement 
                    title={achievement.title}
                    description={achievement.description}
                    tokenSymbol={token.symbol}
                  />
                )}

                <ActionButtons 
                  onShare={handleShare}
                  onHome={() => {
                    onClose();
                    navigate('/portfolio');
                  }}
                />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <ShareDrawer 
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        data={{
          title: `Just bought ${amount} $${token.symbol}! 🚀`,
          description: achievement ? `${achievement.title} - ${achievement.description} $${token.symbol}` : `Joined the $${token.symbol} community!`,
          url: window.location.href,
          image: token.metadata.image // You can customize this
        }}
      />
    </>
  );
}