import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Send, Image, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  const handleLike = (id) => {
    fetch(`${API_URL}/api/posts/${id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(updatedPost => {
        setPosts(posts.map(post => post.id === id ? updatedPost : post));
      })
      .catch(err => console.error('Error liking post:', err));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPostContent.trim() === '') return;

    fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newPostContent,
        location: newPostLocation
      })
    })
      .then(res => res.json())
      .then(newPost => {
        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setNewPostLocation('');
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 3000);
      })
      .catch(err => console.error('Error creating post:', err));
  };

  return (
    <section id="community" className="py-20 bg-white dark:bg-brand-darker relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-brand-green dark:text-brand-yellow uppercase">
            Tribe Broadcast
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Community Feed
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Real experiences from real travelers. Check live updates, photos, and team-up proposals.
          </p>
        </div>

        {/* Create Post Card */}
        <div className="glass-card border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-md mb-10 text-left">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120"
                alt="Your Avatar"
                className="h-10 w-10 rounded-full object-cover border border-brand-green dark:border-brand-yellow"
              />
              <div className="flex-grow">
                <textarea
                  rows="3"
                  placeholder="Share a travel tip, find a buddy, or post a vibe check..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm text-slate-800 dark:text-white placeholder-slate-400 font-medium resize-none"
                />
              </div>
            </div>

            {/* Post actions row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex gap-3">
                {/* Location input fields */}
                <input
                  type="text"
                  placeholder="📍 Add location (e.g. Goa)"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-green hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Attach Photo (Mock)"
                >
                  <Image size={18} />
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <span>Broadcast</span>
                <Send size={12} />
              </button>
            </div>
          </form>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 bg-brand-green text-white px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
            <Check size={16} className="stroke-[3]" />
            <span className="text-xs font-black">Post Broadcasted to the Tribe!</span>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Loading tribe broadcast feed...</p>
            </div>
          ) : posts.map(post => (
            <div
              key={post.id}
              className="glass-card border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-md text-left space-y-4 hover:scale-[1.005] transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3.5">
                  <img
                    src={post.avatar}
                    alt={post.name}
                    className="h-11 w-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {post.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                      {post.handle} • {post.time}
                    </p>
                  </div>
                </div>

                {/* Location tag */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-green/5 text-brand-green dark:text-brand-yellow text-[11px] font-bold">
                  📍 {post.location}
                </span>
              </div>

              {/* Text content */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {post.content}
              </p>

              {/* Post Image (optional) */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 max-h-[300px]">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Action buttons footer */}
              <div className="flex gap-6 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    post.liked
                      ? 'text-rose-500'
                      : 'text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart size={16} className={post.liked ? 'fill-rose-500' : ''} />
                  <span>{post.likes}</span>
                </button>
                
                <button
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-green transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
