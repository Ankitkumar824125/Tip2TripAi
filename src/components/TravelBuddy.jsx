import { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, MessageCircle, Heart, UserCheck } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function TravelBuddy() {
  const [selectedDest, setSelectedDest] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);

  const destinations = ['All', ...new Set(buddies.map(b => b.destination))];

  const fetchBuddies = () => {
    fetch(`${API_URL}/api/buddies`)
      .then(res => res.json())
      .then(data => {
        setBuddies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching buddies:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  // Sync with Hero search events to focus the filter and fetch any newly generated buddies
  useEffect(() => {
    const handlePlannerUpdate = () => {
      const savedDest = localStorage.getItem('hero_destination');
      if (savedDest) {
        const formatted = savedDest.charAt(0).toUpperCase() + savedDest.slice(1).toLowerCase();
        setSelectedDest(formatted);
      }
      fetchBuddies();
    };
    window.addEventListener('heroPlannerUpdated', handlePlannerUpdate);
    return () => window.removeEventListener('heroPlannerUpdated', handlePlannerUpdate);
  }, []);

  const handleConnect = (id) => {
    fetch(`${API_URL}/api/buddies/${id}/connect`, { method: 'POST' })
      .then(res => res.json())
      .then(updatedBuddy => {
        setBuddies(buddies.map(b => b.id === id ? updatedBuddy : b));
      })
      .catch(err => console.error('Error connecting:', err));
  };

  const handleLike = (id) => {
    fetch(`${API_URL}/api/buddies/${id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(updatedBuddy => {
        setBuddies(buddies.map(b => b.id === id ? updatedBuddy : b));
      })
      .catch(err => console.error('Error liking:', err));
  };

  const filteredBuddies = buddies.filter(buddy => {
    const destMatch = selectedDest === 'All' || buddy.destination === selectedDest;
    const searchMatch = buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        buddy.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        buddy.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return destMatch && searchMatch;
  });

  return (
    <section id="buddies" className="py-20 bg-white dark:bg-brand-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left max-w-2xl space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
              Vibe-Check Matcher
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Find Travel Buddies
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Meet travelers who match your frequency. Skip the awkward solo dinners and split cost tags together.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search destination, interest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green text-slate-800 dark:text-white"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {destinations.map(dest => (
            <button
              key={dest}
              onClick={() => setSelectedDest(dest)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selectedDest === dest
                  ? 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {dest === 'All' ? '🌍 All Destinations' : dest}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Loading travel buddies...</p>
          </div>
        ) : filteredBuddies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuddies.map(buddy => {
              const isConnected = buddy.connected;
              const isLiked = buddy.liked;

              return (
                <div
                  key={buddy.id}
                  className="glass-card border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden hover:scale-[1.01] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top segment with match percentage */}
                  <div className="p-6 pb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={buddy.avatar}
                          alt={buddy.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-brand-green dark:border-brand-yellow"
                        />
                        {/* Glow active marker */}
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                      </div>
                      
                      {/* Title Info */}
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                          {buddy.name}
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            ({buddy.age})
                          </span>
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-brand-green dark:text-brand-yellow" />
                          {buddy.destination}
                        </p>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow px-2.5 py-1.5 rounded-xl text-center shrink-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase">Match</p>
                      <p className="text-base font-black leading-tight flex items-center justify-center gap-0.5">
                        <Sparkles size={11} className="fill-current animate-pulse" />
                        {buddy.match}%
                      </p>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="px-6 text-left space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      "{buddy.bio}"
                    </p>

                    {/* Interest Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {buddy.interests.map(interest => (
                        <span
                          key={interest}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 text-[11px] font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/40"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions segment */}
                  <div className="p-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between mt-6 bg-slate-50/50 dark:bg-black/10">
                    {/* Quick Like */}
                    <button
                      onClick={() => handleLike(buddy.id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isLiked 
                          ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:scale-105'
                      }`}
                    >
                      <Heart size={16} className={isLiked ? 'fill-rose-500' : ''} />
                    </button>

                    {/* Connect Button */}
                    <button
                      onClick={() => handleConnect(buddy.id)}
                      className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                        isConnected
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm cursor-default'
                          : 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 hover:scale-[1.02] shadow-md'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <UserCheck size={14} />
                          Connected
                        </>
                      ) : (
                        <>
                          <MessageCircle size={14} />
                          Connect Vibe
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto border border-dashed border-slate-200 dark:border-slate-800">
            <span className="text-3xl">🏜️</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">No matching buddies found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Try searching a different keyword, destination, or tag.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
