import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Ananya Roy',
      role: 'Postgrad Student',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120',
      review: 'I wanted to visit Munnar and Kerala for ages but couldn\'t afford a flat ₹50k outlay. With Tip2Trip EMI planning, I paid just ₹4,500/month. Plus, I met Kabir on the matching pool — we ended up sharing stays and cut our costs in half!',
      rating: 5,
      trip: 'Munnar, Kerala'
    },
    {
      name: 'Vikram Malhotra',
      role: 'UI Designer / Freelancer',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120',
      review: 'Solo travel can get lonely, and group packages feel too structured. Tip2Trip let me outline an AI itinerary, drop it in the feed, and pull 2 amazing designers to ride around Ladakh. Best road trip of my life!',
      rating: 5,
      trip: 'Leh Ladakh'
    },
    {
      name: 'Nisha Patel',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120',
      review: 'The geofenced safety alerts are real. While trekking in Himachal, we got an instant alert about flash floods and relocated our camp early. The cost splitter kept our accounting stress-free too. 10/10 recommend!',
      rating: 5,
      trip: 'Kasol, Himachal'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-brand-beige/20 dark:bg-brand-dark relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
            Happy Wanderers
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Loved by 10,000+ Travelers
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Main Card */}
          <div className="glass-card border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl text-left relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* Background Quote Icon */}
            <Quote className="absolute right-8 top-8 text-brand-green/10 dark:text-brand-yellow/10 h-24 w-24 transform translate-x-4 -translate-y-4 pointer-events-none" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-brand-yellow fill-brand-yellow" />
              ))}
            </div>

            {/* Review content */}
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 font-medium italic leading-relaxed mb-8">
              "{current.review}"
            </p>

            {/* Author details */}
            <div className="flex items-center justify-between gap-4 flex-wrap pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-3.5">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="h-11 w-11 rounded-full object-cover border border-brand-green dark:border-brand-yellow"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    {current.role}
                  </p>
                </div>
              </div>

              {/* Trip Highlight Tag */}
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow text-xs font-extrabold uppercase">
                ✈️ Highlight: {current.trip}
              </span>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
