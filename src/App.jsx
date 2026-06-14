import { useState, useEffect } from 'react';
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

// Import New Authentication Components
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [authLoading, setAuthLoading] = useState(true);

  // Synchronize darkMode class on HTML root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Verify user session on mount
  useEffect(() => {
    const token = localStorage.getItem('tip2trip_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Session expired');
          }
          return res.json();
        })
        .then(userData => {
          setUser(userData);
          Promise.resolve().then(() => setAuthLoading(false));
        })
        .catch(err => {
          console.error('Session verify failed:', err);
          localStorage.removeItem('tip2trip_token');
          Promise.resolve().then(() => setAuthLoading(false));
        });
    } else {
      Promise.resolve().then(() => setAuthLoading(false));
    }
  }, []);

  // Route protection logic: redirect unauthenticated users away from protected views
  useEffect(() => {
    if (!authLoading && currentPage === 'profile' && !user) {
      Promise.resolve().then(() => setCurrentPage('login'));
    }
  }, [currentPage, user, authLoading]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('tip2trip_token');
    setUser(null);
    setCurrentPage('home');
  };

  // Global loading screen during auth session verification
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-beige/10 dark:bg-brand-darker">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-brand-green"></div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 font-semibold">Initializing Tribe Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-brand-beige/10 dark:bg-brand-darker text-slate-800 dark:text-slate-100 selection:bg-brand-green/20 selection:text-brand-green dark:selection:bg-brand-yellow/20 dark:selection:text-brand-yellow">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      {/* Main Page Content Switches */}
      <main className="space-y-0">
        {currentPage === 'login' && (
          <Login
            onNavigate={setCurrentPage}
            onLoginSuccess={(userData) => {
              setUser(userData);
              setCurrentPage('home');
            }}
          />
        )}
        
        {currentPage === 'signup' && (
          <Signup
            onNavigate={setCurrentPage}
            onSignupSuccess={(userData) => {
              setUser(userData);
              setCurrentPage('home');
            }}
          />
        )}

        {currentPage === 'profile' && user && (
          <Profile
            user={user}
            onUpdateSuccess={(updatedUser) => {
              setUser(updatedUser);
            }}
          />
        )}

        {currentPage === 'home' && (
          <>
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
          </>
        )}
      </main>

      {/* Section 9: Branding Footer */}
      <Footer />
      
    </div>
  );
}

export default App;
