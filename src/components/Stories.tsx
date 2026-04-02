import React, { useEffect, useState } from 'react';
import { api, Story } from '../lib/api';
import { Plus, User } from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK_STORIES: Story[] = [
  {
    id: 's1',
    user_id: 'u1',
    created_at: new Date().toISOString(),
    profiles: {
      id: 'p1',
      username: 'traveler',
      display_name: '\u0639\u0627\u0634\u0642 \u0627\u0644\u0633\u0641\u0631',
      avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-1-9b451538-1775145326005.webp'
    }
  },
  {
    id: 's2',
    user_id: 'u2',
    created_at: new Date().toISOString(),
    profiles: {
      id: 'p2',
      username: 'creative_mind',
      display_name: '\u0645\u0628\u062f\u0639',
      avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-2-606bcc62-1775145325122.webp'
    }
  },
  {
    id: 's3',
    user_id: 'u3',
    created_at: new Date().toISOString(),
    profiles: {
      id: 'p3',
      username: 'tech_guru',
      display_name: '\u062e\u0628\u064a\u0631 \u062a\u0642\u0646\u064a',
      avatar_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/706c0069-826b-4552-9f03-9e82ad69b42a/avatar-1-9b451538-1775145326005.webp'
    }
  }
];

export const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await api.stories.getAll();
      if (error) {
        setStories(FALLBACK_STORIES);
      } else if (data && data.length > 0) {
        setStories(data);
      } else {
        setStories(FALLBACK_STORIES);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="flex gap-5 overflow-x-auto py-2 px-4 no-scrollbar">
      <div className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-muted border-2 border-dashed border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <User className="text-muted-foreground group-hover:text-primary transition-colors" size={32} />
          </div>
          <button className="absolute -bottom-1 -right-1 bg-primary text-white rounded-xl p-1.5 border-4 border-background shadow-lg transition-transform group-hover:scale-110">
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
        <span className="text-[11px] text-muted-foreground font-bold group-hover:text-foreground">\u0642\u0635\u062a\u0643</span>
      </div>

      {stories.map((story, i) => (
        <motion.div
          key={story.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-20 h-20 rounded-3xl p-[3px] bg-gradient-to-tr from-primary via-secondary to-accent group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[1.4rem] border-4 border-background overflow-hidden bg-card">
              {story.profiles?.avatar_url ? (
                <img
                  src={story.profiles.avatar_url}
                  className="w-full h-full object-cover"
                  alt={story.profiles.username}
                />
              ) : (
                 <div className="w-full h-full flex items-center justify-center bg-muted">
                    <User className="text-muted-foreground" />
                 </div>
              )}
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground font-bold truncate w-20 text-center group-hover:text-foreground">
            {story.profiles?.display_name || story.profiles?.username}
          </span>
        </motion.div>
      ))}
    </div>
  );
};