import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <h1 className="text-4xl font-bold text-[var(--brand-500)] mb-4">I Love You</h1>
        <p className="text-xl text-[var(--text-muted)] mb-6">Sana özel bir mesaj</p>
        <Button size="lg" className="mx-auto">Mesajı Oku</Button>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center">
              <Heart className="text-[var(--brand-500)]" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Sevgim</h3>
          </div>
          <p className="text-[var(--text-muted)]">Bu mesaj sadece senin için. Her gün seni hatırlatmak için.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center">
              <MessageCircle className="text-[var(--brand-500)]" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Mesajlar</h3>
          </div>
          <p className="text-[var(--text-muted)]">Sana özel mesajlar ve hatırlatıcılar. Her gün bir yeni mesaj.</p>
        </motion.div>
      </div>

      {/* Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Hazır mısın?</h2>
        <p className="text-[var(--text-muted)] mb-6">Mesajını oku ve sevgini hisset.</p>
        <Button size="lg" className="mx-auto">Şimdi Oku</Button>
      </motion.div>
    </div>
  );
};

export default Home;