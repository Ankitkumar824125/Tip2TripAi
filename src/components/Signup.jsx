import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle, User } from 'lucide-react';

export default function Signup({ onNavigate, onSignupSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field Valdiation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store session token
      localStorage.setItem('tip2trip_token', data.token);
      
      // Callback to login user in state
      onSignupSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-brand-beige/10 dark:bg-brand-darker">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-brand-green/15 rounded-full blur-3xl -z-10 animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-yellow/15 rounded-full blur-3xl -z-10 animate-float-medium"></div>

      <div className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl border border-white/20 glow-green-sm">
        
        {/* Header segment */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow font-bold text-[10px] tracking-wider uppercase">
            <Sparkles size={11} className="animate-pulse" />
            <span>Join the Wanderer Tribe</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Create An Account
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Sign up to plan trips, split costs, and meet buddies instantly.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-start gap-2.5 text-xs font-bold leading-relaxed text-left animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <User size={12} className="text-brand-green dark:text-brand-yellow" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alex Wanderer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Mail size={12} className="text-brand-green dark:text-brand-yellow" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Lock size={12} className="text-brand-green dark:text-brand-yellow" />
              Password (min. 6 chars)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Lock size={12} className="text-brand-green dark:text-brand-yellow" />
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-brand-green/30 flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Create Tribe Membership'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-brand-green dark:text-brand-yellow font-black hover:underline cursor-pointer"
          >
            Sign In Instead
          </button>
        </p>

      </div>
    </div>
  );
}
