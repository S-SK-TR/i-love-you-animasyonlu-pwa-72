import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAnimationStore from '@/store/animationStore';

const SearchBar = () => {
  const { loveCapsule: { messages }, setCurrentCapsule, isOnline } = useAnimationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Load sort preference from localStorage
  useEffect(() => {
    const savedSort = localStorage.getItem('capsuleSortPreference');
    if (savedSort) {
      setSortOption(savedSort);
    }
  }, []);

  // Save sort preference to localStorage
  useEffect(() => {
    localStorage.setItem('capsuleSortPreference', sortOption);
  }, [sortOption]);

  // Debounce işlevi
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Arama işlemi
  useEffect(() => {
    if (debouncedTerm) {
      const results = messages.filter(message =>
        message.content.toLowerCase().includes(debouncedTerm.toLowerCase())
      );
      setFilteredMessages(results);
    } else {
      setFilteredMessages([]);
    }
  }, [debouncedTerm, messages]);

  // Sıralama işlemi
  useEffect(() => {
    if (filteredMessages.length > 0) {
      const sortedMessages = [...filteredMessages].sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'alphabetical':
            return a.content.localeCompare(b.content);
          default:
            return 0;
        }
      });
      setFilteredMessages(sortedMessages);
    }
  }, [sortOption, filteredMessages]);

  const handleClear = () => {
    setSearchTerm('');
    setFilteredMessages([]);
  };

  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'oldest', label: 'En Eski' },
    { value: 'alphabetical', label: 'İsim Sırası' }
  ];

  return (
    <div className="space-y-4 relative">
      {!isOnline && (
        <div className="absolute -top-10 left-0 z-50 flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <WifiOff size={16} />
          <span className="text-xs font-medium">Çevrimdışı Mod</span>
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Capsule'larda ara..."
          className="w-full p-4 pl-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" size={18} />
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--glass-bg)] transition-colors"
            >
              <X size={18} className="text-[var(--text-muted)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg)]/80 transition-colors"
          >
            Sırala: {sortOptions.find(opt => opt.value === sortOption)?.label}
            <ChevronDown size={16} className="text-[var(--text-muted)]" />
          </button>

          <AnimatePresence>
            {showSortDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-48 rounded-lg glass-card shadow-lg"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOption(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--glass-bg)]/50 transition-colors ${sortOption === option.value ? 'bg-[var(--brand-500)]/10' : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {filteredMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-xl p-4 space-y-3"
          >
            <h3 className="text-sm font-medium text-[var(--text-muted)]">Arama Sonuçları</h3>
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--brand-500)]/30 transition-colors cursor-pointer"
                  onClick={() => setCurrentCapsule(message)}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-[var(--text-muted)] mt-1 block">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;