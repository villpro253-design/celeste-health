import { User, CheckIn, Subscription, CelesteState } from './types';

const STORAGE_KEY = 'celeste_health_data';

export const storage = {
  getState: (): CelesteState => {
    if (typeof window === 'undefined') return null as any;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : getDefaultState();
    } catch {
      return getDefaultState();
    }
  },

  setState: (state: CelesteState) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  addCheckIn: (checkIn: CheckIn) => {
    const state = storage.getState();
    state.checkIns.push(checkIn);
    storage.setState(state);
    return checkIn;
  },

  getCheckIns: (userId: string): CheckIn[] => {
    const state = storage.getState();
    return state.checkIns.filter(c => c.userId === userId);
  },

  getRecentCheckIns: (userId: string, days: number = 7): CheckIn[] => {
    const state = storage.getState();
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return state.checkIns
      .filter(c => c.userId === userId && c.timestamp > cutoff)
      .sort((a, b) => b.timestamp - a.timestamp);
  },

  setUser: (user: User) => {
    const state = storage.getState();
    state.currentUser = user;
    storage.setState(state);
  },

  setSubscription: (subscription: Subscription) => {
    const state = storage.getState();
    state.subscription = subscription;
    storage.setState(state);
  },

  getAverageMetrics: (userId: string, days: number = 7) => {
    const checkIns = storage.getRecentCheckIns(userId, days);
    if (checkIns.length === 0) {
      return { mood: 0, energy: 0, stress: 0, motivation: 0 };
    }
    return {
      mood: Math.round(checkIns.reduce((sum, c) => sum + c.mood, 0) / checkIns.length),
      energy: Math.round(checkIns.reduce((sum, c) => sum + c.energy, 0) / checkIns.length),
      stress: Math.round(checkIns.reduce((sum, c) => sum + c.stress, 0) / checkIns.length),
      motivation: Math.round(checkIns.reduce((sum, c) => sum + c.motivation, 0) / checkIns.length),
    };
  },
};

function getDefaultState(): CelesteState {
  return {
    currentUser: null,
    checkIns: [],
    subscription: null,
    onboardingComplete: false,
  };
}
