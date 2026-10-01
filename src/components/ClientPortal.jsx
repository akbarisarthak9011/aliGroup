import React, { useState } from 'react';
import { X, LayoutDashboard, Wrench, Ticket, LogOut } from 'lucide-react';
import { clientEquipment, supportTickets } from '../data/mockData';

export default function ClientPortal({ setIsPortalOpen, isLoggedIn, setIsLoggedIn }) {
  const [activeTab, setActiveTab] = useState('equipment');

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
          <button onClick={() => setIsPortalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Client Login</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3478B4]" />
            <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3478B4]" />
            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#3478B4] text-white p-3 rounded-md font-bold hover:bg-[#286090]">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar (Desktop) / Top Nav (Mobile) */}
      <div className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 flex flex-row md:flex-col justify-between overflow-x-auto md:overflow-visible shadow-sm z-10">
        <div className="flex flex-row md:flex-col p-2 md:p-4 gap-2 min-w-max md:min-w-0">
          <div className="hidden md:flex justify-between items-center mb-8 px-2">
            <h2 className="text-xl font-bold text-gray-800">My Portal</h2>
            <button onClick={() => setIsPortalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={20}/></button>
          </div>
          
          <button onClick={() => setActiveTab('equipment')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'equipment' ? 'bg-blue-50 text-[#3478B4]' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Wrench size={20} /> <span className="font-medium">My Equipment</span>
          </button>
          <button onClick={() => setActiveTab('tickets')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tickets' ? 'bg-blue-50 text-[#3478B4]' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Ticket size={20} /> <span className="font-medium">Support Tickets</span>
          </button>
        </div>
        <div className="p-4 border-t border-gray-200 hidden md:block">
          <button onClick={() => { setIsLoggedIn(false); setIsPortalOpen(false); }} className="flex items-center gap-3 text-red-600 hover:text-red-700 w-full px-4 py-2 font-medium">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
        {/* Mobile Close Button */}
        <button onClick={() => setIsPortalOpen(false)} className="md:hidden flex items-center justify-center p-4 text-gray-500">
           <X size={24}/>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {activeTab === 'equipment' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Registered Equipment</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {clientEquipment.map(eq => (
                <div key={eq.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{eq.model}</h4>
                  <p className="text-sm text-gray-600 mb-1"><strong>S/N:</strong> {eq.serial}</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Warranty:</strong> <span className={eq.warranty.includes('Active') ? 'text-green-600 font-medium' : 'text-red-600'}>{eq.warranty}</span></p>
                  <p className="text-sm text-gray-600"><strong>Next Service:</strong> {eq.nextService}</p>
                  <button className="mt-4 w-full py-2 border border-[#3478B4] text-[#3478B4] rounded-md hover:bg-blue-50 font-medium">Request Service</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Support History</h3>
              <button className="bg-[#3478B4] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#286090]">New Ticket</button>
            </div>
            <div className="space-y-3">
              {supportTickets.map(ticket => (
                <div key={ticket.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 block mb-1">{ticket.id} • {ticket.date}</span>
                    <p className="font-medium text-gray-800">{ticket.issue}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full w-fit ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
