import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Camera, Music, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import HeartFlower from '@/components/ui/HeartFlower';
import AnimationControls from '@/components/ui/AnimationControls';
import LoveCapsuleManager from '@/components/ui/LoveCapsuleManager';

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
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
          className="text-4xl font-bold text-[var(--brand-500)] mb-4"
        >
          I Love You
        </motion.h1>
        <p className="text-xl text-[var(--text-muted)] mb-6">Sana özel bir mesaj</p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            delay: 0.4
          }}
        >
          <HeartFlower />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 10,
            delay: 0.6
          }}
        >
          <Button size="lg" className="mx-auto">Mesajı Oku</Button>
        </motion.div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kart 1 - Büyük */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:col-span-2 row-span-2 flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-4">Özel Animasyon</h2>
          <HeartFlower />
          <p className="text-[var(--text-muted)] mt-4">Tıklayarak çiçekleri açabilirsiniz</p>
        </motion.div>

        {/* Kart 2 - Orta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center mb-4">
            <Heart className="text-[var(--brand-500)]" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sevgim</h3>
          <p className="text-[var(--text-muted)] text-center">Bu mesaj sadece senin için. Her gün seni hatırlatmak için.</p>
        </motion.div>

        {/* Kart 3 - Küçük */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center mb-4">
            <MessageCircle className="text-[var(--brand-500)]" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Mesajlar</h3>
          <p className="text-[var(--text-muted)] text-center">Sana özel mesajlar ve hatırlatıcılar.</p>
        </motion.div>

        {/* Kart 4 - Küçük */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center mb-4">
            <Camera className="text-[var(--brand-500)]" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Anılar</h3>
          <p className="text-[var(--text-muted)] text-center">Paylaşılan anılar galerisi.</p>
        </motion.div>

        {/* Kart 5 - Orta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl p-6 md:col-span-2 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center mb-4">
            <Music className="text-[var(--brand-500)]" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Müzik</h3>
          <p className="text-[var(--text-muted)] text-center">Sana özel müzik koleksiyonu.</p>
        </motion.div>

        {/* Kart 6 - Küçük */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center mb-4">
            <BookOpen className="text-[var(--brand-500)]" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Hikayeler</h3>
          <p className="text-[var(--text-muted)] text-center">Birlikte geçirdiğimiz anılar.</p>
        </motion.div>

        {/* Animasyon Kontrol Kartı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-2xl p-0"
        >
          <AnimationControls />
        </motion.div>

        {/* Love Capsule Manager Kartı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card rounded-2xl p-0 md:col-span-2"
        >
          <LoveCapsuleManager />
        </motion.div>
      </div>

      {/* Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
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