import { useState } from 'react';
import { Sparkles, Calendar, Receipt, MessageCircleCode, ShieldAlert, Eye, ArrowUpRight } from 'lucide-react';

export default function Features() {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      icon: <Sparkles size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'AI Trip Planner',
      description: 'Get custom multi-day itineraries tailormade to your budget, style, and mood in under 3 seconds.',
      badge: 'GenAI',
      color: 'bg-green-500/10 text-green-700 dark:text-green-300',
      details: 'Our AI model analyzes millions of travel diaries, local reviews, and weather predictions to build the optimal daily itinerary for you. Adjust pace, travel styles, and custom routes instantly.'
    },
    {
      icon: <Calendar size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'Travel Now, Pay Later',
      description: 'Book flights and stays using no-interest EMIs. Travel now, pay back in flexible 3, 6, or 9-month chunks.',
      badge: '0% EMI',
      color: 'bg-yellow-500/10 text-yellow-800 dark:text-brand-yellow',
      details: 'Say goodbye to large upfront costs. We partner with top fintech lenders to offer instant interest-free credit lines, allowing you to secure flights, stays, and activities today.'
    },
    {
      icon: <Receipt size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'Group Cost Split',
      description: 'Split costs directly within your group. Keep tabs on shared tabs without messy spreadsheet bills.',
      badge: 'Auto-Split',
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      details: 'No more "who owes whom". Log group expenses on the go. The system automatically computes equal or custom splits and lets members pay their share directly via integrated wallets.'
    },
    {
      icon: <MessageCircleCode size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'Community Updates',
      description: 'Get real-time social stories, local tips, and reviews from travelers currently at your destination.',
      badge: 'Social Feed',
      color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      details: 'Connect with a global web of travel buddies. Discover trending local food stalls, crowded routes, and hidden parties as posted by actual travelers on our LinkedIn/Instagram style community feed.'
    },
    {
      icon: <ShieldAlert size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'Safety Alerts',
      description: 'Stay ahead of local strikes, extreme weather, and tourist scams with prompt geofenced safety alerts.',
      badge: '24/7 Safety',
      color: 'bg-brand-red/10 text-brand-red',
      details: 'Travel with peace of mind. Our safety system monitors global news feeds, local weather channels, and traveler reports to push instant safety updates directly to your timeline.'
    },
    {
      icon: <Eye size={24} className="text-brand-green dark:text-brand-yellow" />,
      title: 'Discover Hidden Spots',
      description: 'Skip standard tourist traps. Explore off-beat trails, secret viewpoints, and local gems curated by locals.',
      badge: 'Underground',
      color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
      details: 'Tired of over-crowded locations? Get access to our secret database of verified, crowd-free spots complete with geo-coordinates and tips on the best times to visit.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-brand-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
            Feature Highlights
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Built for the modern traveler who wants it all.
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Ditch the multiple apps. Plan, budget, socialize, and finance your dream trip all under a single dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={feat.title}
              onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              className={`group cursor-pointer rounded-3xl p-8 transition-all duration-300 border text-left flex flex-col justify-between ${
                activeCard === idx
                  ? 'glass-card border-brand-green/40 dark:border-brand-yellow/40 shadow-xl scale-[1.02] glow-green-sm'
                  : 'bg-brand-beige/30 dark:bg-brand-cardDark/40 border-slate-100 dark:border-slate-800/80 hover:border-brand-green/20 dark:hover:border-brand-yellow/20 hover:scale-[1.01] hover:shadow-md'
              }`}
            >
              <div>
                {/* Top row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-800">
                    {feat.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${feat.color}`}>
                    {feat.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Expansion Detail Area */}
              <div className={`transition-all duration-300 overflow-hidden ${activeCard === idx ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4 leading-relaxed bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                  {feat.details}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="flex items-center gap-1 mt-6 text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                <span>{activeCard === idx ? 'Click to hide details' : 'Click to read more'}</span>
                <ArrowUpRight size={14} className={`transform transition-transform ${activeCard === idx ? 'rotate-90' : ''}`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
