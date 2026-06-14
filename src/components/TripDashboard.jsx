import { useState, useEffect } from 'react';
import { CloudRain, Sun, CloudSun, AlertTriangle, ShieldCheck, Plus, Smile, Meh, Frown, Sparkles, PlaneTakeoff } from 'lucide-react';

export default function TripDashboard() {
  const [activeDestination, setActiveDestination] = useState('Goa');
  const [activeDate, setActiveDate] = useState('');
  const [activeBudget, setActiveBudget] = useState('Standard');
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');

  // Read destination changes from the Hero planner input
  useEffect(() => {
    const handlePlannerUpdate = () => {
      const savedDest = localStorage.getItem('hero_destination');
      if (savedDest) {
        const formatted = savedDest.charAt(0).toUpperCase() + savedDest.slice(1).toLowerCase();
        setActiveDestination(formatted);
      }
      const savedDate = localStorage.getItem('hero_date');
      if (savedDate) setActiveDate(savedDate);
      const savedBudget = localStorage.getItem('hero_budget');
      if (savedBudget) setActiveBudget(savedBudget);
    };
    handlePlannerUpdate(); // run once on mount
    window.addEventListener('heroPlannerUpdated', handlePlannerUpdate);
    return () => window.removeEventListener('heroPlannerUpdated', handlePlannerUpdate);
  }, []);

  // Fetch trip data when activeDestination or activeBudget changes
  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) setLoading(true);
    });
    fetch(`/api/trips/${activeDestination}?budget=${activeBudget}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setTripData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching trip details:', err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [activeDestination, activeBudget]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(expenseAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && expenseTitle.trim() !== '') {
      fetch(`/api/trips/${activeDestination}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: expenseTitle,
          amount: parsedAmount
        })
      })
        .then(res => res.json())
        .then(updatedTrip => {
          setTripData(updatedTrip);
          setExpenseAmount('');
          setExpenseTitle('');
        })
        .catch(err => console.error('Error adding expense:', err));
    }
  };

  const handleSetVibeMood = (mood) => {
    fetch(`/api/trips/${activeDestination}/mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vibeMood: mood
      })
    })
      .then(res => res.json())
      .then(updatedTrip => {
        setTripData(updatedTrip);
      })
      .catch(err => console.error('Error setting mood:', err));
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
      case 'clear skies':
        return <Sun className="text-amber-500 animate-spin-slow" size={24} />;
      case 'cloudy':
      case 'mostly cloudy':
        return <CloudSun className="text-sky-400" size={24} />;
      case 'rainy':
      case 'showers':
        return <CloudRain className="text-blue-400" size={24} />;
      default:
        return <Sun className="text-amber-500" size={24} />;
    }
  };

  const budgetLimit = tripData ? tripData.budgetLimit : 40000;
  const budgetSpent = tripData ? tripData.budgetSpent : 0;
  const vibeMood = tripData ? tripData.vibeMood : 'Chill';
  const recentExpenses = tripData ? tripData.recentExpenses : [];
  const currentData = tripData || {
    weather: { temp: '--', condition: 'Loading' },
    safety: { status: 'Loading', desc: '', type: 'ok' },
    timeline: []
  };

  const getProgressWidth = () => {
    const pct = (budgetSpent / budgetLimit) * 100;
    return `${Math.min(pct, 100)}%`;
  };

  const getProgressColor = () => {
    const pct = (budgetSpent / budgetLimit) * 100;
    if (pct > 95) return 'bg-brand-red';
    if (pct > 80) return 'bg-amber-500';
    return 'bg-brand-green dark:bg-brand-yellow';
  };

  return (
    <section id="dashboard" className="py-20 bg-brand-beige/25 dark:bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="text-left space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
              Interactive Live Feed
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Trip Timeline Dashboard
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage itineraries, budget allocations, live warnings, and mood states instantly.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
            {['Goa', 'Kasol', 'Leh'].map((dest) => (
              <button
                key={dest}
                onClick={() => setActiveDestination(dest)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeDestination === dest
                    ? 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Feed (Left) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card border border-white/20 rounded-3xl p-6 md:p-8 shadow-lg text-left relative min-h-[300px]">
              {loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-30 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-bold">Updating dashboard...</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80 gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <PlaneTakeoff className="text-brand-green dark:text-brand-yellow" />
                    Journey Roadmap: {activeDestination}
                  </h3>
                  {(activeDate || activeBudget) && (
                    <div className="flex flex-wrap gap-2 mt-1.5 ml-8 text-[11px] font-bold text-slate-500">
                      {activeDate && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">📅 Starts: {activeDate}</span>}
                      {activeBudget && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">💰 Style: {activeBudget}</span>}
                    </div>
                  )}
                </div>
                <span className="bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow px-3 py-1 rounded-full text-xs font-black uppercase shrink-0">
                  {currentData.timeline.length} Days Active
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="relative border-l-2 border-brand-green/35 dark:border-brand-yellow/35 ml-4 pl-8 space-y-10">
                {currentData.timeline.map((item, idx) => (
                  <div key={item.day} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[41px] top-0 h-6 w-6 rounded-full border-4 border-white dark:border-brand-darker bg-brand-green dark:bg-brand-yellow flex items-center justify-center text-[10px] font-black text-white dark:text-slate-900">
                      {idx + 1}
                    </span>

                    {/* Day Content */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xs font-extrabold text-brand-green dark:text-brand-yellow uppercase tracking-widest">
                          {item.day}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">• {item.time}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {item.activity}
                      </p>

                      {/* Timeline specific warning alert */}
                      {item.alert && (
                        <div className="mt-3 flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200/40 text-xs font-semibold">
                          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                          <span>{item.alert}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Widgets Panel (Right) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Widget 1: Weather & Safety */}
            <div className="glass-card border border-white/20 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="font-bold text-base text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Live Conditions
              </h3>
              
              {/* Weather Row */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 shadow-sm mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Local Weather</p>
                  <p className="text-lg font-black text-slate-800 dark:text-white mt-1">
                    {currentData.weather.condition}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {currentData.weather.temp}
                  </span>
                  {getWeatherIcon(currentData.weather.condition)}
                </div>
              </div>

              {/* Safety Alert Row */}
              <div className={`p-4 rounded-2xl border ${
                currentData.safety.type === 'warn'
                  ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200/40 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/40 text-emerald-800 dark:text-emerald-300'
              } flex gap-3`}>
                <div className="mt-0.5">
                  {currentData.safety.type === 'warn' ? (
                    <AlertTriangle size={20} className="text-amber-500 animate-pulse" />
                  ) : (
                    <ShieldCheck size={20} className="text-emerald-500" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Safety Status: {currentData.safety.status}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {currentData.safety.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 2: Interactive Expense Tracker */}
            <div className="glass-card border border-white/20 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="font-bold text-base text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Budget Tracker
              </h3>

              {/* Budget Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-extrabold text-slate-500 uppercase">Cash Outflow</span>
                  <span className="text-sm font-black text-slate-800 dark:text-white">
                    ₹{budgetSpent.toLocaleString('en-IN')} /{' '}
                    <span className="text-xs text-slate-400 font-semibold">
                      ₹{budgetLimit.toLocaleString('en-IN')}
                    </span>
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200/40 dark:border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${getProgressColor()}`}
                    style={{ width: getProgressWidth() }}
                  ></div>
                </div>
                {budgetSpent > budgetLimit && (
                  <p className="text-[11px] font-bold text-brand-red animate-pulse">
                    ⚠️ Budget Alert: You have exceeded your limit! Split soon!
                  </p>
                )}
              </div>

              {/* Add Expense Form */}
              <form onSubmit={handleAddExpense} className="mt-6 space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                <p className="text-xs font-bold text-slate-500 uppercase">Mock Split / Add Expense</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Item title"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green text-slate-800 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-green text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} />
                  Add Shared Tab
                </button>
              </form>

              {/* Recent lists */}
              <div className="mt-4 space-y-2">
                {recentExpenses.slice(0, 2).map((exp, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50/50 dark:bg-black/10 border border-slate-100/30">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{exp.title}</span>
                    <span className="font-black text-brand-green dark:text-brand-yellow">₹{exp.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Live Mood Vibe Check */}
            <div className="glass-card border border-white/20 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="font-bold text-base text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Trip Mood Check
              </h3>

              <div className="flex justify-around items-center py-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={() => handleSetVibeMood('Awesome')}
                  className={`p-2 rounded-xl transition-all ${
                    vibeMood === 'Awesome'
                      ? 'bg-brand-green/20 dark:bg-brand-yellow/20 scale-110 text-brand-green dark:text-brand-yellow'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Smile size={24} className="stroke-[2.5]" />
                </button>
                <button
                  onClick={() => handleSetVibeMood('Chill')}
                  className={`p-2 rounded-xl transition-all ${
                    vibeMood === 'Chill'
                      ? 'bg-brand-green/20 dark:bg-brand-yellow/20 scale-110 text-brand-green dark:text-brand-yellow'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Meh size={24} className="stroke-[2.5]" />
                </button>
                <button
                  onClick={() => handleSetVibeMood('Tired')}
                  className={`p-2 rounded-xl transition-all ${
                    vibeMood === 'Tired'
                      ? 'bg-brand-green/20 dark:bg-brand-yellow/20 scale-110 text-brand-green dark:text-brand-yellow'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Frown size={24} className="stroke-[2.5]" />
                </button>
              </div>

              {/* Vibe Status Box */}
              <div className="mt-4 p-3 rounded-xl bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow border border-brand-green/10 text-xs font-black text-center flex items-center justify-center gap-1.5 uppercase tracking-wide">
                <Sparkles size={12} className="animate-spin-slow" />
                Vibe Level: {vibeMood === 'Awesome' || vibeMood === 'Happy' ? '🤩 AMAZING!' : vibeMood === 'Chill' ? '🧘 COZY & CHILL' : '😴 NEEDS ESPRESSO'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
