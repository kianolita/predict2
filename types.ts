export interface Market {
  id: string;
  question: string;
  endDate: string; // ISO String
  outcomeTokenIdYes: string;
  outcomeTokenIdNo: string;
  volume: number;
  liquidity: number;
  priceYes: number;
  priceNo: number;
}

export interface Position {
  outcome: 'YES' | 'NO';
  balance: number;
  avgPrice: number;
  pnl: number;
}

export interface Trade {
  id: string;
  time: string;
  side: 'YES' | 'NO';
  type: 'Buy' | 'Sell';
  price: number;
  amount: number;
  trader: string;
  txHash: string;
}

// Minimal ABI for the ConditionalTokens/Market contract
export const MARKET_ABI = [
  {
    "inputs": [
      { "name": "outcome", "type": "bool" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "buy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "outcome", "type": "bool" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "sell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "outcome", "type": "bool" }],
    "name": "getPrice",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "account", "type": "address" },
      { "name": "id", "type": "uint256" }
    ],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const MOCK_MARKET_DATA: Market = {
  id: '57',
  question: "Will ETH close above $4,000 on Dec 31, 2025?",
  endDate: "2025-12-31T23:59:59Z",
  outcomeTokenIdYes: "1",
  outcomeTokenIdNo: "0",
  volume: 1254003,
  liquidity: 450000,
  priceYes: 0.68,
  priceNo: 0.32
};