export interface Message {
  id: string;
  content: string;
  animationType: 'fadeIn' | 'slideIn' | 'bounce' | 'float' | 'heartPulse';
  createdAt: string;
}

export interface Capsule {
  id: string;
  name: string;
  theme: string;
  createdAt: string;
}

export interface LoveCapsuleState {
  messages: Message[];
  currentCapsule: Capsule | null;
}

export interface AnimationStore {
  animasyonDurumu: 'başladı' | 'bitti';
  animasyonTipi: 'fadeIn' | 'slideIn' | 'bounce' | 'float' | 'heartPulse' | null;
  animasyonParametreleri: {
    hız: number;
    boyut: number;
    renk: string;
  };
  loveCapsule: LoveCapsuleState;
  isOnline: boolean;
  başlatAnimasyon: (tip: 'fadeIn' | 'slideIn' | 'bounce' | 'float' | 'heartPulse', parametreler: { hız: number; boyut: number; renk: string }) => void;
  durdurAnimasyon: () => void;
  güncelleParametreler: (yeniParametreler: Partial<{ hız: number; boyut: number; renk: string }>) => void;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  setCurrentCapsule: (capsule: Capsule) => void;
  updateCapsuleTheme: (theme: string) => void;
  setOnlineStatus: (status: boolean) => void;
}