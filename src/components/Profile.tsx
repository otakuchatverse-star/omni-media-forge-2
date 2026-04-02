import React, { useState, useEffect } from 'react';
import { api, Profile as IProfile } from '../lib/api';
import { User, Grid, Bookmark, Tag, Settings, MapPin, Link as LinkIcon, Edit3, Grid3X3, Video, UserSquare2, Heart } from 'lucide-react'; // Added Heart import
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Profile = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await api.profiles.getAll();
      
      if (error || !data || data.length === 0) {
        setProfile({
          id: 'guest',
          username: 'overse_pioneer',
          display_name: '\u0631\u0627\u0626\u062f \u0623\u0648\u0641\u064a\u0631\u0633',
          bio: '\u0645\u0635\u0645\u0645 \u0648\u0645\u0637\u0648\u0631 \u0634\u063a\u0648\u0641 \u0628\u0628\u0646\u0627\u0621 \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644. \u0645\u0643\u0627\u0646\u064a \u0627\u0644\u0645\u0641\u0636\u0644 \u0647\u0648 \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0631\u0642\u0645\u064a. \u2728',
          avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-1-9b451538-1775145326005.webp'
        });
      } else {
        setProfile(data[0]);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b]">
      <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 bg-[#09090b] text-zinc-100"
    >
      <div className="relative">
        {/* Cover Photo Area */}
        <div className="h-56 w-full bg-zinc-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30"></div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
           <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="px-6 -mt-16 relative z-10">
          <div className="flex items-end justify-between">
            <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-950 p-1.5 shadow-2xl relative group">
               <div className="w-full h-full rounded-[2.2rem] overflow-hidden border-4 border-white/5">
                  {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><User size={40} /></div>
                  )}
               </div>
            </div>
            <div className="flex gap-3 pb-2">
               <button className="p-3 glass rounded-2xl text-foreground hover:bg-white/10 transition-all active:scale-95 shadow-lg">
                  <Settings size={20} />
               </button>
               <button className="bg-primary text-white font-bold py-2.5 px-8 rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                  <Edit3 size={18} />
                  <span>\u062a\u0639\u062f\u064a\u0644</span>
               </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-1">{profile?.display_name}</h1>
              <p className="text-primary font-bold text-lg">@{profile?.username}</p>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              {profile?.bio}
            </p>

            <div className="flex flex-wrap gap-5 text-sm font-bold text-zinc-500">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 glass rounded-lg"><MapPin size={14} className="text-primary" /></div>
                  <span>\u0627\u0644\u0631\u064a\u0627\u0636\u060c \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="p-1.5 glass rounded-lg"><LinkIcon size={14} className="text-secondary" /></div>
                  <span className="text-primary cursor-pointer hover:underline">overse.app/pioneer</span>
               </div>
            </div>

            <div className="flex gap-10 py-6 border-y border-white/5">
               <div className="text-right">
                  <div className="text-2xl font-black">128</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-0.5">\u0645\u0646\u0634\u0648\u0631</div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-black">14.2k</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-0.5">\u0645\u062a\u0627\u0628\u0639</div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-black">842</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-0.5">\u064a\u062a\u0627\u0628\u0639</div>
               </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex p-1.5 glass rounded-[1.5rem] gap-2 mt-8">
               <button 
                 onClick={() => setActiveTab('posts')}
                 className={cn("flex-1 py-3.5 rounded-2xl flex justify-center items-center transition-all", 
                   activeTab === 'posts' ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-foreground")}
                >
                  <Grid3X3 size={22} strokeWidth={2.5} />
               </button>
               <button 
                 onClick={() => setActiveTab('reels')}
                 className={cn("flex-1 py-3.5 rounded-2xl flex justify-center items-center transition-all", 
                   activeTab === 'reels' ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-foreground")}
                >
                  <Video size={22} />
               </button>
               <button 
                 onClick={() => setActiveTab('tagged')}
                 className={cn("flex-1 py-3.5 rounded-2xl flex justify-center items-center transition-all", 
                   activeTab === 'tagged' ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-foreground")}
                >
                  <UserSquare2 size={22} />
               </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <AnimatePresence mode="wait">
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <motion.div 
                    key={`${activeTab}-${i}`} 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square glass rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg active:scale-95 transition-transform"
                  >
                      <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                         {activeTab === 'posts' && <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />} 
                         {activeTab === 'reels' && <Video size={24} className="text-white/20" />} 
                         {activeTab === 'tagged' && <UserSquare2 size={24} className="text-white/20" />} 
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                         <Heart size={16} className="text-white fill-white" />
                         <span className="text-white text-xs font-bold">{Math.floor(Math.random() * 500)}</span>
                      </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};