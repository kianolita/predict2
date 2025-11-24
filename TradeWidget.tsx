import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { Market } from '../types';
import { useAccount } from 'wagmi';

interface TradeWidgetProps {
  market: Market;
  onTrade: () => void;
}

export const TradeWidget: React.FC<TradeWidgetProps> = ({ market, onTrade }) => {
  const { amount, side, mode, setAmount, setSide, setMode } = useTradeStore();
  const { isConnected } = useAccount();
  const [isTrading, setIsTrading] = useState(false);

  // Derived calculations
  const numericAmount = parseFloat(amount) || 0;
  const currentPrice = side === 'YES' ? market.priceYes : market.priceNo;
  
  // Calculate potential return
  // If Buy: Invest amount / price = tokens. Return = tokens * 1$ = tokens.
  // If Sell: Selling tokens. Amount is tokens? Or amount is USDC to receive? 
  // Simplified for demo: Input is always USDC value involved.
  
  const estimatedTokens = mode === 'BUY' 
    ? numericAmount / currentPrice 
    : numericAmount; // If selling, we input tokens to sell
    
  const estimatedReturn = mode === 'BUY' 
    ? estimatedTokens * 1 
    : numericAmount * currentPrice; // If selling, we get USDC

  const priceImpact = numericAmount > 1000 ? 0.8 : 0.1; // Mock impact

  const handleExecute = async () => {
    setIsTrading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTrading(false);
    onTrade(); // Trigger toast or refresh
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-24 shadow-xl">
      {/* Buy/Sell Toggles */}
      <div className="flex bg-gray-900 rounded-lg p-1 mb-6">
        {(['BUY', 'SELL'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
              mode === m 
                ? 'bg-gray-700 text-white shadow' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Outcome Toggles */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSide('YES')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
            side === 'YES'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
          }`}
        >
          <div className="text-xs text-gray-400 mb-1 font-semibold uppercase">Outcome</div>
          <div className={`text-lg font-bold ${side === 'YES' ? 'text-emerald-500' : 'text-gray-300'}`}>YES</div>
          <div className="absolute top-4 right-4 text-sm font-mono text-gray-400">
             {(market.priceYes * 100).toFixed(0)}¢
          </div>
        </button>

        <button
          onClick={() => setSide('NO')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
            side === 'NO'
              ? 'border-rose-500 bg-rose-500/10'
              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
          }`}
        >
          <div className="text-xs text-gray-400 mb-1 font-semibold uppercase">Outcome</div>
          <div className={`text-lg font-bold ${side === 'NO' ? 'text-rose-500' : 'text-gray-300'}`}>NO</div>
          <div className="absolute top-4 right-4 text-sm font-mono text-gray-400">
             {(market.priceNo * 100).toFixed(0)}¢
          </div>
        </button>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          {mode === 'BUY' ? 'Amount (USDC)' : 'Amount (Shares)'}
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
            placeholder="0.00"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
             {mode === 'BUY' ? 'USDC' : side}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="space-y-3 mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price per share</span>
          <span className="text-white font-mono">{(currentPrice * 100).toFixed(1)}¢</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Est. Received</span>
          <span className="text-white font-mono">
             {mode === 'BUY' 
                ? `${estimatedTokens.toFixed(2)} ${side}` 
                : `${estimatedReturn.toFixed(2)} USDC`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
           <span className="text-gray-500">Price Impact</span>
           <span className="text-emerald-400 font-mono">-{priceImpact}%</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        disabled={!isConnected || isTrading || parseFloat(amount) <= 0}
        onClick={handleExecute}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
          !isConnected 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : isTrading 
              ? 'bg-gray-700 text-white cursor-wait'
              : mode === 'BUY'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-500/20'
                : 'bg-rose-600 hover:bg-rose-500 text-white hover:shadow-rose-500/20'
        }`}
      >
        {!isConnected ? 'Connect Wallet' : isTrading ? 'Confirming...' : `${mode} ${side}`}
      </button>
      
      {isConnected && (
         <p className="text-center text-xs text-gray-500 mt-4">
            Balance: <span className="text-gray-300 font-mono">1,450.00 USDC</span>
         </p>
      )}
    </div>
  );
};