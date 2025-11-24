import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { createClient } from 'viem';

// In a real app, you would use proper connectors like MetaMask/Coinbase
// via standard wagmi connectors or RainbowKit.
// For this demo, we set up a basic config.

export const config = createConfig({
  chains: [base],
  client: ({ chain }) => createClient({ chain, transport: http() }),
  transports: {
    [base.id]: http(),
  },
});

export const MARKET_ADDRESS = "0x1234567890123456789012345678901234567890"; // Placeholder