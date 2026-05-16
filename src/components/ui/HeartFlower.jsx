import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower, WifiOff } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const HeartFlower = () => {
  const {
    animasyonDurumu,
    animasyonTipi,
    animasyonParametreleri,
    başlatAnimasyon,
    durdurAnimasyon,
    isOnline
  } = useAnimationStore();

  const [isOpen, setIsOpen] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (animasyonDurumu === 'başladı' && animasyonTipi === 'kalpGül') {
      setIsOpen(true);
      const newPetals = Array(12).fill().map((_, i) => ({
        id: i,
        angle: i * 30,
        delay: i * 0.1
      }));
      setPetals(newPetals);
    } else {
      setIsOpen(false);
      setPetals([]);
    }
  }, [animasyonDurumu, animasyonTipi]);

  const handleClick = () => {
    if (isOpen) {
      durdurAnimasyon();
    } else {
      başlatAnimasyon('kalpGül', animasyonParametreleri);
    }
  };

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
    <div className="flex items-center justify-center relative">
      {!isOnline && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <WifiOff size={16} />
          <span className="text-xs font-medium">Çevrimdışı Mod</span>
        </div>
      )}
      <motion.div
        className="relative w-64 h-64 cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ transform: `scale(${animasyonParametreleri.boyut})` }}
      >
        {/* Kalp */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={animasyonVaryantlari[animasyonTipi || 'fadeIn'].animate}
          transition={{
            duration: animasyonParametreleri.hız,
            ...animasyonVaryantlari[animasyonTipi || 'fadeIn'].transition
          }}
        >
          <Heart
            size={120}
            className={`fill-${isOpen ? 'red-500' : 'transparent'} transition-all duration-300`}
            strokeWidth={1.5}
            style={{ color: animasyonParametreleri.renk }}
          />
        </motion.div>

        {/* Çiçek Yaprakları */}
        <AnimatePresence>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute w-8 h-8"
              style={{ transform: `rotate(${petal.angle}deg) translateY(-60px)` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                delay: petal.delay * animasyonParametreleri.hız,
                duration: 0.5 * animasyonParametreleri.hız,
                ease: "backOut"
              }}
            >
              <Flower
                size={32}
                className="fill-yellow-300"
                style={{ transform: `rotate(${petal.angle * -1}deg)`, color: animasyonParametreleri.renk }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HeartFlower;