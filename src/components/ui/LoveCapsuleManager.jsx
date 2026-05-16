import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Palette } from 'lucide-react';
import useAnimationStore from '@/store/animationStore';
import Button from './Button';

const LoveCapsuleManager = () => {
  const {
    loveCapsule: { messages, currentCapsule },
    addMessage,
    removeMessage,
    setCurrentCapsule,
    updateCapsuleTheme
  } = useAnimationStore();

  const [newMessage, setNewMessage] = useState('');
  const [newTheme, setNewTheme] = useState('');

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        id: Date.now().toString(),
        content: newMessage,
        animationType: 'kalpGül',
        createdAt: new Date().toISOString()
      });
      setNewMessage('');
    }
  };

  const handleCreateCapsule = () => {
    setCurrentCapsule({
      id: Date.now().toString(),
      theme: newTheme || 'default',
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Palette className="text-[var(--brand-500)]" size={20} />
        Love Capsule Yönetimi
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Yeni Mesaj</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Özel bir mesaj yazın..."
              className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
            />
            <Button onClick={handleAddMessage}>
              <Plus size={18} />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tema</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              placeholder="Tema adı (örn: romantik, şefkatli)"
              className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
            />
            <Button onClick={handleCreateCapsule}>Kapsül Oluştur</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mevcut Mesajlar</h3>
        {messages.length > 0 ? (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <motion.li
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p>{msg.content}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMessage(msg.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--text-muted)]">Henüz mesaj yok. Yukarıdaki formu kullanarak ekleyin.</p>
        )}
      </div>

      {currentCapsule && (
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Mevcut Kapsül</h3>
          <p>Tema: {currentCapsule.theme}</p>
          <p className="text-xs text-[var(--text-muted)]">
            Oluşturulma: {new Date(currentCapsule.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoveCapsuleManager;