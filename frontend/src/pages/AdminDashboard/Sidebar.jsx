import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Warehouse, 
  User, Menu, X, Package, FileText, DollarSign, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activePage, setActivePage, handleLogout, isCollapsed, setIsCollapsed }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const brickImg = "/src/assets/img3.jpeg"; 

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-6 z-[60] border-b border-red-700/30">
        <div className="flex items-center gap-3">
          <Warehouse size={20} className="text-red-700" />
          <h1 className="font-black text-sm text-black">VARDHA ADMIN</h1>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div 
        className={`h-screen text-[#F5F5F4] flex flex-col fixed left-0 top-0 shadow-2xl z-[58] border-r border-stone-800 transition-all duration-300 overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-72'}`}
        style={{
          backgroundImage: `linear-gradient(rgba(20, 10, 10, .92), rgba(20, 10, 10, .92)), url(${brickImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`p-6 flex ${isCollapsed ? 'flex-col gap-4' : 'flex-row justify-between'} items-center overflow-hidden`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30 shrink-0">
              <Warehouse size={24} className="text-white" />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <h1 className="font-black text-lg tracking-tight leading-none text-white">VARDHA</h1>
                <p className="text-[10px] text-red-500 font-bold tracking-[1.5px] uppercase mt-1">Warehousing Admin</p>
              </div>
            )}
          </div>
        </div>

        <div><div className="h-[1px] bg-red-700" /></div>

        <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto text-white overflow-x-hidden">
          <NavItem 
            icon={<LayoutDashboard size={22} />} 
            label="Dashboard" 
            active={activePage === 'dashboard'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('dashboard'); setIsMobileOpen(false); }}
          />
          <NavItem 
            icon={<Package size={22} />} 
            label="Enquiries" 
            active={activePage === 'enquiries'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('enquiries'); setIsMobileOpen(false); }}
          />
          <NavItem 
            icon={<FileText size={22} />} 
            label="FAQs" 
            active={activePage === 'faqs'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('faqs'); setIsMobileOpen(false); }}
          />
          
          <NavItem 
            icon={<DollarSign size={22} />} 
            label="Pricing" 
            active={activePage === 'pricing'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('pricing'); setIsMobileOpen(false); }}
          />
          <NavItem 
            icon={<User size={22} />} 
            label="Profile" 
            active={activePage === 'profile'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('profile'); setIsMobileOpen(false); }}
          />
        </nav>

        <div><div className="h-[1.5px] bg-red-700" /></div>

        <div className="p-4 mt-auto border-t border-stone-800">
          <button 
            onClick={handleLogout}
            className={`flex items-center cursor-pointer gap-4 w-full p-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="p-2 group-hover:bg-red-700 rounded-lg text-white group-hover:text-white transition-colors duration-300 shrink-0">
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm group-hover:text-red-700 uppercase tracking-widest text-white whitespace-nowrap">Logout</span>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

const NavItem = ({ icon, label, active, isCollapsed, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group relative border-l-4 ${
      active 
      ? 'bg-stone-800 border-red-700 text-red-700' 
      : 'border-transparent hover:bg-stone-800/50 hover:text-white text-white'
    } ${isCollapsed ? 'justify-center' : ''}`}
  >
    <div className={`shrink-0 ${active ? 'text-red-700' : 'group-hover:text-white'} transition-colors`}>
      {icon}
    </div>
    {!isCollapsed && (
      <span className={`font-semibold text-sm tracking-wide whitespace-nowrap ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
        {label}
      </span>
    )}
  </div>
);

export default Sidebar;
