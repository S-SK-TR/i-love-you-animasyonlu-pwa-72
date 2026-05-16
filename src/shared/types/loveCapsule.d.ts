export interface Message {
  id: string;
  content: string;
  animationType: 'kalpGül' | 'patlama';
  createdAt: string;
}

export interface Capsule {
  id: string;
  theme: string;
  createdAt: string;
}

export interface LoveCapsuleState {
  messages: Message[];
  currentCapsule: Capsule | null;
}

export interface AnimationStore {
  animasyonDurumu: 'başladı' | 'bitti';
  animasyonTipi: 'kalpGül' | 'patlama' | null;
  animasyonParametreleri: {
    hız: number;
    boyut: number;
    renk: string;
  };
  loveCapsule: LoveCapsuleState;
  başlatAnimasyon: (tip: 'kalpGül' | 'patlama', parametreler: { hız: number; boyut: number; renk: string }) => void;
  durdurAnimasyon: () => void;
  güncelleParametreler: (yeniParametreler: Partial<{ hız: number; boyut: number; renk: string }>) => void;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  setCurrentCapsule: (capsule: Capsule) => void;
  updateCapsuleTheme: (theme: string) => void;
}