import { useState } from 'react';
import { User, Phone, MapPin, AlignLeft, Camera, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function Profile({ user, onUpdateSuccess }) {
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be smaller than 2MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Base64 representation of image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('tip2trip_token');
      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, bio, phone, location, avatar }),
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error('Could not connect to the backend server. Please verify the API server is running on port 5000.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      onUpdateSuccess(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Network error: Could not reach the server. Please verify the backend server is running on http://localhost:5000.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 bg-brand-beige/10 dark:bg-brand-darker relative overflow-hidden text-left">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -z-10 animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl -z-10 animate-float-medium"></div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          Account Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Avatar Edit Section (Left) */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="glass-card p-6 border border-slate-100 dark:border-slate-800/80 rounded-3xl w-full flex flex-col items-center text-center shadow-md">
              <div className="relative group cursor-pointer h-32 w-32 rounded-full overflow-hidden border-4 border-brand-green dark:border-brand-yellow shrink-0">
                <img
                  src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Upload Hover Overlay */}
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <Camera size={20} />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Change photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-4 leading-tight">
                {name || 'Traveler'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {user?.email}
              </p>
              <div className="mt-4 p-2 rounded-xl bg-brand-green/10 text-brand-green dark:bg-brand-yellow/10 dark:text-brand-yellow text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <Sparkles size={11} className="fill-current" />
                Verified Explorer
              </div>
            </div>
          </div>

          {/* Settings Form Section (Right) */}
          <div className="md:col-span-8">
            <div className="glass-card p-6 md:p-8 border border-white/20 rounded-3xl shadow-lg">
              
              {/* Alert Logs */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-start gap-2.5 text-xs font-bold leading-relaxed animate-shake">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-brand-green/10 border border-brand-green/20 text-brand-green flex items-start gap-2.5 text-xs font-bold leading-relaxed animate-pulse">
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>Profile updated successfully! Session saved.</span>
                </div>
              )}

              {/* Edit Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <User size={12} className="text-brand-green dark:text-brand-yellow" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                  />
                </div>

                {/* Bio text */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlignLeft size={12} className="text-brand-green dark:text-brand-yellow" />
                    Wanderer Bio
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell the tribe a little bit about yourself, travel frequencies, or beach styles..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white resize-none"
                  />
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Phone size={12} className="text-brand-green dark:text-brand-yellow" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin size={12} className="text-brand-green dark:text-brand-yellow" />
                      Current Location
                    </label>
                    <input
                      type="text"
                      placeholder="Delhi, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-800 dark:text-white"
                    />
                  </div>

                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Check size={14} />
                      Save Details
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
