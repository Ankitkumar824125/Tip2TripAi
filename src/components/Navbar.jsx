import { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowRight, LogOut } from 'lucide-react';

export default function Navbar({ darkMode, toggleDarkMode, user, currentPage, onNavigate, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Find Buddies', href: '#buddies' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Community', href: '#community' },
    { label: 'Pricing', href: '#pricing' }
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuItemClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Switch to home view if currently on profile or auth sub-pages
    if (currentPage !== 'home') {
      onNavigate('home');
    }

    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b glass-panel border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            <a href="#home" onClick={handleLogoClick} className="flex items-center gap-2">
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
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleMenuItemClick(e, item.href)}
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-brand-yellow transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-green dark:bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} className="text-brand-yellow animate-spin-slow" /> : <Moon size={18} className="text-brand-green" />}
            </button>

            {/* Auth States */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Link */}
                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                    currentPage === 'profile'
                      ? 'bg-brand-green/15 text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow border border-brand-green/20 dark:border-brand-yellow/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                    alt={user.name}
                    className="h-5 w-5 rounded-full object-cover shrink-0"
                  />
                  <span>{user.name.split(' ')[0]}</span>
                </button>

                {/* Sign Out */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Sign In */}
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2.5 text-slate-750 dark:text-slate-200 hover:text-brand-green dark:hover:text-brand-yellow font-bold text-sm transition-colors cursor-pointer"
                >
                  Sign In
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => onNavigate('signup')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-brand-green/20 cursor-pointer"
                >
                  Sign Up
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
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
        <div className="md:hidden glass-panel border-t border-white/10 py-4 px-6 absolute top-20 left-0 w-full shadow-xl animate-fade-in text-left">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleMenuItemClick(e, item.href)}
                className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-brand-green dark:hover:text-brand-yellow py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <hr className="border-slate-200 dark:border-slate-800/60 my-2" />
            
            {user ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('profile');
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                    alt={user.name}
                    className="h-5 w-5 rounded-full object-cover shrink-0"
                  />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-sm"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('login');
                  }}
                  className="flex items-center justify-center px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('signup');
                  }}
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-brand-green text-white font-bold text-sm shadow-md"
                >
                  Sign Up
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
