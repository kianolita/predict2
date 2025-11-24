import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface LayoutProps {
  children: React.ReactNode;
}

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 28V16L12 8L18 14L28 4" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 4H19" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 4V13" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Sticky Top Bar */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <Logo />
              <span className="font-bold text-xl tracking-tight text-white">Predicit</span>
            </div>

            {/* Desktop Connect */}
            <div className="hidden md:flex items-center gap-4">
               <button 
                onClick={handleConnect}
                className="bg-gray-800 hover:bg-gray-700 text-sm font-medium py-2 px-4 rounded-full border border-gray-700 transition-all flex items-center gap-2"
              >
                {isConnected && address ? (
                    <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    {shortenAddress(address)}
                    </>
                ) : (
                    "Connect Wallet"
                )}
              </button>
            </div>

             {/* Mobile Menu Button */}
             <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-b border-gray-700 p-4">
             <button 
                onClick={handleConnect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
              </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">Powered by Predicit – Built on Base</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-emerald-500 transition-colors">Docs</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};