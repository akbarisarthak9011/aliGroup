import React, { useState } from 'react';
import Header from './components/Header';
import ClientPortal from './components/ClientPortal';

function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header setIsPortalOpen={setIsPortalOpen} isLoggedIn={isLoggedIn} />
      
      {/* Hero Section */}
      <main className="relative bg-slate-800 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh] text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access machine manuals, comprehensive troubleshooting guides, and request technical support directly from the experts.
          </p>
          
          <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row shadow-lg rounded-md overflow-hidden">
            <input 
              type="text" 
              placeholder="Search by Machine Model, Serial Number, or Error Code..." 
              className="flex-1 p-4 text-gray-800 focus:outline-none"
            />
            <button className="bg-[#3478B4] hover:bg-[#286090] text-white px-8 py-4 font-bold transition-colors">
              Search
            </button>
          </div>
        </div>
      </main>

      {/* Portal Modal */}
      {isPortalOpen && (
        <ClientPortal 
          setIsPortalOpen={setIsPortalOpen} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}
    </div>
  );
}

export default App;