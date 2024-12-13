import { useState, useCallback } from 'react';

export function useDrawerTransition() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transition = useCallback((from: string | null, to: string | null) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (from) {
      setActiveDrawer(null);
      setTimeout(() => {
        setActiveDrawer(to);
        setIsTransitioning(false);
      }, 100);
    } else {
      setActiveDrawer(to);
      setIsTransitioning(false);
    }
  }, [isTransitioning]);

  return {
    activeDrawer,
    isTransitioning,
    transition
  };
}