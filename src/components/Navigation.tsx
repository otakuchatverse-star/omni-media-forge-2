import React from 'react';
import { Home, Search, PlusSquare, Play, User, LogOut, Compass, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDesktop?: boolean;
}

export const Navigation = ({ activeTab, onTabChange, isDesktop = false }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629' },
    { id: 'explore', icon: Compass, label: '\u0627\u0633\u062a\u0643\u0634\u0627\u0641' },
    { id: 'reels', icon: Play, label: '\u0631\u064a\u0644\u0632' },
    { id: 'notifications', icon: Heart, label: '\u0627\u0644\u0646\u0634\u0627\u0637' },
    { id: 'profile', icon: User, label: '\u0645\u0644\u0641\u064a' },
  ];

  if (isDesktop) {
    return (
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden',
              activeTab === tab.id 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            )}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="desktop-nav-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
              />
            )}
            <tab.icon 
              size={24} 
              className={cn("transition-transform duration-300", activeTab === tab.id && "scale-110")}
              fill={activeTab === tab.id ? 'currentColor' : 'none'} 
            />
            <span className={cn("font-bold text-lg", activeTab === tab.id && "text-foreground")}>
              {tab.label}
            </span>
          </button>
        ))}
        
        <div className="mt-10 pt-6 border-t border-border">
          <button className="flex items-center gap-4 px-4 py-3.5 w-full text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut size={24} />
            <span className="font-bold text-lg">\u062a\u0633\u062c\u064a\u0644 \u062e\u0631\u0648\u062c</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/5 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center justify-center"
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-300",
              isActive ? "bg-primary/20 text-primary -translate-y-1" : "text-muted-foreground"
            )}>
               <tab.icon 
                  size={26} 
                  fill={isActive ? 'currentColor' : 'none'} 
                  strokeWidth={isActive ? 2.5 : 2}
               />
            </div>
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};