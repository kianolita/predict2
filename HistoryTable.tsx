import React from 'react';
import { Trade } from '../types';

interface HistoryTableProps {
  trades: Trade[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ trades }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mt-8">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Trade History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-900/50 uppercase text-xs font-medium text-gray-500">
            <tr>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Side</th>
              <th className="px-6 py-3 text-right">Size</th>
              <th className="px-6 py-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">{trade.time}</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-emerald-500">{trade.trader}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                    trade.side === 'YES' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {trade.type} {trade.side}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-white font-medium">
                    ${trade.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono">
                    {trade.price.toFixed(2)}¢
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};