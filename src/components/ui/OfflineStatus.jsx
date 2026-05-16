import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const OfflineStatus = () => {
  const { isOnline, setOnlineStatus } = useAnimationStore();

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 p-3 rounded-xl glass-card shadow-lg"
        >
          <WifiOff size={18} className="text-red-500" />
          <span className="text-sm font-medium">Çevrimdışı Mod</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineStatus;