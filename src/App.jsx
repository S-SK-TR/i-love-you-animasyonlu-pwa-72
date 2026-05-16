import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Palette } from 'lucide-react';
import AnimationControls from '@/components/ui/AnimationControls';
import HeartFlower from '@/components/ui/HeartFlower';
import CapsuleModal from '@/components/ui/CapsuleModal';
import CapsuleDetail from '@/components/ui/CapsuleDetail';
import SearchBar from '@/components/ui/SearchBar';
import OfflineStatus from '@/components/ui/OfflineStatus';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <OfflineStatus />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <AnimationControls />
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full p-3 rounded-lg bg-[var(--brand-500)] text-white hover:bg-[var(--brand-500)]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Palette size={18} />
                Capsule Oluştur
              </button>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <SearchBar />
              <Routes>
                <Route path="/" element={<HeartFlower />} />
                <Route path="/capsule" element={<CapsuleDetail />} />
              </Routes>
            </div>
          </div>
        </div>

        <CapsuleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;