'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { CelesteState } from '@/lib/types';
import Dashboard from '@/components/Dashboard';
import CelesteAvatar from '@/components/CelesteAvatar';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [state, setState] = useState<CelesteState | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const appState = storage.getState();
    setState(appState);
    setLoading(false);

    if (!appState.currentUser) {
      router.push('/onboarding');
    }
  }, [router]);

  if (loading || !state?.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-celeste to-celeste-light flex items-center justify-center">
        <div className="text-center">
          <div className="celeste-avatar animate-pulse mb-4 mx-auto">C</div>
          <p className="text-xl">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-celeste to-celeste-light">
      <Navigation user={state.currentUser} />
      <div className="celeste-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Celeste Avatar */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <CelesteAvatar user={state.currentUser} />
          </div>

          {/* Dashboard */}
          <div className="lg:col-span-2">
            <Dashboard userId={state.currentUser.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
