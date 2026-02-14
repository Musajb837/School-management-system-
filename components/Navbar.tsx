
import React from 'react';
import { View, User } from '../types';
import { GraduationCap, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isLoggedIn, user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const NavItem = ({ view, label }: { view: View; label: string }) => (
    <button
      onClick={() => { setView(view); setIsMenuOpen(false); }}
      className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
        currentView === view ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="glass-nav border-b sticky top-0 z-[60] h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('home')}
        >
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <GraduationCap size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">EduStream</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <NavItem view="home" label="Home" />
          <NavItem view="courses" label="Courses" />
          <NavItem view="about" label="About" />
          <NavItem view="contact" label="Contact" />
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <UserIcon size={14} className="text-indigo-600" />
                <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('login')}
              className="bg-indigo-600 text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b shadow-2xl flex flex-col p-6 gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <NavItem view="home" label="Home" />
          <NavItem view="courses" label="Courses" />
          <NavItem view="about" label="About" />
          <NavItem view="contact" label="Contact" />
          <div className="border-t pt-4">
             {isLoggedIn ? (
               <div className="flex items-center justify-between">
                 <span className="font-bold">{user?.name}</span>
                 <button onClick={logout} className="text-red-500 font-bold text-xs uppercase">Logout</button>
               </div>
             ) : (
               <button 
                onClick={() => { setView('login'); setIsMenuOpen(false); }}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
               >
                 Login / Register
               </button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
