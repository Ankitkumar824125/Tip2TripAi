import React, { useState } from 'react';
import { Compass, Users, Sparkles, CreditCard, ArrowRight, Check } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Compass size={24} />,
      title: 'Choose Destination',
      subtitle: 'Where is your mind heading?',
      desc: 'Select a hotspot or let our AI recommend trending GenZ travel nodes (like Goa, Kasol, Leh Ladakh, or Udaipur) based on your budget, style, and travel duration.',
      interactiveData: {
        title: 'Popular Right Now',
        items: ['🇮🇳 Goa, Beaches', '🇮🇳 Kasol, Himachal', '🇮🇳 Leh Ladakh, Mountains', '🇮🇳 Udaipur, Rajasthan'],
        badge: 'Trending 🔥'
      }
    },
    {
      icon: <Users size={24} />,
      title: 'Match Travel Buddies',
      subtitle: 'Vibe check before boarding',
      desc: 'Find travelers heading to the exact same place during your dates. Filter by age, gender, interests (foodie, trekker, clubber), and review their social scores.',
      interactiveData: {
        title: 'Matching Vibe Filters',
        items: ['🎒 Backpacker (Budget)', '🌶️ Food Lover (Street Food)', '🥾 Trekker (Wilderness)', '🎉 Club Hopper (Nightlife)'],
        badge: '14,210 online'
      }
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Plan with AI',
      subtitle: 'Instant Custom Itinerary',
      desc: 'No more copy-pasting Excel templates. Our travel engine builds a dynamic day-by-day timeline, maps safety routes, check-ins, local weather, and suggests budget plans.',
      interactiveData: {
        title: 'Itinerary Output Fields',
        items: ['📍 Day 1: Vagator Beach Sunset', '🍜 Day 2: Panaji Street Food Crawl', '🌅 Day 3: Dudhsagar Falls Trek', '🛡️ Safety Alert: High tide warning'],
        badge: 'Takes 3s ⚡'
      }
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Book with EMI',
      subtitle: '0% Interest, Instant Approval',
      desc: 'Splitting is easy. Secure flights and boutique stays by paying a minor fraction upfront. Pay the rest in interest-free monthly installments. Split shared bills automatically.',
      interactiveData: {
        title: 'Payment Breakdown Example',
        items: ['✈️ Flights: ₹1,500/mo', '🏨 Boutique Stay: ₹1,200/mo', '🎟️ Activity Passes: ₹400/mo', '🎉 Total EMI: ₹3,100/mo'],
        badge: 'No Hidden Fees 💳'
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-brand-beige/20 dark:bg-brand-dark relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
            Four Simple Steps
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How Tip2Trip Works
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            From dreaming to booking in minutes. Here is the seamless journey to your next vacation.
          </p>
        </div>

        {/* Stepper Timeline & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-brand-green/30 dark:border-brand-yellow/30 shadow-md scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-white/40 dark:hover:bg-slate-900/30'
                  }`}
                >
                  {/* Step indicator bubble */}
                  <div className={`flex items-center justify-center p-3 rounded-xl transition-colors shrink-0 ${
                    isActive
                      ? 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Step texts */}
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-brand-green dark:text-brand-yellow tracking-widest uppercase">
                      Step {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {step.subtitle}
                    </p>
                    <p className={`text-sm text-slate-600 dark:text-slate-400 mt-2 transition-all overflow-hidden duration-300 ${
                      isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Interactive Screen Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm glass-card border border-white/20 rounded-3xl p-6 shadow-xl relative min-h-[350px] flex flex-col justify-between">
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Preview Screen
                </span>
                <span className="bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow px-2.5 py-1 rounded-full text-[10px] font-black uppercase">
                  {steps[activeStep].interactiveData.badge}
                </span>
              </div>

              {/* Body inside mockup */}
              <div className="py-6 flex-grow flex flex-col justify-center">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 text-left mb-4 uppercase tracking-wider">
                  {steps[activeStep].interactiveData.title}
                </h4>

                <div className="space-y-3">
                  {steps[activeStep].interactiveData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm text-left animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="h-5 w-5 rounded-full bg-brand-green/15 text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow flex items-center justify-center shrink-0">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom control inside mockup */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  Step {activeStep + 1} of 4
                </span>
                <button
                  onClick={() => setActiveStep((activeStep + 1) % 4)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-green dark:bg-brand-yellow text-white dark:text-slate-900 font-extrabold text-xs shadow-md transition-all hover:scale-105"
                >
                  Next Step
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
