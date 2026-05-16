import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Image, WifiOff } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const CapsuleModal = ({ isOpen, onClose }) => {
  const { setCurrentCapsule, updateCapsuleTheme, isOnline } = useAnimationStore();
  const [capsuleName, setCapsuleName] = useState('');
  const [themeColor, setThemeColor] = useState('#3b82f6'); // varsayılan mavi
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCapsule = {
      id: Date.now().toString(),
      name: capsuleName,
      theme: themeColor,
      createdAt: new Date().toISOString()
    };
    setCurrentCapsule(newCapsule);
    updateCapsuleTheme(themeColor);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 15 }}
            className="glass-card rounded-2xl w-full max-w-md p-6 space-y-6 relative"
          >
            {!isOnline && (
              <div className="absolute top-4 right-4 z-50 flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                <WifiOff size={16} />
                <span className="text-xs font-medium">Çevrimdışı Mod</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Palette className="text-[var(--brand-500)]" size={20} />
                Capsule Oluştur
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-[var(--glass-bg)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Capsule Adı</label>
                <input
                  type="text"
                  value={capsuleName}
                  onChange={(e) => setCapsuleName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
                  placeholder="Örneğin: 'Sevgilim için Anılar'"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tema Rengi</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-12 h-12 p-1 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özel Arka Plan</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] cursor-pointer hover:bg-[var(--glass-bg)]/80 transition-colors text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Image size={18} className="inline-block mr-2" />
                    Resim Yükle
                  </label>
                </div>
                {backgroundImage && (
                  <div className="mt-2 p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <img
                      src={backgroundImage}
                      alt="Önizleme"
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[var(--brand-500)] text-white hover:bg-[var(--brand-500)]/90 transition-colors flex items-center gap-2"
                >
                  <Palette size={16} />
                  Oluştur
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CapsuleModal;