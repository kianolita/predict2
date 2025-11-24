import React from 'react';
import { Position } from '../types';

interface PositionCardProps {
  positions: Position[];
}

export const PositionCard: React.FC<PositionCardProps> = ({ positions }) => {
  if (positions.length === 0) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mb-6">
       <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Your Positions</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
             Unrealized PnL: <span className="text-emerald-400">+$12.40</span>
        </span>
      </div>
      <div className="p-4 grid gap-3">
        {positions.map((pos, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        pos.outcome === 'YES' ? 'bg-emerald-900 text-emerald-400' : 'bg-rose-900 text-rose-400'
                    }`}>
                        {pos.outcome}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">{pos.balance} Shares</div>
                        <div className="text-xs text-gray-500">Avg {pos.avgPrice}¢</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-white">${(pos.balance * pos.avgPrice / 100).toFixed(2)}</div>
                    <div className={`text-xs ${pos.pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {pos.pnl > 0 ? '+' : ''}{pos.pnl}%
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className="p-4 bg-gray-700/20 border-t border-gray-700">
          <button className="w-full py-2 rounded-lg border border-gray-600 text-gray-400 text-sm hover:bg-gray-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Claim Winnings (Unresolved)
          </button>
      </div>
    </div>
  );
};