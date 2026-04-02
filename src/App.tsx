import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { Feed } from './components/Feed';
import { Stories } from './components/Stories';
import { Profile } from './components/Profile';
import { Search, Bell, Mail, PlusCircle, TrendingUp, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils'; // Added import

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
            <Stories />
            <Feed />
          </motion.div>
        );
      case 'profile':
        return (
           <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Profile />
          </motion.div>
        );
      default:
        return (
          <motion.div 
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-zinc-500 p-10 text-center"
          >
            <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-900 glass flex items-center justify-center mb-8 relative">
               <PlusCircle size={48} className="text-primary opacity-50" />
               <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-xl animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-black mb-3 text-white">\u0642\u064a\u062f \u0627\u0644\u062a\u0647\u064a\u0626\u0629</h2>
            <p className="max-w-xs mb-10 text-zinc-400 font-medium">\u0646\u062d\u0646 \u0646\u0628\u0646\u064a \u062a\u062c\u0631\u0628\u0629 \u0641\u0631\u064a\u062f\u0629 \u0644\u0643 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645. \u062a\u0648\u0642\u0639 \u0627\u0644\u0643\u062b\u064a\u0631 \u0642\u0631\u064a\u0628\u0627\u064b! \u2728</p>
            <button 
              onClick={() => setActiveTab('home')}
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25"
            >
              \u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062a\u0635\u0641\u062d
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 rtl selection:bg-primary selection:text-white" dir="rtl">
      <Toaster position="top-center" theme="dark" richColors closeButton />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 right-0 h-full w-80 border-l border-white/5 bg-zinc-950/40 backdrop-blur-2xl z-50 p-8 flex-col shadow-2xl">
        <div className="mb-12">
           <h1 className="text-4xl font-black gradient-text tracking-tighter italic cursor-pointer" onClick={() => setActiveTab('home')}>OVERSE</h1>
        </div>
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} isDesktop />
      </div>

      {/* Main Content Area */}
      <div className="lg:mr-80 lg:ml-[28%] flex justify-center min-h-screen">
        <div className="w-full max-w-2xl px-0 sm:px-6 pb-28 lg:pb-12">
          
          {/* Top Navbar (Mobile / Floating) */}
          <header className={cn(
             "sticky top-0 z-40 transition-all duration-500",
             scrolled ? "glass-dark mt-4 mx-4 rounded-3xl py-4 px-6 shadow-2xl translate-y-2" : "bg-transparent py-8 px-6"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="lg:hidden">
                  <h1 className="text-3xl font-black gradient-text italic tracking-tighter cursor-pointer" onClick={() => setActiveTab('home')}>OVERSE</h1>
                </div>
                <div className="hidden lg:flex items-center gap-3 text-sm font-bold text-zinc-400">
                  <Compass size={18} className="text-primary" />
                  <span>\u0645\u062d\u0631\u0643 \u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-5">
                <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 relative">
                   <Bell size={22} className="text-zinc-300" />
                   <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-zinc-950 animate-pulse"></span>
                </button>
                <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90">
                   <Mail size={22} className="text-zinc-300" />
                </button>
                <button className="lg:hidden p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90">
                   <Search size={22} className="text-zinc-300" />
                </button>
              </div>
            </div>
          </header>

          <main className="mt-4">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Desktop Right Panel */}
      <div className="hidden 2xl:flex fixed top-0 left-0 h-full w-80 border-r border-white/5 bg-zinc-950/20 p-8 flex-col gap-8">
         <div className="glass rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
               <TrendingUp size={20} className="text-primary" />
               <h3 className="font-black text-lg">\u0627\u0644\u062a\u0648\u062c\u0647\u0627\u062a</h3>
            </div>
            <div className="space-y-6">
               {[ 
                 { tag: '#OVERSE_24', count: '12.5k' },
                 { tag: '#Digital_Art', count: '8.2k' },
                 { tag: '#Future_Web', count: '5.1k' },
                 { tag: '#Riyadh_Dev', count: '3.9k' }
               ].map((item) => (
                 <div key={item.tag} className="group cursor-pointer">
                   <div className="text-sm text-primary font-bold group-hover:underline">{item.tag}</div>
                   <div className="text-[11px] text-zinc-500 mt-0.5">{item.count} \u0645\u0634\u0627\u0631\u0643\u0629</div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors text-zinc-400">
               \u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f
            </button>
         </div>

         <div className="glass rounded-[2rem] p-8 shadow-xl">
            <h3 className="font-black text-lg mb-6">\u0645\u0628\u062f\u0639\u0648\u0646 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629</h3>
            <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/5 overflow-hidden group-hover:border-primary/50 transition-colors">
                       <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                    </div>
                    <div className="flex-1">
                       <div className="text-sm font-black">\u0641\u0646\u0627\u0646_{i}</div>
                       <div className="text-[10px] text-zinc-500 font-bold">\u062a\u0627\u0628\u0639\u0647 \u062d\u062f\u064a\u062b\u0627\u064b</div>
                    </div>
                    <button className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors">
                       <PlusCircle size={20} />
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default App;