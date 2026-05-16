import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings, Heart, Sparkles, Zap, Palette, Flower, WifiOff } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const AnimationControls = () => {
  const {
    animasyonDurumu,
    animasyonTipi,
    animasyonParametreleri,
    başlatAnimasyon,
    durdurAnimasyon,
    güncelleParametreler,
    isOnline
  } = useAnimationStore();

  const animasyonTipleri = [
    { id: 'fadeIn', label: 'Yavaş Yavaş Geliş', icon: <Heart className="text-[var(--brand-500)]" size={18} /> },
    { id: 'slideIn', label: 'Kayarak Geliş', icon: <Sparkles className="text-[var(--brand-500)]" size={18} /> },
    { id: 'bounce', label: 'Zıplayan Geliş', icon: <Zap className="text-[var(--brand-500)]" size={18} /> },
    { id: 'float', label: 'Yüzen Geliş', icon: <Flower className="text-[var(--brand-500)]" size={18} /> },
    { id: 'heartPulse', label: 'Kalp Atışı', icon: <Heart className="text-[var(--brand-500)]" size={18} /> }
  ];

  const animasyonVaryantlari = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1 }
    },
    slideIn: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { type: 'spring', stiffness: 100 }
    },
    bounce: {
      initial: { y: -50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { type: 'spring', damping: 5 }
    },
    float: {
      initial: { y: 0 },
      animate: { y: [0, -10, 0] },
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    heartPulse: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.2, 1] },
      transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 space-y-6 relative"
    >
      {!isOnline && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <WifiOff size={16} />
          <span className="text-xs font-medium">Çevrimdışı Mod</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="text-[var(--brand-500)]" size={20} />
          Animasyon Kontrolü
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => animasyonDurumu === 'bitti' ? başlatAnimasyon(animasyonTipi || 'fadeIn', animasyonParametreleri) : durdurAnimasyon()}
            className={`p-2 rounded-lg ${animasyonDurumu === 'bitti' ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'bg-red-500/10 text-red-500'}`}
          >
            {animasyonDurumu === 'bitti' ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Animasyon Tipi</label>
          <div className="grid grid-cols-3 gap-2">
            {animasyonTipleri.map((tip) => (
              <button
                key={tip.id}
                onClick={() => başlatAnimasyon(tip.id, animasyonParametreleri)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${animasyonTipi === tip.id ? 'border-[var(--brand-500)] bg-[var(--brand-500)]/10' : 'border-[var(--glass-border)] hover:bg-[var(--glass-bg)]'}`}
              >
                {tip.icon}
                <span className="text-xs mt-1">{tip.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hız</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={animasyonParametreleri.hız}
            onChange={(e) => güncelleParametreler({ hız: parseFloat(e.target.value) })}
            className="w-full h-2 bg-[var(--glass-bg)] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Boyut</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={animasyonParametreleri.boyut}
            onChange={(e) => güncelleParametreler({ boyut: parseFloat(e.target.value) })}
            className="w-full h-2 bg-[var(--glass-bg)] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Renk</label>
          <input
            type="color"
            value={animasyonParametreleri.renk}
            onChange={(e) => güncelleParametreler({ renk: e.target.value })}
            className="w-full h-10 p-1 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AnimationControls;