import { Drawer } from 'vaul';
import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { SlideToLaunch } from '../common/SlideToLaunch';
import { BuySuccessDrawer } from '../Buy/BuySuccessDrawer';
import { BuyAmount } from './BuyAmount';
import { useBalance } from 'wagmi';

interface BuyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  price: string;
}

export function BuyDrawer({ isOpen, onClose, symbol, price }: BuyDrawerProps) {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { data: balanceData } = useBalance();
  const conversionRate = 74.71; // Mock conversion rate - should come from props or API

  const handleBuyComplete = () => {
    console.log('Buy completed:', { amount, symbol });
    onClose();
    setShowSuccess(true);
  };

  const handlePercentageClick = (percentage: number) => {
    const value = (Number(balanceData?.value) * percentage).toFixed(0);
    setAmount(value);
  };

  console.log({balanceData});

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
            className="bg-purple-600 flex flex-col rounded-t-[32px] fixed bottom-0 left-0 right-0 h-[400px]"
            aria-label="Buy Token"
          >
            <Drawer.Title className="sr-only">Buy Token</Drawer.Title>
            <div className="p-6">
              {/* Balance Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-yellow-300 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-yellow-300">Your Balance</h2>
                  <p className="text-yellow-300/70">USD</p>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl font-bold text-yellow-300">
                    ${balanceData?.formatted.toLocaleString()}
                  </span>
                  <div className="text-sm text-yellow-300/70 text-right">
                    {balanceData?.formatted} ETH
                  </div>
                </div>
              </div>

              {/* Buy Amount Section */}
              <h3 className="text-2xl font-bold mb-8 text-white">
                How much do you want to buy?
              </h3>

              <div className="mb-8">
                <BuyAmount 
                  amount={amount}
                  onChange={setAmount}
                  conversionRate={conversionRate}
                  tokenSymbol={symbol}
                />
              </div>

              {/* Percentage Buttons */}
              <div className="flex gap-2 mb-6">
                {[25, 50, 75, 100].map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handlePercentageClick(percentage / 100)}
                    className="flex-1 rounded-full border-2 border-yellow-300 py-2 font-bold text-yellow-300 
                      hover:bg-yellow-300 hover:text-purple-600 transition-colors"
                    aria-label={`Buy ${percentage}% of balance`}
                  >
                    {percentage === 100 ? 'MAX' : `${percentage}%`}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={onClose}
                  className="rounded-full bg-white/10 p-4 hover:bg-white/20 transition-colors"
                  aria-label="Close buy dialog"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <div className="col-span-3">
                  <SlideToLaunch onComplete={handleBuyComplete} />
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <BuySuccessDrawer 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        tokenSymbol={symbol}
        amount={amount}
        achievement={{
          title: "Early Adopter",
          description: "FIRST 100 HOLDERS OF"
        }}
      />
    </>
  );
}