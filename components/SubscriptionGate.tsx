'use client';

import { useState } from 'react';

interface SubscriptionGateProps {
  onSubscribe: (plan: 'trial' | 'premium') => void;
}

export default function SubscriptionGate({ onSubscribe }: SubscriptionGateProps) {
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'premium' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-celeste to-celeste-light flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-200">Celeste is powered by real commitment.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trial Plan */}
          <div
            className={`celeste-card cursor-pointer transition-all ${
              selectedPlan === 'trial'
                ? 'ring-2 ring-celeste-accent scale-105'
                : 'hover:scale-102'
            }`}
            onClick={() => setSelectedPlan('trial')}
          >
            <h2 className="text-2xl font-bold mb-2">Get Started</h2>
            <p className="text-gray-300 mb-6">3-month trial</p>
            <div className="mb-6">
              <p className="text-5xl font-bold">$1</p>
              <p className="text-sm text-gray-300">for 3 months</p>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Full app access</li>
              <li>✓ Celeste coaching</li>
              <li>✓ Health tracking</li>
              <li>✓ Cancel anytime</li>
            </ul>
            <button
              className="w-full celeste-button"
              onClick={() => onSubscribe('trial')}
            >
              Start Trial
            </button>
          </div>

          {/* Premium Plan */}
          <div
            className={`celeste-card cursor-pointer transition-all relative ${
              selectedPlan === 'premium'
                ? 'ring-2 ring-celeste-accent scale-105'
                : 'hover:scale-102'
            }`}
            onClick={() => setSelectedPlan('premium')}
          >
            <div className="absolute top-4 right-4 bg-celeste-accent px-3 py-1 rounded text-sm font-bold">
              Best Value
            </div>
            <h2 className="text-2xl font-bold mb-2">Go All In</h2>
            <p className="text-gray-300 mb-6">Premium membership</p>
            <div className="mb-6">
              <p className="text-5xl font-bold">$19.99</p>
              <p className="text-sm text-gray-300">/month after trial</p>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Everything in trial</li>
              <li>✓ Advanced insights</li>
              <li>✓ Priority support</li>
              <li>✓ Emotion detection</li>
            </ul>
            <button
              className="w-full celeste-button"
              onClick={() => onSubscribe('premium')}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-gray-300">
          <p>No credit card required for trial. Cancel anytime.</p>
          <p className="mt-2 text-xs">We don't do dark patterns. This is real.</p>
        </div>
      </div>
    </div>
  );
}
