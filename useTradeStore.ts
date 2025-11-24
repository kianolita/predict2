import { create } from 'zustand';

interface TradeState {
  amount: string; // Input string to handle decimals gracefully
  side: 'YES' | 'NO';
  mode: 'BUY' | 'SELL';
  setAmount: (amount: string) => void;
  setSide: (side: 'YES' | 'NO') => void;
  setMode: (mode: 'BUY' | 'SELL') => void;
  reset: () => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  amount: '10',
  side: 'YES',
  mode: 'BUY',
  setAmount: (amount) => set({ amount }),
  setSide: (side) => set({ side }),
  setMode: (mode) => set({ mode }),
  reset: () => set({ amount: '10', side: 'YES', mode: 'BUY' }),
}));