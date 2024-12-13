import { createContext, useContext, useState, ReactNode } from 'react';

interface BuyDrawerContextType {
  isOpen: boolean;
  tokenAddress: string | null;
  openBuyDrawer: (address: string) => void;
  closeBuyDrawer: () => void;
}

const BuyDrawerContext = createContext<BuyDrawerContextType | undefined>(undefined);

export function BuyDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);

  const openBuyDrawer = (address: string) => {
    setTokenAddress(address);
    setIsOpen(true);
  };

  const closeBuyDrawer = () => {
    setIsOpen(false);
    setTokenAddress(null);
  };

  return (
    <BuyDrawerContext.Provider value={{ isOpen, tokenAddress, openBuyDrawer, closeBuyDrawer }}>
      {children}
    </BuyDrawerContext.Provider>
  );
}

export function useBuyDrawer() {
  const context = useContext(BuyDrawerContext);
  if (context === undefined) {
    throw new Error('useBuyDrawer must be used within a BuyDrawerProvider');
  }
  return context;
} 