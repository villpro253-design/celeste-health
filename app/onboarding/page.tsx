'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { User, Subscription } from '@/lib/types';
import SubscriptionGate from '@/components/SubscriptionGate';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'other',
    primaryGoal: 'longevity',
  });
  const [subscribed, setSubscribed] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 0 && !formData.name) {
      alert('Please enter your name');
      return;
    }
    if (step === 1 && !formData.email) {
      alert('Please enter your email');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubscriptionComplete = (plan: 'trial' | 'premium') => {
    const userId = `user_${Date.now()}`;
    const user: User = {
      id: userId,
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
      primaryGoal: formData.primaryGoal,
      createdAt: Date.now(),
    };

    const subscription: Subscription = {
      userId,
      plan,
      status: 'active',
      trialStart: Date.now(),
      trialEnd: Date.now() + 90 * 24 * 60 * 60 * 1000,
      nextBilling: Date.now() + 90 * 24 * 60 * 60 * 1000,
    };

    storage.setUser(user);
    storage.setSubscription(subscription);

    router.push('/');
  };

  if (step === 3) {
    return <SubscriptionGate onSubscribe={handleSubscriptionComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-celeste to-celeste-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="celeste-avatar mx-auto mb-4 animate-float">C</div>
          <h1 className="text-4xl font-bold mb-2">Celeste</h1>
          <p className="text-lg text-gray-200">Let's live forever. Seriously.</p>
        </div>

        {/* Steps */}
        <div className="celeste-card mb-6">
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">What's your name?</h2>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                className="celeste-input mb-4"
              />
              <p className="text-sm text-gray-300">We'll keep it real. No judgement.</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your email?</h2>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="celeste-input mb-4"
              />
              <p className="text-sm text-gray-300">For your account. Encrypted.</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tell us about you</h2>
              <div className="mb-4">
                <label className="block text-sm mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  min="20"
                  max="60"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="celeste-input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="celeste-input"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Primary Goal</label>
                <select
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleInputChange}
                  className="celeste-input"
                >
                  <option value="longevity">Live Longer</option>
                  <option value="energy">More Energy</option>
                  <option value="weight">Weight Management</option>
                  <option value="mental">Mental Clarity</option>
                  <option value="recovery">Better Recovery</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 celeste-button"
          >
            {step === 2 ? 'Next: Subscription' : 'Next'}
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mt-6 justify-center">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i <= step ? 'bg-celeste-accent' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
