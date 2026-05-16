import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send } from 'lucide-react';

// Kalp gül animasyon bileşeni
const HeartFlower = ({ isAnimating }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isAnimating ? 1 : 0, scale: isAnimating ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: isAnimating ? 360 : 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-pink-500 rounded-full"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            animate={{ rotate: i * 30, x: 60, y: 0 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Mesaj kutusu bileşeni
const MessageBox = ({ messages, onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 glass-card p-4 rounded-2xl shadow-xl">
      <div className="h-40 overflow-y-auto mb-3 space-y-2">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-3 rounded-xl max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'}`}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bir mesaj yaz..."
          className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Merhaba! Kalbim senin için çiçek açtı. 🌸" }
  ]);

  const handleSendMessage = (text) => {
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);

    // Basit AI yanıtı
    setTimeout(() => {
      let aiResponse;
      if (text.toLowerCase().includes('seviyorum')) {
        aiResponse = "Ben de seni seviyorum! ❤️" + (isAnimating ? "" : " Kalbim daha hızlı çiçek açsın mı?");
        setIsAnimating(true);
      } else if (text.toLowerCase().includes('kalp')) {
        aiResponse = "Kalbim senin için her zaman açılıktır. 💖";
        setIsAnimating(true);
      } else {
        aiResponse = "Seni sevmekten mutluluk duyuyorum. 😊";
      }
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Kalp gül animasyonu */}
      <HeartFlower isAnimating={isAnimating} />

      {/* Ana içerik */}
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-6xl mb-4">
            <Heart className="text-pink-500 animate-pulse" size={64} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Seni Seviyorum</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md">
            Her mesajınla kalbim daha da büyüyor. 💖
          </p>
        </motion.div>
      </div>

      {/* Mesaj kutusu */}
      <MessageBox messages={messages} onSend={handleSendMessage} />
    </div>
  );
}

export default App;