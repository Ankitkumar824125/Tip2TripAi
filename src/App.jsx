import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TravelBuddy from './components/TravelBuddy';
import TripDashboard from './components/TripDashboard';
import CommunityFeed from './components/CommunityFeed';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Synchronize darkMode class on HTML root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-brand-beige/10 dark:bg-brand-darker text-slate-800 dark:text-slate-100 selection:bg-brand-green/20 selection:text-brand-green dark:selection:bg-brand-yellow/20 dark:selection:text-brand-yellow">
      
      {/* Navigation Header */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Page Layout Sections */}
      <main className="space-y-0">
        
        {/* Section 1: Hero Banner & Planner Input */}
        <Hero />

        {/* Section 2: Features Grid */}
        <Features />

        {/* Section 3: Stepper Roadmap */}
        <HowItWorks />

        {/* Section 4: Travel Buddy Vibe Checker */}
        <TravelBuddy />

        {/* Section 5: Timeline Dashboard Panel */}
        <TripDashboard />

        {/* Section 6: Community Broadcast Feed */}
        <CommunityFeed />

        {/* Section 7: User Testimonials slider */}
        <Testimonials />

        {/* Section 8: Pricing Cards & EMI Estimation tool */}
        <Pricing />

      </main>

      {/* Section 9: Branding Footer */}
      <Footer />
      
    </div>
  );
}

export default App;
