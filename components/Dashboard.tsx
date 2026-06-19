'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { CheckIn } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface DashboardProps {
  userId: string;
}

export default function Dashboard({ userId }: DashboardProps) {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [averages, setAverages] = useState({
    mood: 0,
    energy: 0,
    stress: 0,
    motivation: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const recent = storage.getRecentCheckIns(userId, 7);
    setCheckIns(recent);
    setAverages(storage.getAverageMetrics(userId, 7));
  }, [userId]);

  const getMetricColor = (value: number, inverse: boolean = false) => {
    if (inverse) {
      if (value >= 7) return 'text-red-400';
      if (value >= 5) return 'text-yellow-400';
      return 'text-green-400';
    } else {
      if (value >= 7) return 'text-green-400';
      if (value >= 5) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Health Dashboard</h1>
        <p className="text-gray-300">Last 7 days</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="celeste-card">
          <p className="text-sm text-gray-300 mb-1">Mood</p>
          <p className={`text-3xl font-bold ${getMetricColor(averages.mood)}`}>
            {averages.mood}/10
          </p>
        </div>
        <div className="celeste-card">
          <p className="text-sm text-gray-300 mb-1">Energy</p>
          <p className={`text-3xl font-bold ${getMetricColor(averages.energy)}`}>
            {averages.energy}/10
          </p>
        </div>
        <div className="celeste-card">
          <p className="text-sm text-gray-300 mb-1">Stress</p>
          <p className={`text-3xl font-bold ${getMetricColor(averages.stress, true)}`}>
            {averages.stress}/10
          </p>
        </div>
        <div className="celeste-card">
          <p className="text-sm text-gray-300 mb-1">Motivation</p>
          <p className={`text-3xl font-bold ${getMetricColor(averages.motivation)}`}>
            {averages.motivation}/10
          </p>
        </div>
      </div>

      {/* Recent Check-Ins */}
      <div className="celeste-card mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Check-Ins</h2>
        {checkIns.length === 0 ? (
          <p className="text-gray-300 mb-4">No check-ins yet. Start tracking today.</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {checkIns.map(checkIn => (
              <div key={checkIn.id} className="bg-celeste p-3 rounded border border-celeste-accent/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-4 text-sm">
                    <span>Mood: <strong>{checkIn.mood}/10</strong></span>
                    <span>Energy: <strong>{checkIn.energy}/10</strong></span>
                    <span>Stress: <strong>{checkIn.stress}/10</strong></span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(checkIn.timestamp, { addSuffix: true })}
                  </span>
                </div>
                {checkIn.notes && (
                  <p className="text-sm text-gray-300 italic">" {checkIn.notes} "</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/checkin')}
          className="flex-1 celeste-button"
        >
          New Check-In
        </button>
        <button
          onClick={() => storage.setState({ ...storage.getState(), currentUser: null, subscription: null }); router.push('/onboarding')}
          className="flex-1 px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
