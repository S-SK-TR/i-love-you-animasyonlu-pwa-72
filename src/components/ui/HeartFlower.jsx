import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const HeartFlower = () => {
  const {
    animasyonDurumu,
    animasyonTipi,
    animasyonParametreleri,
    başlatAnimasyon,
    durdurAnimasyon
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

  return (
    <div className="flex items-center justify-center">
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
          animate={{
            scale: isOpen ? [1, 1.1, 1] : 1,
            rotate: isOpen ? [0, 10, -10, 0] : 0
          }}
          transition={{
            duration: isOpen ? 0.8 * animasyonParametreleri.hız : 0.3 * animasyonParametreleri.hız,
            ease: "easeInOut"
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

        {/* Patlama Efekti */}
        {isOpen && animasyonTipi === 'patlama' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.5, 0], opacity: [0.8, 0] }}
            transition={{ duration: 0.8 * animasyonParametreleri.hız, ease: "easeOut" }}
          >
            <div className="w-full h-full rounded-full bg-red-500/20" style={{ backgroundColor: `${animasyonParametreleri.renk}20` }} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeartFlower;