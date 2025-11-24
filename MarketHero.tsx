import React from 'react';
import { Market } from '../types';

interface MarketHeroProps {
  market: Market;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const TimeBadge = ({ endDate }: { endDate: string }) => {
  // Simple mock countdown logic
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
      <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Ends {formatDate(endDate)}
    </span>
  );
};

export const MarketHero: React.FC<MarketHeroProps> = ({ market }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <TimeBadge endDate={market.endDate} />
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
          Crypto
        </span>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
        {market.question}
      </h1>

      <div className="flex gap-8 text-sm text-gray-400 border-b border-gray-800 pb-8">
        <div>
          <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Volume</span>
          <span className="text-white font-mono font-medium">{formatCurrency(market.volume)}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Liquidity</span>
          <span className="text-white font-mono font-medium">{formatCurrency(market.liquidity)}</span>
        </div>
      </div>
    </div>
  );
};