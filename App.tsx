import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from './services/web3Config';
import { Layout } from './components/Layout';
import { MarketHero } from './components/MarketHero';
import { TradeWidget } from './components/TradeWidget';
import { HistoryTable } from './components/HistoryTable';
import { PositionCard } from './components/PositionCard';
import { MOCK_MARKET_DATA, Trade, Position } from './types';

const queryClient = new QueryClient();

// Mock data for initial render
const MOCK_TRADES: Trade[] = [
  { id: '1', time: '2 mins ago', side: 'YES', type: 'Buy', price: 68, amount: 250, trader: '0x32...A9b', txHash: '0x1' },
  { id: '2', time: '5 mins ago', side: 'NO', type: 'Buy', price: 31, amount: 50, trader: '0x88...12F', txHash: '0x2' },
  { id: '3', time: '12 mins ago', side: 'YES', type: 'Sell', price: 67, amount: 1000, trader: '0xCC...901', txHash: '0x3' },
  { id: '4', time: '15 mins ago', side: 'YES', type: 'Buy', price: 68, amount: 420, trader: '0x11...abc', txHash: '0x4' },
  { id: '5', time: '1 hr ago', side: 'NO', type: 'Buy', price: 33, amount: 100, trader: '0x99...zzz', txHash: '0x5' },
];

const MOCK_POSITIONS: Position[] = [
    { outcome: 'YES', balance: 400, avgPrice: 65, pnl: 4.6 }
];

const MarketPage = () => {
    const { isConnected } = useAccount();
    const [trades, setTrades] = useState<Trade[]>(MOCK_TRADES);
    const [showToast, setShowToast] = useState(false);

    const handleTrade = () => {
        // Optimistic update simulating a new trade
        const newTrade: Trade = {
            id: Math.random().toString(),
            time: 'Just now',
            side: 'YES', // Simplified, normally comes from store
            type: 'Buy',
            price: 68,
            amount: 100,
            trader: 'You',
            txHash: '0xNew'
        };
        setTrades([newTrade, ...trades]);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Content & Charts */}
            <div className="lg:col-span-8">
                <MarketHero market={MOCK_MARKET_DATA} />
                
                {/* Visual Probability Bar */}
                <div className="flex w-full h-12 rounded-lg overflow-hidden font-bold text-lg mb-8 shadow-lg">
                    <div 
                        className="bg-emerald-500 text-emerald-950 flex items-center pl-4 transition-all duration-500"
                        style={{ width: `${MOCK_MARKET_DATA.priceYes * 100}%` }}
                    >
                        YES {(MOCK_MARKET_DATA.priceYes * 100).toFixed(0)}%
                    </div>
                    <div 
                        className="bg-rose-500 text-rose-950 flex items-center justify-end pr-4 transition-all duration-500"
                        style={{ width: `${MOCK_MARKET_DATA.priceNo * 100}%` }}
                    >
                        NO {(MOCK_MARKET_DATA.priceNo * 100).toFixed(0)}%
                    </div>
                </div>

                {/* Additional Stats / Description placeholder */}
                <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-800">
                    <h4 className="text-gray-400 font-medium mb-2 text-sm uppercase">Market Rules</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        This market resolves to YES if the closing price of Ethereum (ETH) is strictly greater than $4,000.00 on December 31, 2025, according to the Coingecko daily close. Otherwise, it resolves to NO.
                    </p>
                </div>

                <HistoryTable trades={trades} />
            </div>

            {/* Right Column: Interaction */}
            <div className="lg:col-span-4 space-y-6">
                {isConnected && <PositionCard positions={MOCK_POSITIONS} />}
                <TradeWidget market={MOCK_MARKET_DATA} onTrade={handleTrade} />
            </div>

            {/* Notification Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                        <h4 className="font-bold">Trade Submitted</h4>
                        <p className="text-sm text-emerald-100">Transaction pending on Base...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
           {/* Simple Hash Routing simulation */}
           <MarketPage />
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;