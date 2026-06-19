export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  primaryGoal: string;
  createdAt: number;
}

export interface CheckIn {
  id: string;
  userId: string;
  mood: number; // 1-10
  energy: number; // 1-10
  stress: number; // 1-10
  motivation: number; // 1-10
  notes: string;
  timestamp: number;
  emotion?: string;
}

export interface HealthMetric {
  date: string;
  mood: number;
  energy: number;
  stress: number;
  motivation: number;
}

export interface Subscription {
  userId: string;
  plan: 'trial' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  trialStart: number;
  trialEnd: number;
  nextBilling?: number;
}

export interface CelesteState {
  currentUser: User | null;
  checkIns: CheckIn[];
  subscription: Subscription | null;
  onboardingComplete: boolean;
}
