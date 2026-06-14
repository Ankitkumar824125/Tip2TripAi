import { useState } from 'react';
import { Check, Info, Sparkles } from 'lucide-react';

export default function Pricing() {
  // EMI Calculator States
  const [tripBudget, setTripBudget] = useState(30000);
  const [emiTenure, setEmiTenure] = useState(6); // 3, 6, 9 months

  const calculateMonthlyEmi = () => {
    return Math.round(tripBudget / emiTenure);
  };

  const pricingPlans = [
    {
      title: 'Free Vibe',
      price: '₹0',
      period: 'forever',
      desc: 'Perfect for casual solo planning and quick trips.',
      features: [
        '3 AI itineraries per month',
        'Standard travel buddy matching',
        'Basic local safety alerts',
        'Ad-supported feed browsing'
      ],
      cta: 'Plan for Free',
      popular: false
    },
    {
      title: 'Pro Wanderer',
      price: '₹299',
      period: 'month',
      desc: 'Unlock optimal AI predictions and premium travel metrics.',
      features: [
        'Unlimited AI itinerary queries',
        'High-match % priority pairing',
        'Interactive timeline budget logs',
        'Ad-free community feed experience',
        'Offline PDF schedule exporting'
      ],
      cta: 'Upgrade to Pro',
      popular: true
    },
    {
      title: 'Group Tribe',
      price: '₹699',
      period: 'month / group',
      desc: 'Collaborate with your travel crew under a single split tab.',
      features: [
        'Supports up to 8 active buddies',
        'Direct multi-bank split cost wallet',
        'Shared timeline check-in checklists',
        'Premium safety alerts for all members',
        'Group activities cost optimization'
      ],
      cta: 'Start Tribe Plan',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-brand-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
            Flexible Packages
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Pricing Plans & EMI Calculator
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Choose a plan that matches your frequency, or estimate your monthly installments below.
          </p>
        </div>

        {/* Interactive EMI Calculator Widget */}
        <div className="glass-card border border-brand-green/20 dark:border-brand-yellow/20 rounded-3xl p-6 md:p-8 shadow-xl max-w-3xl mx-auto mb-20 text-left relative glow-green-sm">
          <div className="absolute -top-3.5 right-6 bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Sparkles size={11} className="fill-current animate-pulse" />
            Interest-free EMI
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            0% Interest EMI Cost Estimator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Slide to check how much you pay per month for your boutique package.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Slider Input Column */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Slider Budget */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Trip Cost Estimate
                  </label>
                  <span className="text-lg font-black text-slate-800 dark:text-white">
                    ₹{tripBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={tripBudget}
                  onChange={(e) => setTripBudget(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-100 dark:bg-slate-800 accent-brand-green dark:accent-brand-yellow cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>₹10,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              {/* Tenure selector buttons */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Select Repayment Period
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 9].map((m) => (
                    <button
                      key={m}
                      onClick={() => setEmiTenure(m)}
                      className={`py-2 rounded-xl font-bold text-xs transition-all ${
                        emiTenure === m
                          ? 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {m} Months tenure
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Column */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center shadow-inner flex flex-col justify-between min-h-[180px]">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Monthly Installment
                </p>
                <p className="text-4xl font-black text-brand-green dark:text-brand-yellow mt-3">
                  ₹{calculateMonthlyEmi().toLocaleString('en-IN')}{' '}
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">/mo</span>
                </p>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal flex items-start gap-1 justify-center mt-4 bg-white/40 dark:bg-black/10 p-2 rounded-lg">
                <Info size={12} className="shrink-0 mt-0.5" />
                <span className="text-left font-medium">
                  Approval is instant at checkout with 0% extra interest charges or downpayments.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-brand-green dark:border-brand-yellow scale-[1.03] shadow-xl md:-translate-y-2 glow-green-sm'
                  : 'border-slate-100 dark:border-slate-800/80 hover:border-brand-green/20 dark:hover:border-brand-yellow/20 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Highly Matched ⭐
                </span>
              )}

              {/* Title & Price */}
              <div className="text-left">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {plan.title}
                </h4>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">
                  {plan.desc}
                </p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold ml-1 uppercase">
                    / {plan.period}
                  </span>
                </div>

                <hr className="border-slate-100 dark:border-slate-800/60 my-6" />

                {/* Features */}
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <div className="h-5 w-5 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 mt-8 ${
                  plan.popular
                    ? 'bg-brand-green text-white dark:bg-brand-yellow dark:text-slate-900 hover:scale-[1.01] shadow-md hover:shadow-brand-green/20'
                    : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800/80'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
