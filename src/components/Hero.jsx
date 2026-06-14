import React, { useState } from 'react';
import { Sparkles, Users, ArrowRight, MapPin, Calendar, DollarSign, Search } from 'lucide-react';

export default function Hero() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [budgetType, setBudgetType] = useState('Standard');

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-brand-beige/50 via-white to-transparent dark:from-brand-dark/20 dark:via-brand-darker dark:to-transparent">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl -z-10 animate-float-slow"></div>
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl -z-10 animate-float-medium"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow font-semibold text-xs tracking-wider uppercase">
              <Sparkles size={14} className="animate-pulse" />
              <span>Find your trip. Find your tribe.</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Earn first, travel later?{' '}
              <span className="relative inline-block text-brand-green dark:text-brand-yellow">
                Nah.
                <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-brand-yellow dark:bg-brand-green rounded-full"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl font-medium">
              AI trips, EMIs & travel buddies — all in one. The GenZ way to explore the world without breaking your bank or traveling solo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#dashboard"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-green text-white font-bold text-base hover:bg-brand-green-dark transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-brand-green/30 w-full sm:w-auto"
              >
                <Sparkles size={18} />
                Start Planning
              </a>
              <a
                href="#buddies"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 w-full sm:w-auto shadow-sm"
              >
                <Users size={18} className="text-brand-green dark:text-brand-yellow" />
                Find Travel Buddies
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-md">
              <div>
                <p className="text-3xl font-extrabold text-brand-green dark:text-brand-yellow">24k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Trips Planned</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-brand-green dark:text-brand-yellow">150k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Buddies Matched</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-brand-green dark:text-brand-yellow">0%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Cost EMI Interest</p>
              </div>
            </div>

          </div>

          {/* Interactive Hero Widget / Card Visuals */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Interactive Planner Mock Card */}
            <div className="w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl relative border border-white/20 glow-green-sm">
              <div className="absolute -top-4 -right-4 bg-brand-yellow text-slate-900 px-4 py-1.5 rounded-2xl text-xs font-black shadow-md flex items-center gap-1.5 animate-bounce">
                <Sparkles size={12} className="fill-slate-900" />
                AI POWERED
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                Create Your Next Adventure
              </h3>

              <div className="space-y-4">
                {/* Input 1: Destination */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin size={12} className="text-brand-green dark:text-brand-yellow" />
                    Where to?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Goa, Kasol, Leh Ladakh"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Input 2: Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={12} className="text-brand-green dark:text-brand-yellow" />
                      When?
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Input 3: Budget tier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <DollarSign size={12} className="text-brand-green dark:text-brand-yellow" />
                      Style
                    </label>
                    <select
                      value={budgetType}
                      onChange={(e) => setBudgetType(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                    >
                      <option>Backpacker</option>
                      <option>Standard</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <a
                  href={`#dashboard`}
                  onClick={() => {
                    // Update global state or session variables if required
                    if (destination) {
                      localStorage.setItem('hero_destination', destination);
                      localStorage.setItem('hero_date', date);
                      localStorage.setItem('hero_budget', budgetType);
                      // Trigger a mock update event so Dashboard components can react
                      window.dispatchEvent(new Event('heroPlannerUpdated'));
                    }
                  }}
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-brand-green/30 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Search size={16} />
                  Plan Trip in 3 Seconds
                </a>
              </div>

              {/* Trust Badge at bottom of card */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-black/10 py-1.5 rounded-lg">
                <span>⚡ Starting at only ₹3,499/month (No Cost EMI)</span>
              </div>
            </div>

            {/* Backing Abstract Circles */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-yellow border-4 border-white dark:border-brand-darker rounded-full shadow-lg -z-10 animate-float-slow flex items-center justify-center">
              <span className="text-xl">✈️</span>
            </div>
            <div className="absolute -top-12 -right-6 w-16 h-16 bg-brand-green border-4 border-white dark:border-brand-darker rounded-full shadow-lg -z-10 animate-float-medium flex items-center justify-center">
              <span className="text-lg">🏝️</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
