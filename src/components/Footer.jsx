import React, { useState } from 'react';
import { Send, Instagram, Linkedin, Twitter, Sparkles, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-brand-beige/30 dark:bg-brand-darker border-t border-slate-100 dark:border-slate-800/80 pt-16 pb-12 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Logo & Info column */}
          <div className="md:col-span-4 space-y-5">
            <a href="#" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Tip2Trip Logo" 
                className="h-9 w-9 object-contain rounded-lg shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-brand-green dark:text-white flex items-center">
                Tip<span className="text-brand-red font-extrabold mx-[1px] transform rotate-3">2</span>Trip
              </span>
            </a>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              "Find your trip. Find your tribe."
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We make travel accessible and social for GenZ. Plan itineraries with AI, meet verified travel buddies, and secure easy interest-free checkout plans.
            </p>

            {/* Social handles */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-green dark:hover:text-brand-yellow hover:scale-105 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-green dark:hover:text-brand-yellow hover:scale-105 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-green dark:hover:text-brand-yellow hover:scale-105 transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Directory Links column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <li><a href="#features" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">How It Works</a></li>
                <li><a href="#buddies" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Find Buddies</a></li>
                <li><a href="#dashboard" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <li><a href="#pricing" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Terms of Use</a></li>
                <li><a href="mailto:support@tip2trip.com" className="hover:text-brand-green dark:hover:text-brand-yellow transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Weekly Tribe Digest
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Receive hidden off-beat itineraries, group trips matching requests, and limited-time EMI coupon codes.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green text-slate-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-2 bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 rounded-lg shadow transition-all hover:scale-105"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs font-black text-brand-green dark:text-brand-yellow animate-pulse bg-brand-green/5 py-1.5 px-3 rounded-lg border border-brand-green/10 justify-center">
                <Check size={14} className="stroke-[3]" />
                <span>Subscribed! Check your inbox soon!</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs font-semibold text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Tip2Trip Technologies Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Sparkles size={11} className="text-brand-yellow fill-brand-yellow animate-pulse" /> for wanderers worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
}
