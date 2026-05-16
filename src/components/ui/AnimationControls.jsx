import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const AnimationControls = () => {
  const {
    animasyonDurumu,
    animasyonTipi,
    animasyonParametreleri,
    başlatAnimasyon,
    durdurAnimasyon,
    güncelleParametreler
  } = useAnimationStore();

  const animasyonTipleri = [
    { id: 'kalpGül', label: 'Kalp ve Çiçek' },
    { id: 'patlama', label: 'Patlama Efekti' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="text-[var(--brand-500)]" size={20} />
          Animasyon Kontrolü
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => animasyonDurumu === 'bitti' ? başlatAnimasyon(animasyonTipi || 'kalpGül', animasyonParametreleri) : durdurAnimasyon()}
            className={`p-2 rounded-lg ${animasyonDurumu === 'bitti' ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'bg-red-500/10 text-red-500'}`}
          >
            {animasyonDurumu === 'bitti' ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Animasyon Tipi</label>
          <select
            value={animasyonTipi || ''}
            onChange={(e) => başlatAnimasyon(e.target.value, animasyonParametreleri)}
            className="w-full p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
          >
            {animasyonTipleri.map((tip) => (
              <option key={tip.id} value={tip.id}>{tip.label}</option>
            ))}
          </select>
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