import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Moon, Sun } from 'lucide-react';
import Button from '@/components/ui/Button';

const Settings = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center">
            <SettingsIcon className="text-[var(--brand-500)]" size={24} />
          </div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell size={20} />
              <div>
                <h3 className="font-medium">Bildirimler</h3>
                <p className="text-sm text-[var(--text-muted)]">Mesaj ve güncellemeler için bildirimleri ayarla</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Düzenle</Button>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Moon size={20} />
              <div>
                <h3 className="font-medium">Tema</h3>
                <p className="text-sm text-[var(--text-muted)]">Uygulama temasını seç</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Sun size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Moon size={16} />
              </Button>
            </div>
          </div>

          {/* Account */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SettingsIcon size={20} />
              <div>
                <h3 className="font-medium">Hesap</h3>
                <p className="text-sm text-[var(--text-muted)]">Hesap bilgilerini yönet</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Düzenle</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;