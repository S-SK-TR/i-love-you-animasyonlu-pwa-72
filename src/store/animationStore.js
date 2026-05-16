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
  }))
}));

export default useAnimationStore;