import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, FileText, Wrench, Phone, ChevronDown, 
  Download, BookOpen, Flame, Snowflake, Waves, 
  Zap, Info, Menu, X, MessageCircle, Send, Bot,
  User, Plus, List, Clock, CheckCircle, Camera, Loader2, Sparkles,
  LayoutDashboard, Package, Calendar, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Ali Group Corporate Color
const BRAND_COLOR = "#3478B4"; 

const MANUALS_DATA = [
  { id: 1, category: "Cooking Equipment", title: "Combi Ovens Manual Series X", size: "4.2 MB", icon: Flame },
  { id: 2, category: "Refrigeration", title: "Blast Chillers Quick Guide", size: "3.1 MB", icon: Snowflake },
  { id: 3, category: "Dishwashing", title: "Flight-Type Dishwashers", size: "5.6 MB", icon: Waves },
  { id: 4, category: "Bakery", title: "Spiral Mixers Operation", size: "2.8 MB", icon: BookOpen },
  { id: 5, category: "Ice Machines", title: "Modular Ice Cubers", size: "3.5 MB", icon: Snowflake },
  { id: 6, category: "Coffee Machines", title: "Espresso Extractors V2", size: "1.9 MB", icon: Zap },
];

const FIXES_DATA = [
  { 
    id: 1, 
    issue: "Unit not powering on (No Display)", 
    tags: ["power", "display", "dead"],
    steps: [
      "Check main power supply and wall breaker.", 
      "Ensure the equipment door/lid is fully closed and safety microswitch is engaged.", 
      "Inspect the internal control board fuse (F1). Replace if blown."
    ] 
  },
  { 
    id: 2, 
    issue: "Error Code E-01: Low Water Pressure", 
    tags: ["e-01", "water", "pressure", "error"],
    steps: [
      "Verify the main water supply valve is fully open.", 
      "Check the inlet hose behind the machine for kinks or severe bends.", 
      "Turn off water supply, unscrew the inlet hose, and clean the water inlet solenoid filter mesh."
    ] 
  },
  { 
    id: 3, 
    issue: "Uneven Cooking / Temperature Fluctuation", 
    tags: ["temperature", "cooking", "heat", "fluctuation"],
    steps: [
      "Ensure the cabinet is not overloaded and air can circulate freely.", 
      "Run the automatic thermostat calibration cycle (refer to manual page 14).", 
      "Inspect the convection fan for debris or resistance when turned manually."
    ] 
  },
  { 
    id: 4, 
    issue: "Error Code E-45: Motor Overload", 
    tags: ["e-45", "motor", "overload", "error"],
    steps: [
      "Turn off the machine completely and allow it to cool for 15-20 minutes.", 
      "Press the physical thermal reset button located on the lower back panel.", 
      "If the error persists after resetting, the motor capacitor may need replacement. Contact support."
    ] 
  },
];

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const Header = ({ onOpenPortal, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Manuals", href: "#manuals" },
    { name: "Quick Fixes", href: "#fixes" },
    { name: "Contact Support", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo Area */}
          <div className="flex items-center flex-shrink-0 cursor-pointer h-full py-2">
            <img 
              src="WhatsApp Image 2026-09-28 at 9.22.13 AM.jpeg" 
              alt="Ali Group After-Sales & Technical Services Logo" 
              className="max-h-full h-12 sm:h-16 md:h-20 w-auto object-contain"
              onError={(e) => {
                // Fallback for strict browser URI parsing
                e.target.onerror = null; 
                e.target.src = encodeURI("WhatsApp Image 2026-09-28 at 9.22.13 AM.jpeg");
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-gray-600 hover:text-[#3478B4] px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-300 mx-1 lg:mx-2"></div>
            <button 
              onClick={onOpenPortal}
              className="flex items-center space-x-2 bg-[#3478B4] hover:bg-[#296395] text-white px-4 lg:px-5 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <User size={18} />
              <span>{user && user.isAnonymous === false ? "Client Area" : "Client Login"}</span>
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 bg-gray-50 rounded-lg border border-gray-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 w-full z-[60] border-t border-gray-100 flex flex-col transition-all duration-300 origin-top animate-in slide-in-from-top-2">
          <div className="px-4 py-6 space-y-2 bg-white">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center px-4 py-4 text-lg font-bold text-white bg-[#3478B4] hover:bg-[#296395] rounded-xl transition-colors shadow-md mb-4"
            >
              <User size={24} className="mr-3" />
              {user && user.isAnonymous === false ? "Access Client Area" : "Secure Client Login"}
            </button>
            
            <div className="border-t border-gray-100 my-4"></div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-[#3478B4] hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsScanning(true);
    try {
      const base64Data = await fileToBase64(file);
      const payload = {
        contents: [{
          role: "user",
          parts: [
            { text: "Extract the main error code, serial number, or machine model from this image. Return ONLY the alphanumeric code or name. If nothing is found or it's unreadable, return 'Unknown'." },
            { inlineData: { mimeType: file.type, data: base64Data } }
          ]
        }]
      };
      
      const apiKey = ""; // API key populated by canvas
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      if (text && text !== 'Unknown') {
        setSearchQuery(text.replace(/['"]/g, '')); // Clean up potential quotes
      }
    } catch (error) {
      console.error("Image scan failed:", error);
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3478B4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
          How can we help you today?
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Access machine manuals, comprehensive troubleshooting guides, and request technical support directly from the experts.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto shadow-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-32 py-4 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-shadow text-lg"
            placeholder="Search by Machine Model, Serial Number, or Error Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center space-x-2">
             <input 
               type="file" 
               accept="image/*" 
               className="hidden" 
               ref={fileInputRef} 
               onChange={handleImageUpload} 
             />
             <button 
                title="Scan Error Code or Nameplate"
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                className="p-2 text-gray-400 hover:text-[#3478B4] hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
             >
                {isScanning ? <Loader2 size={24} className="animate-spin" /> : <Camera size={24} />}
             </button>
             <button 
                className="px-6 py-2 text-white font-medium rounded-md transition-colors"
                style={{ backgroundColor: BRAND_COLOR }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#296395'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = BRAND_COLOR}
             >
               Search
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ManualsSection = () => {
  return (
    <section id="manuals" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="mr-3 h-8 w-8" style={{ color: BRAND_COLOR }} />
            Machine Manuals
          </h2>
          <p className="text-gray-600 text-lg">Download operation and maintenance guides for your equipment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANUALS_DATA.map((manual) => {
            const Icon = manual.icon;
            return (
              <div 
                key={manual.id} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {manual.size}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-[#3478B4] mb-1 uppercase tracking-wider">{manual.category}</h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{manual.title}</h4>
                  
                  <button className="flex items-center text-sm font-medium text-gray-600 group-hover:text-[#3478B4] transition-colors w-full border-t border-gray-100 pt-4 mt-2">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TroubleshootingSection = ({ searchQuery }) => {
  const [openId, setOpenId] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Reset AI suggestion when search changes
  useEffect(() => {
    setAiSuggestion(null);
  }, [searchQuery]);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAskAi = async () => {
    if (!searchQuery.trim()) return;
    
    setIsAiLoading(true);
    try {
      const payload = {
        contents: [{
          role: "user",
          parts: [{ text: `Provide a step-by-step troubleshooting guide for commercial kitchen equipment experiencing this issue or error code: "${searchQuery}". Keep it concise, safe, and highly professional as if you are an Ali Group technical support agent.` }]
        }]
      };
      
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setAiSuggestion(text);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      setAiSuggestion("We couldn't generate a suggestion right now. Please try again or contact support.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Filter based on search query
  const filteredFixes = FIXES_DATA.filter((fix) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      fix.issue.toLowerCase().includes(query) || 
      fix.tags.some(tag => tag.includes(query))
    );
  });

  return (
    <section id="fixes" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <Wrench className="mr-3 h-8 w-8" style={{ color: BRAND_COLOR }} />
            Easy Fixes & Troubleshooting
          </h2>
          <p className="text-gray-600 text-lg">Common issues and step-by-step resolution guides.</p>
        </div>

        {/* Standard Search Results */}
        {filteredFixes.length > 0 && (
          <div className="space-y-4 mb-8">
            {filteredFixes.map((fix) => (
              <div 
                key={fix.id} 
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  openId === fix.id ? 'border-[#3478B4] ring-1 ring-[#3478B4]' : 'border-gray-200'
                }`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 focus:outline-none text-left"
                  onClick={() => toggleAccordion(fix.id)}
                >
                  <span className={`font-semibold text-lg ${openId === fix.id ? 'text-[#3478B4]' : 'text-gray-900'}`}>
                    {fix.issue}
                  </span>
                  <ChevronDown 
                    className={`transform transition-transform duration-200 ${openId === fix.id ? 'rotate-180 text-[#3478B4]' : 'text-gray-400'}`} 
                    size={20} 
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === fix.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-4">Resolution Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-3">
                      {fix.steps.map((step, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Fallback / Enhancer Section */}
        {searchQuery && (
          <div className="mt-8 bg-blue-50/50 rounded-xl border border-blue-100 p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full text-[#3478B4] mr-4">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Need more specific help?</h3>
                  <p className="text-sm text-gray-600">Let our AI analyze "{searchQuery}" and generate custom troubleshooting steps.</p>
                </div>
              </div>
              <button 
                onClick={handleAskAi}
                disabled={isAiLoading}
                className="whitespace-nowrap px-5 py-2.5 bg-[#3478B4] text-white font-medium rounded-lg hover:bg-[#296395] transition-colors disabled:opacity-70 disabled:cursor-wait flex items-center shadow-sm"
              >
                {isAiLoading ? (
                  <><Loader2 size={18} className="mr-2 animate-spin" /> Generating...</>
                ) : (
                  <>Generate Fix</>
                )}
              </button>
            </div>

            {aiSuggestion && (
              <div className="mt-6 pt-6 border-t border-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  <h4 className="text-[#3478B4] font-semibold mb-3 flex items-center">
                    <Bot size={18} className="mr-2" /> AI Suggested Solution
                  </h4>
                  {aiSuggestion}
                </div>
                <div className="mt-4 flex items-start">
                  <Info className="text-[#3478B4] mt-0.5 mr-3 flex-shrink-0" size={16} />
                  <p className="text-xs text-blue-900/70">
                    AI suggestions are generated dynamically based on typical machine configurations. Always refer to your official manual or contact support if unsure.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {filteredFixes.length === 0 && !searchQuery && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <Info className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Start typing to see solutions</h3>
            <p className="text-gray-500 mt-1">Search for an error code or issue to get started.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand/About */}
          <div>
            <div className="flex flex-col text-left border-l-4 pl-3 mb-6" style={{ borderColor: BRAND_COLOR }}>
              <span className="font-bold text-xl leading-tight text-white tracking-tight">Ali Group</span>
              <span className="font-semibold text-xs tracking-wider" style={{ color: BRAND_COLOR }}>
                AFTER-SALES & TECHNICAL SERVICES
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Providing world-class technical support, original spare parts, and comprehensive service manuals for all our global foodservice brands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#manuals" className="hover:text-white transition-colors">Download Manuals</a></li>
              <li><a href="#fixes" className="hover:text-white transition-colors">Troubleshooting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Spare Parts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Registration</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Support</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center">
                <Phone size={16} className="mr-3" style={{ color: BRAND_COLOR }} />
                <span>+1 (800) 555-0199</span>
              </p>
              <p className="flex items-center">
                <FileText size={16} className="mr-3" style={{ color: BRAND_COLOR }} />
                <span>support@aligroup-service.demo</span>
              </p>
              <button 
                className="mt-4 px-4 py-2 text-white text-sm font-medium rounded transition-colors"
                style={{ backgroundColor: BRAND_COLOR }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#296395'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = BRAND_COLOR}
              >
                Submit a Ticket
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Ali Group After-Sales & Technical Services. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am the Ali Group Support AI. Describe your machine issue or error code, and I will help you troubleshoot.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const systemPrompt = "You are an expert technical support assistant for Ali Group After-Sales Services. Help users troubleshoot commercial food service equipment (ovens, dishwashers, refrigeration, etc.). Be concise, prioritize safety (e.g., advising to unplug before opening panels), and maintain a highly professional tone. Suggest checking the manual when appropriate.";
      
      const chatHistory = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));
      
      const payload = {
        contents: [...chatHistory, { role: 'user', parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };
      
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      const candidate = result.candidates?.[0];
      
      if (candidate && candidate.content?.parts?.[0]?.text) {
         setMessages(prev => [...prev, { role: 'model', text: candidate.content.parts[0].text }]);
      } else {
         setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error processing your request. Please try again or contact a human agent." }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Network error. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200" style={{ height: '500px', maxHeight: '80vh' }}>
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: BRAND_COLOR }}>
            <div className="flex items-center">
              <Bot size={20} className="mr-2" />
              <span className="font-semibold">Support AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 focus:outline-none">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#3478B4] text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 rounded-lg rounded-bl-none px-4 py-3 text-sm shadow-sm flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your issue..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-[#3478B4] focus:ring-1 focus:ring-[#3478B4] text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#3478B4] text-white px-3 py-2 rounded-r-md hover:bg-[#296395] transition-colors disabled:bg-blue-300 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#3478B4] text-white rounded-full p-4 shadow-lg hover:bg-[#296395] transition-transform hover:scale-105 focus:outline-none flex items-center justify-center group"
        >
          <MessageCircle size={28} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
};

const ClientPortal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [newIssue, setNewIssue] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Mock Data for Client's Purchased Machines
  const MOCK_MACHINES = [
    { 
      id: 'M001', 
      name: 'Combi Oven Series X', 
      serial: 'CX-99201-A', 
      purchaseDate: '2025-03-15', 
      warrantyUntil: '2027-03-15', 
      nextMaintenance: '2026-10-15', 
      status: 'Active' 
    },
    { 
      id: 'M002', 
      name: 'Flight-Type Dishwasher', 
      serial: 'FT-8832-B', 
      purchaseDate: '2024-11-01', 
      warrantyUntil: '2025-11-01', 
      nextMaintenance: '2026-11-01', 
      status: 'Maintenance Due' 
    },
    { 
      id: 'M003', 
      name: 'Modular Ice Cuber', 
      serial: 'IC-221-C', 
      purchaseDate: '2026-01-20', 
      warrantyUntil: '2028-01-20', 
      nextMaintenance: '2027-01-20', 
      status: 'Active' 
    },
  ];

  useEffect(() => {
    if (!user) return;
    const ticketsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'tickets');
    const unsubscribe = onSnapshot(ticketsRef, (snapshot) => {
      const fetchedTickets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setTickets(fetchedTickets);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!newIssue.trim() || !user) return;
    
    try {
      const ticketsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'tickets');
      await addDoc(ticketsRef, {
        issue: newIssue,
        status: 'Open',
        createdAt: serverTimestamp()
      });
      setNewIssue('');
      setActiveTab('tickets'); // Switch to tickets view to see the new ticket
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const prefillTicket = (machineName, serial) => {
    setNewIssue(`Issue with ${machineName} (SN: ${serial}): \n`);
    setActiveTab('tickets');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm md:p-6">
       {/* Full screen on mobile, bounded box on desktop */}
       <div className="bg-white md:rounded-2xl shadow-2xl w-full h-full md:max-w-6xl md:h-[85vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
         
         {/* Mobile Header (Only visible on small screens) */}
         <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white z-20 shadow-sm sticky top-0">
           <div className="flex items-center space-x-3">
             <div className="bg-[#3478B4] p-2 rounded-full text-white shadow-sm">
               <User size={18} />
             </div>
             <div>
               <h2 className="text-lg font-bold text-gray-900 leading-tight">Client Portal</h2>
               <p className="text-[10px] text-gray-500 font-mono uppercase">ID: {user?.uid?.substring(0, 8) || 'Auth...'}</p>
             </div>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full focus:outline-none transition-colors">
             <X size={20} />
           </button>
         </div>
         
         {/* Navigation Sidebar (Desktop) / Horizontal Topbar (Mobile) */}
         <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col flex-shrink-0 z-10">
           {/* Desktop Only Header Profile */}
           <div className="hidden md:flex p-6 border-b border-gray-200 justify-between items-center">
             <div className="flex items-center space-x-3">
               <div className="bg-[#3478B4] p-2 rounded-full text-white shadow-sm">
                 <User size={20} />
               </div>
               <div>
                 <h2 className="text-lg font-bold text-gray-900">Client Portal</h2>
                 <p className="text-xs text-gray-500 font-mono" title="Session ID">{user?.uid?.substring(0, 8) || 'Auth...'}</p>
               </div>
             </div>
           </div>
           
           {/* Navigation Links - Horizontally scrollable on mobile */}
           <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 bg-white md:bg-transparent shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)] md:shadow-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
             <button 
               onClick={() => setActiveTab('dashboard')}
               className={`flex-shrink-0 md:w-full flex items-center justify-center md:justify-start space-x-2 md:space-x-3 px-4 py-3 md:py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-[#3478B4] text-white shadow-md md:bg-blue-50 md:text-[#3478B4] md:shadow-none' : 'text-gray-600 bg-gray-50 md:bg-transparent hover:bg-gray-100'}`}
             >
               <LayoutDashboard size={18} /> <span className={`${activeTab === 'dashboard' ? 'block' : 'hidden md:block'}`}>Dashboard</span>
             </button>
             <button 
               onClick={() => setActiveTab('equipment')}
               className={`flex-shrink-0 md:w-full flex items-center justify-center md:justify-start space-x-2 md:space-x-3 px-4 py-3 md:py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'equipment' ? 'bg-[#3478B4] text-white shadow-md md:bg-blue-50 md:text-[#3478B4] md:shadow-none' : 'text-gray-600 bg-gray-50 md:bg-transparent hover:bg-gray-100'}`}
             >
               <Package size={18} /> <span className={`${activeTab === 'equipment' ? 'block' : 'hidden md:block'}`}>My Equipment</span>
             </button>
             <button 
               onClick={() => setActiveTab('tickets')}
               className={`flex-shrink-0 md:w-full flex items-center justify-center md:justify-start space-x-2 md:space-x-3 px-4 py-3 md:py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'tickets' ? 'bg-[#3478B4] text-white shadow-md md:bg-blue-50 md:text-[#3478B4] md:shadow-none' : 'text-gray-600 bg-gray-50 md:bg-transparent hover:bg-gray-100'}`}
             >
               <List size={18} /> <span className={`${activeTab === 'tickets' ? 'block' : 'hidden md:block'}`}>Support Tickets</span>
             </button>
           </nav>
           
           <div className="mt-auto p-4 border-t border-gray-200 text-xs text-gray-500 text-center hidden md:block bg-slate-50">
             Ali Group Tech Services
           </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col h-full bg-slate-50 md:bg-white relative overflow-y-auto">
           {/* Desktop Close Button */}
           <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none hidden md:block z-10">
             <X size={24} />
           </button>
           
           <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl mx-auto w-full pb-24 md:pb-10">
             
             {/* DASHBOARD TAB */}
             {activeTab === 'dashboard' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 hidden md:block">Welcome Back</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                   <div className="bg-white md:bg-blue-50 border border-gray-200 md:border-blue-100 rounded-xl p-5 md:p-6 flex items-center md:items-start space-x-4 shadow-sm md:shadow-none">
                     <div className="bg-blue-50 md:bg-white p-3 rounded-lg text-[#3478B4]">
                       <Package size={24} />
                     </div>
                     <div>
                       <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide md:normal-case md:tracking-normal">Total Machines</p>
                       <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-none mt-1">{MOCK_MACHINES.length}</p>
                     </div>
                   </div>
                   <div className="bg-white md:bg-amber-50 border border-gray-200 md:border-amber-100 rounded-xl p-5 md:p-6 flex items-center md:items-start space-x-4 shadow-sm md:shadow-none">
                     <div className="bg-amber-50 md:bg-white p-3 rounded-lg text-amber-500">
                       <AlertTriangle size={24} />
                     </div>
                     <div>
                       <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide md:normal-case md:tracking-normal">Active Tickets</p>
                       <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-none mt-1">{tickets.filter(t => t.status === 'Open').length}</p>
                     </div>
                   </div>
                   <div className="bg-white md:bg-green-50 border border-gray-200 md:border-green-100 rounded-xl p-5 md:p-6 flex items-center md:items-start space-x-4 shadow-sm md:shadow-none sm:col-span-2 md:col-span-1">
                     <div className="bg-green-50 md:bg-white p-3 rounded-lg text-green-500">
                       <Calendar size={24} />
                     </div>
                     <div>
                       <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide md:normal-case md:tracking-normal">Next Maintenance</p>
                       <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">Oct 15, 2026</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                     <Wrench size={18} className="mr-2 text-[#3478B4]" /> Recent Support Activity
                   </h3>
                   {loading ? (
                     <div className="animate-pulse space-y-3"><div className="h-10 bg-gray-100 rounded w-full"></div></div>
                   ) : tickets.length === 0 ? (
                     <p className="text-gray-500 text-sm">No recent support tickets.</p>
                   ) : (
                     <div className="space-y-4">
                       {tickets.slice(0, 3).map(ticket => (
                         <div key={ticket.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                           <p className="text-sm text-gray-700 truncate max-w-[200px] md:max-w-md pr-2">{ticket.issue}</p>
                           <span className={`px-2 py-1 flex-shrink-0 text-[10px] md:text-xs font-semibold rounded-full ${ticket.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                             {ticket.status}
                           </span>
                         </div>
                       ))}
                     </div>
                   )}
                   <button onClick={() => setActiveTab('tickets')} className="mt-5 w-full md:w-auto text-center block text-sm font-medium text-[#3478B4] bg-blue-50 md:bg-transparent py-2 md:py-0 rounded-lg md:rounded-none hover:underline">View all tickets &rarr;</button>
                 </div>
               </div>
             )}

             {/* EQUIPMENT TAB */}
             {activeTab === 'equipment' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="flex justify-between items-center mb-4 md:mb-6">
                   <h2 className="text-xl md:text-2xl font-bold text-gray-900 hidden md:block">My Installed Equipment</h2>
                 </div>
                 
                 <div className="bg-transparent md:bg-white md:border md:border-gray-200 rounded-xl md:shadow-sm overflow-hidden">
                   
                   {/* Desktop Table View */}
                   <div className="hidden md:block overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                       <thead>
                         <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                           <th className="p-4 font-semibold text-gray-600">Machine / Serial</th>
                           <th className="p-4 font-semibold text-gray-600">Warranty</th>
                           <th className="p-4 font-semibold text-gray-600">Next Maintenance</th>
                           <th className="p-4 font-semibold text-gray-600">Status</th>
                           <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                         {MOCK_MACHINES.map((machine) => (
                           <tr key={machine.id} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4">
                               <p className="font-semibold text-gray-900">{machine.name}</p>
                               <p className="text-xs text-gray-500 font-mono mt-0.5">SN: {machine.serial}</p>
                             </td>
                             <td className="p-4">
                               <div className="flex items-center text-sm text-gray-700">
                                 <ShieldCheck size={16} className="mr-1.5 text-green-500" />
                                 {machine.warrantyUntil}
                               </div>
                             </td>
                             <td className="p-4 text-sm text-gray-700">
                               <div className="flex items-center">
                                 <Calendar size={16} className="mr-1.5 text-gray-400" />
                                 {machine.nextMaintenance}
                               </div>
                             </td>
                             <td className="p-4">
                               <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${machine.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                 {machine.status}
                               </span>
                             </td>
                             <td className="p-4 text-right">
                               <button 
                                 onClick={() => prefillTicket(machine.name, machine.serial)}
                                 className="text-sm font-medium text-[#3478B4] hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
                               >
                                 Request Service
                               </button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>

                   {/* Mobile Stacked Cards View */}
                   <div className="md:hidden space-y-4">
                     {MOCK_MACHINES.map((machine) => (
                       <div key={machine.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
                         {/* Status Indicator Line */}
                         <div className={`absolute top-0 left-0 w-1 h-full ${machine.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         
                         <div className="flex justify-between items-start mb-3 pl-2">
                           <div>
                             <h3 className="font-bold text-gray-900 leading-tight">{machine.name}</h3>
                             <p className="text-xs text-gray-500 font-mono mt-1 text-[#3478B4]">SN: {machine.serial}</p>
                           </div>
                           <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ml-2 ${machine.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                             {machine.status}
                           </span>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-3 mb-4 mt-2 pl-2 border-t border-gray-50 pt-3">
                           <div>
                             <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Warranty</p>
                             <div className="flex items-center text-sm font-medium text-gray-700">
                               <ShieldCheck size={14} className="mr-1.5 text-green-500" />
                               {machine.warrantyUntil}
                             </div>
                           </div>
                           <div>
                             <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Maintenance</p>
                             <div className="flex items-center text-sm font-medium text-gray-700">
                               <Calendar size={14} className="mr-1.5 text-amber-500" />
                               {machine.nextMaintenance}
                             </div>
                           </div>
                         </div>
                         
                         <button 
                           onClick={() => prefillTicket(machine.name, machine.serial)}
                           className="w-full mt-1 bg-gray-50 hover:bg-[#3478B4] text-[#3478B4] hover:text-white border border-gray-200 hover:border-[#3478B4] transition-all py-2.5 rounded-lg font-medium text-sm flex items-center justify-center"
                         >
                           <Wrench size={14} className="mr-2" /> Request Service
                         </button>
                       </div>
                     ))}
                   </div>

                 </div>
               </div>
             )}

             {/* TICKETS TAB */}
             {activeTab === 'tickets' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 hidden md:block">Support Tickets</h2>
                 
                 <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Form side */}
                    <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm order-1 lg:order-none">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                        <Plus size={18} className="mr-2 text-[#3478B4]" /> Open a New Ticket
                      </h3>
                      <form onSubmit={handleSubmitTicket} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Describe the Issue</label>
                          <textarea 
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3478B4] focus:border-transparent resize-none h-28 md:h-32 text-sm"
                            placeholder="E.g., Combi Oven Series X is showing error code E-45 after self-cleaning cycle..."
                            value={newIssue}
                            onChange={(e) => setNewIssue(e.target.value)}
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={!newIssue.trim()}
                          className="w-full bg-[#3478B4] hover:bg-[#296395] text-white font-medium py-3 md:py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                          Submit Request
                        </button>
                      </form>
                    </div>

                    {/* List side */}
                    <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm order-2 lg:order-none">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                        <List size={18} className="mr-2 text-[#3478B4]" /> Your Ticket History
                      </h3>
                      {loading ? (
                        <div className="animate-pulse space-y-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-100 rounded-lg w-full"></div>
                          ))}
                        </div>
                      ) : tickets.length === 0 ? (
                        <div className="text-center py-10 md:py-12 bg-slate-50 rounded-lg border border-dashed border-gray-300">
                          <CheckCircle size={32} className="mx-auto text-gray-400 mb-3" />
                          <h4 className="text-gray-700 font-medium mb-1 text-sm md:text-base">No active support tickets</h4>
                          <p className="text-gray-500 text-xs md:text-sm">When you submit a request, it will appear here.</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                          {tickets.map(ticket => (
                            <div key={ticket.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-slate-50 relative overflow-hidden">
                              <div className={`absolute left-0 top-0 bottom-0 w-1 ${ticket.status === 'Open' ? 'bg-amber-400' : 'bg-green-400'}`}></div>
                              <div className="flex justify-between items-start mb-2 pl-2">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${ticket.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                  {ticket.status}
                                </span>
                                <span className="text-[10px] text-gray-500 flex items-center bg-white px-2 py-0.5 rounded border border-gray-100">
                                  <Clock size={10} className="mr-1" />
                                  {ticket.createdAt?.toDate ? ticket.createdAt.toDate().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Just now'}
                                </span>
                              </div>
                              <p className="text-gray-800 text-sm whitespace-pre-wrap mt-2 pl-2 leading-relaxed">{ticket.issue}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                 </div>
               </div>
             )}

           </div>
         </div>
       </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    initAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 flex flex-col">
      <Header onOpenPortal={() => setShowPortal(true)} user={user} />
      
      <main className="flex-grow">
        <HeroSection 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <ManualsSection />
        
        <TroubleshootingSection 
          searchQuery={searchQuery} 
        />
      </main>

      <Footer />
      
      {/* Attach the new AI Chat Widget */}
      <ChatWidget />
      
      {/* Dynamic Client Portal Modal */}
      {showPortal && <ClientPortal user={user} onClose={() => setShowPortal(false)} />}
    </div>
  );
}
