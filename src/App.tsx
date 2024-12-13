import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { FeedPage } from './pages/FeedPage';
import { Portfolio } from './pages/Portfolio';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from './providers/PrivyProvider';
import { WagmiProvider } from '@privy-io/wagmi';

import {config} from '../config';
import { AuthProvider } from './context/AuthContext';
import { TransactionsProvider } from './context/TransactionsContext';

import { Toaster } from 'react-hot-toast';
import { usePrivy } from '@privy-io/react-auth';
import { WelcomeScreen } from './components/Auth/WelcomeScreen';
import { TokensPage } from './pages/TokensPage';
import { TokenPage } from './pages/TokenPage';
import { BuyDrawerProvider } from './context/BuyDrawerContext';

function AppContent() {
  const { authenticated } = usePrivy();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route path="feed" element={<FeedPage />} />
        <Route index element={<Navigate to="/feed" replace />} />
        <Route path="token/:tokenId" element={<TokenPage />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="tokens" element={<TokensPage />} />
        </Route>
      </Routes>
      {!authenticated && <WelcomeScreen />}
    </>
  );
}


export default function App() {
  const queryClient = new QueryClient();
  return (
      <PrivyProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <AuthProvider>
              <TransactionsProvider>
                <BuyDrawerProvider>
                  <AppContent />
                  <Toaster position="top-center" />
                </BuyDrawerProvider>
              </TransactionsProvider>
            </AuthProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
  );
}



