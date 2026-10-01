import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, FileText, Wrench, Phone, ChevronDown, 
  Download, BookOpen, Flame, Snowflake, Waves, 
  Zap, Info, Menu, X, MessageCircle, Send, Bot,
  User, Plus, List, Clock, CheckCircle, Camera, Loader2, Sparkles,
  LayoutDashboard, Package, Calendar, ShieldCheck, AlertTriangle
} from 'lucide-react';

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
            <div className="flex flex-col text-left border-l-4 pl-3" style={{ borderColor: BRAND_COLOR }}>
              <span className="font-bold text-lg leading-tight text-gray-900 tracking-tight">Ali Group</span>
              <span className="font-semibold text-[10px] tracking-wider" style={{ color: BRAND_COLOR }}>
                TECHNICAL SERVICES
              </span>
            </div>
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
              <span>Client Portal</span>
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
        <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 w-full z-[60] border-t border-gray-100 flex flex-col">
          <div className="px-4 py-6 space-y-2 bg-white">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center px-4 py-4 text-lg font-bold text-white bg-[#3478B4] hover:bg-[#296395] rounded-xl transition-colors shadow-md mb-4"
            >
              <User size={24} className="mr-3" />
              Access Client Portal
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
  return (
    <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
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
            className="block w-full pl-12 pr-24 py-4 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-shadow text-lg"
            placeholder="Search by Machine Model or Error Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
             <button 
                className="px-6 py-2 text-white font-medium rounded-md transition-colors"
                style={{ backgroundColor: BRAND_COLOR }}
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
              <div key={manual.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {manual.size}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-[#3478B4] mb-1 uppercase tracking-wider">{manual.category}</h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{manual.title}</h4>
                  <button className="flex items-center text-sm font-medium text-gray-600 group-hover:text-[#3478B4] transition-colors w-full border-t border-gray-100 pt-4 mt-2">
                    <Download size={16} className="mr-2" /> Download PDF
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

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

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

        {filteredFixes.length > 0 && (
          <div className="space-y-4 mb-8">
            {filteredFixes.map((fix) => (
              <div key={fix.id} className={`border rounded-lg overflow-hidden transition-all duration-200 ${openId === fix.id ? 'border-[#3478B4] ring-1 ring-[#3478B4]' : 'border-gray-200'}`}>
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 focus:outline-none text-left"
                  onClick={() => toggleAccordion(fix.id)}
                >
                  <span className={`font-semibold text-lg ${openId === fix.id ? 'text-[#3478B4]' : 'text-gray-900'}`}>
                    {fix.issue}
                  </span>
                  <ChevronDown className={`transform transition-transform duration-200 ${openId === fix.id ? 'rotate-180 text-[#3478B4]' : 'text-gray-400'}`} size={20} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openId === fix.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-4">Resolution Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-3">
                      {fix.steps.map((step, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed pl-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
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
          <div>
            <div className="flex flex-col text-left border-l-4 pl-3 mb-6" style={{ borderColor: BRAND_COLOR }}>
              <span className="font-bold text-xl leading-tight text-white tracking-tight">Ali Group</span>
              <span className="font-semibold text-xs tracking-wider" style={{ color: BRAND_COLOR }}>
                TECHNICAL SERVICES
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Providing world-class technical support, original spare parts, and comprehensive service manuals for all our global foodservice brands.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#manuals" className="hover:text-white transition-colors">Download Manuals</a></li>
              <li><a href="#fixes" className="hover:text-white transition-colors">Troubleshooting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Support</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center"><Phone size={16} className="mr-3" style={{ color: BRAND_COLOR }} /><span>+1 (800) 555-0199</span></p>
              <p className="flex items-center"><FileText size={16} className="mr-3" style={{ color: BRAND_COLOR }} /><span>support@aligroup-service.demo</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am the Ali Group Support Assistant. How can I help you with your equipment today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Thank you for your message. For immediate assistance with this issue, please check our troubleshooting guide above or submit a support ticket in the Client Portal." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200" style={{ height: '450px' }}>
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: BRAND_COLOR }}>
            <div className="flex items-center"><Bot size={20} className="mr-2" /><span className="font-semibold">Support Assistant</span></div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-[#3478B4] text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
              />
              <button onClick={handleSend} className="bg-[#3478B4] text-white px-3 py-2 rounded-r-md hover:bg-[#296395]">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-[#3478B4] text-white rounded-full p-4 shadow-lg hover:bg-[#296395] flex items-center justify-center">
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

const ClientPortal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState([
    { id: '1', issue: 'Combi Oven Series X - Error Code E-45', status: 'Open', date: 'Oct 1, 2026' }
  ]);
  const [newIssue, setNewIssue] = useState('');

  const MOCK_MACHINES = [
    { id: 'M001', name: 'Combi Oven Series X', serial: 'CX-99201-A', warrantyUntil: '2027-03-15', nextMaintenance: '2026-10-15', status: 'Active' },
    { id: 'M002', name: 'Flight-Type Dishwasher', serial: 'FT-8832-B', warrantyUntil: '2025-11-01', nextMaintenance: '2026-11-01', status: 'Maintenance Due' },
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!newIssue.trim()) return;
    const ticket = {
      id: Date.now().toString(),
      issue: newIssue,
      status: 'Open',
      date: 'Just now'
    };
    setTickets([ticket, ...tickets]);
    setNewIssue('');
    setActiveTab('tickets');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm md:p-6">
       <div className="bg-white md:rounded-2xl shadow-2xl w-full h-full md:max-w-6xl md:h-[85vh] overflow-hidden flex flex-col md:flex-row">
         
         <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
           <div className="flex items-center space-x-3">
             <div className="bg-[#3478B4] p-2 rounded-full text-white"><User size={18} /></div>
             <h2 className="text-lg font-bold text-gray-900">Client Portal</h2>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
         </div>

         <div className="w-full md:w-64 bg-slate-50 border-r border-gray-200 flex flex-col flex-shrink-0">
           <div className="hidden md:flex p-6 border-b border-gray-200 items-center space-x-3">
             <div className="bg-[#3478B4] p-2 rounded-full text-white"><User size={20} /></div>
             <h2 className="text-lg font-bold text-gray-900">Client Portal</h2>
           </div>
           <nav className="flex flex-row md:flex-col p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 bg-white md:bg-transparent">
             <button onClick={() => setActiveTab('dashboard')} className={`md:w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'dashboard' ? 'bg-[#3478B4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
               <LayoutDashboard size={18} /> <span>Dashboard</span>
             </button>
             <button onClick={() => setActiveTab('equipment')} className={`md:w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'equipment' ? 'bg-[#3478B4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
               <Package size={18} /> <span>My Equipment</span>
             </button>
             <button onClick={() => setActiveTab('tickets')} className={`md:w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'tickets' ? 'bg-[#3478B4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
               <List size={18} /> <span>Support Tickets</span>
             </button>
           </nav>
         </div>

         <div className="flex-1 flex flex-col h-full bg-slate-50 md:bg-white relative overflow-y-auto p-6">
           <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:bg-gray-100 p-2 rounded-full hidden md:block"><X size={24} /></button>

           {activeTab === 'dashboard' && (
             <div>
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                   <p className="text-sm font-medium text-gray-500">Total Machines</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">{MOCK_MACHINES.length}</p>
                 </div>
                 <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                   <p className="text-sm font-medium text-gray-500">Active Tickets</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">{tickets.filter(t => t.status === 'Open').length}</p>
                 </div>
                 <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                   <p className="text-sm font-medium text-gray-500">Next Maintenance</p>
                   <p className="text-xl font-bold text-gray-900 mt-1">Oct 15, 2026</p>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'equipment' && (
             <div>
               <h2 className="text-2xl font-bold text-gray-900 mb-6">My Installed Equipment</h2>
               <div className="space-y-4">
                 {MOCK_MACHINES.map((machine) => (
                   <div key={machine.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex justify-between items-center">
                     <div>
                       <h3 className="font-bold text-gray-900">{machine.name}</h3>
                       <p className="text-xs text-gray-500 font-mono mt-1">SN: {machine.serial}</p>
                     </div>
                     <span className={`px-3 py-1 text-xs font-semibold rounded-full ${machine.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                       {machine.status}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'tickets' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                   <Plus size={18} className="mr-2 text-[#3478B4]" /> Open a New Ticket
                 </h3>
                 <form onSubmit={handleSubmitTicket} className="space-y-4">
                   <textarea 
                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3478B4] h-32 text-sm"
                     placeholder="Describe your issue..."
                     value={newIssue}
                     onChange={(e) => setNewIssue(e.target.value)}
                   />
                   <button type="submit" disabled={!newIssue.trim()} className="w-full bg-[#3478B4] hover:bg-[#296395] text-white py-2.5 rounded-lg">
                     Submit Request
                   </button>
                 </form>
               </div>
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                   <List size={18} className="mr-2 text-[#3478B4]" /> Your Ticket History
                 </h3>
                 <div className="space-y-3">
                   {tickets.map(ticket => (
                     <div key={ticket.id} className="p-4 border border-gray-100 rounded-lg bg-slate-50">
                       <div className="flex justify-between items-center mb-1">
                         <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-100 text-amber-800">{ticket.status}</span>
                         <span className="text-xs text-gray-400">{ticket.date}</span>
                       </div>
                       <p className="text-gray-800 text-sm mt-1">{ticket.issue}</p>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 flex flex-col">
      <Header onOpenPortal={() => setShowPortal(true)} />
      <main className="flex-grow">
        <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ManualsSection />
        <TroubleshootingSection searchQuery={searchQuery} />
      </main>
      <Footer />
      <ChatWidget />
      {showPortal && <ClientPortal onClose={() => setShowPortal(false)} />}
    </div>
  );
}
