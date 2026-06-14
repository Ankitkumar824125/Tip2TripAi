import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Find Buddies', href: '#buddies' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Community', href: '#community' },
    { label: 'Pricing', href: '#pricing' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b glass-panel border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Tip2Trip Logo" 
                className="h-10 w-10 object-contain rounded-lg shadow-sm"
              />
              <span className="text-2xl font-bold tracking-tight text-brand-green dark:text-white flex items-center">
                Tip<span className="text-brand-red font-extrabold mx-[2px] transform rotate-3">2</span>Trip
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-brand-yellow transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-green dark:bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} className="text-brand-yellow animate-spin-slow" /> : <Moon size={18} className="text-brand-green" />}
            </button>
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-brand-green/20"
            >
              Start Planning
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Sun size={18} className="text-brand-yellow" /> : <Moon size={18} className="text-brand-green" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 py-4 px-6 absolute top-20 left-0 w-full shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-brand-green dark:hover:text-brand-yellow py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-slate-200 dark:border-slate-800/60 my-2" />
            <a
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-green text-white font-medium text-sm transition-all shadow-md"
            >
              Start Planning
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
