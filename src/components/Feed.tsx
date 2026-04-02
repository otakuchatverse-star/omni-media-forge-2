import React, { useEffect, useState } from 'react';
import { api, Post } from '../lib/api';
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const FALLBACK_POSTS: Post[] = [
  {
    id: '1',
    user_id: 'u1',
    created_at: new Date().toISOString(),
    content: '\u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644 \u0647\u0646\u0627 \u0641\u064a \u0623\u0648\u0641\u064a\u0631\u0633! \ud83d\ude80 \u062a\u0635\u0645\u064a\u0645 \u0639\u0635\u0631\u064a \u0648\u062a\u062c\u0631\u0628\u0647 \u0645\u0633\u062a\u062e\u062f\u0645 \u0641\u0631\u064a\u062f\u0629. #OVERSE #UIUX',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/post-image-1-bd9d88ef-1775145331980.webp',
    profiles: {
      id: 'p1',
      username: 'ahmed_dev',
      display_name: '\u0623\u062d\u0645\u062f \u0627\u0644\u0645\u0637\u0648\u0631',
      avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-1-9b451538-1775145326005.webp'
    }
  },
  {
    id: '2',
    user_id: 'u2',
    created_at: new Date().toISOString(),
    content: '\u0627\u0644\u0625\u0628\u062f\u0627\u0639 \u0644\u0627 \u062d\u062f\u0648\u062f \u0644\u0647.. \ud83c\udfa8 #\u0641\u0646 #\u062a\u0635\u0645\u064a\u0645',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/post-image-2-b7d1d0c4-1775145326148.webp',
    profiles: {
      id: 'p2',
      username: 'sara_design',
      display_name: '\u0633\u0627\u0631\u0629 \u0627\u0644\u0645\u0635\u0645\u0645\u0629',
      avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-2-606bcc62-1775145325122.webp'
    }
  }
];

export const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await api.posts.getAll();
      
      if (error) {
        setPosts(FALLBACK_POSTS);
      } else if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(FALLBACK_POSTS);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4">
        {[1,2].map(i => (
           <div key={i} className="w-full aspect-[4/5] rounded-3xl bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 px-4">
      {posts.map((post) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          key={post.id}
          className="glass rounded-[2rem] overflow-hidden shadow-2xl relative group"
        >
          {/* Post Header */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-muted overflow-hidden border-2 border-white/5">
                {post.profiles?.avatar_url ? (
                  <img src={post.profiles.avatar_url} alt={post.profiles.display_name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full p-2 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-foreground">{post.profiles?.display_name || post.profiles?.username}</h3>
                <p className="text-[10px] text-muted-foreground font-medium">24 \u062f\u0642\u064a\u0642\u0629</p>
              </div>
            </div>
            <button className="text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Post Image */}
          {post.image_url && (
            <div className="px-5 pb-2">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted relative group-hover:shadow-primary/20 transition-shadow duration-500">
                <img src={post.image_url} alt="post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}

          {/* Post Content */}
          <div className="px-6 py-4">
            <p className="text-sm leading-relaxed text-foreground/90 font-medium">{post.content}</p>
          </div>

          {/* Post Actions */}
          <div className="p-5 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/btn">
                  <Heart size={24} className="group-hover/btn:scale-125 transition-transform" />
                  <span className="text-xs font-bold">1.2k</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/btn">
                  <MessageCircle size={24} className="group-hover/btn:scale-125 transition-transform" />
                  <span className="text-xs font-bold">84</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group/btn">
                  <Share2 size={24} className="group-hover/btn:scale-125 transition-transform" />
                </button>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
               <Bookmark size={24} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};