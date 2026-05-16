import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Trash2, AlertTriangle, WifiOff } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';

const CapsuleDetail = () => {
  const {
    loveCapsule: { messages, currentCapsule },
    addMessage,
    removeMessage,
    setCurrentCapsule,
    isOnline
  } = useAnimationStore();

  const [newMessage, setNewMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [capsuleToDelete, setCapsuleToDelete] = useState(null);

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newMessage,
        animationType: 'fadeIn',
        createdAt: new Date().toISOString()
      };
      addMessage(message);
      setLastMessage(newMessage);
      setShowNotification(true);
      setNewMessage('');
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleDeleteCapsule = () => {
    if (currentCapsule) {
      setCapsuleToDelete(currentCapsule.id);
      setShowDeleteModal(true);
    }
  };

  const confirmDeleteCapsule = () => {
    // Optimistic update
    const originalCapsule = currentCapsule;
    setCurrentCapsule(null);
    setShowDeleteModal(false);

    // In a real app, you would call an API here
    // For this example, we'll simulate a successful deletion
    setTimeout(() => {
      // If the API call fails, you would revert the state
      // setCurrentCapsule(originalCapsule);
    }, 1000);
  };

  if (!currentCapsule) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <p className="text-[var(--text-muted)]">Lütfen önce bir capsule oluşturun</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 space-y-6 relative"
    >
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-50 flex items-center gap-2 p-4 rounded-xl bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 text-[var(--brand-500)] shadow-lg"
          >
            <Heart size={18} className="text-[var(--brand-500)]" />
            <span className="text-sm">{lastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOnline && (
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <WifiOff size={16} />
          <span className="text-xs font-medium">Çevrimdışı Mod</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="text-[var(--brand-500)]" size={20} />
          {currentCapsule.name || 'Love Capsule'}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--text-muted)]">
            {new Date(currentCapsule.createdAt).toLocaleDateString('tr-TR')}
          </span>
          <button
            onClick={handleDeleteCapsule}
            className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-muted)]">
            Henüz mesaj yok. İlk mesajınızı ekleyin.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-[var(--text-muted)] mt-1 block">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <button
                  onClick={() => removeMessage(message.id)}
                  className="p-1 rounded-full hover:bg-[var(--glass-bg)] transition-colors"
                >
                  <Trash2 size={16} className="text-[var(--text-muted)]" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleAddMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Yeni bir mesaj yazın..."
          className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-[var(--brand-500)] text-white hover:bg-[var(--brand-500)]/90 transition-colors flex items-center justify-center"
        >
          <Plus size={18} />
        </button>
      </form>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="glass-card rounded-2xl w-full max-w-md p-6 space-y-6"
            >
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle size={20} />
                <h3 className="text-lg font-semibold">Capsule Silme</h3>
              </div>
              <p className="text-[var(--text-muted)]">
                Bu capsule'ı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDeleteCapsule}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-500/90 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Sil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CapsuleDetail;