import { create } from 'zustand';

const useAnimationStore = create((set) => ({
  // State'ler
  animasyonDurumu: 'bitti', // 'başladı' | 'bitti'
  animasyonTipi: null, // 'kalpGül' | 'patlama' | null
  animasyonParametreleri: {
    hız: 1,
    boyut: 1,
    renk: '#ff0000', // varsayılan kırmızı
  },
  loveCapsule: {
    messages: [],
    currentCapsule: null
  },

  // Action'lar
  başlatAnimasyon: (tip, parametreler) => set(() => ({
    animasyonDurumu: 'başladı',
    animasyonTipi: tip,
    animasyonParametreleri: parametreler
  })),

  durdurAnimasyon: () => set(() => ({
    animasyonDurumu: 'bitti',
    animasyonTipi: null
  })),

  güncelleParametreler: (yeniParametreler) => set((state) => ({
    animasyonParametreleri: {
      ...state.animasyonParametreleri,
      ...yeniParametreler
    }
  })),

  addMessage: (message) => set((state) => ({
    loveCapsule: {
      ...state.loveCapsule,
      messages: [...state.loveCapsule.messages, message]
    }
  })),

  removeMessage: (id) => set((state) => ({
    loveCapsule: {
      ...state.loveCapsule,
      messages: state.loveCapsule.messages.filter(msg => msg.id !== id)
    }
  })),

  setCurrentCapsule: (capsule) => set((state) => ({
    loveCapsule: {
      ...state.loveCapsule,
      currentCapsule: capsule
    }
  })),

  updateCapsuleTheme: (theme) => set((state) => ({
    loveCapsule: {
      ...state.loveCapsule,
      currentCapsule: state.loveCapsule.currentCapsule ? {
        ...state.loveCapsule.currentCapsule,
        theme
      } : null
    }
  }))
}));

export default useAnimationStore;