'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { CheckIn } from '@/lib/types';
import { getRandomResponse, celesteResponses } from '@/lib/celesteResponses';
import { voice } from '@/lib/voice';
import CelesteAvatar from '@/components/CelesteAvatar';

export default function CheckInPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    mood: 5,
    energy: 5,
    stress: 5,
    motivation: 5,
    notes: '',
  });
  const [response, setResponse] = useState('');
  const router = useRouter();
  const state = storage.getState();
  const userId = state.currentUser?.id;

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!userId) {
      router.push('/onboarding');
      return;
    }

    const checkIn: CheckIn = {
      id: `checkin_${Date.now()}`,
      userId,
      mood: formData.mood,
      energy: formData.energy,
      stress: formData.stress,
      motivation: formData.motivation,
      notes: formData.notes,
      timestamp: Date.now(),
    };

    storage.addCheckIn(checkIn);

    // Generate Celeste response
    let celesteMsg = '';
    if (formData.energy >= 7) {
      celesteMsg = getRandomResponse(celesteResponses.postCheckIn.highEnergy);
    } else if (formData.energy <= 3) {
      celesteMsg = getRandomResponse(celesteResponses.postCheckIn.lowEnergy);
    } else if (formData.stress >= 7) {
      celesteMsg = getRandomResponse(celesteResponses.postCheckIn.highStress);
    } else {
      celesteMsg = getRandomResponse(celesteResponses.postCheckIn.balanced);
    }

    setResponse(celesteMsg);
    voice.speak(celesteMsg, 0.9);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celeste to-celeste-light px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-gray-300 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <CelesteAvatar user={state.currentUser} />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 ? (
              <div className="celeste-card">
                <h1 className="text-3xl font-bold mb-8">Daily Check-In</h1>

                <div className="space-y-6">
                  {/* Mood */}
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      How's your mood? {formData.mood}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.mood}
                      onChange={(e) => handleSliderChange('mood', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Energy */}
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Energy level? {formData.energy}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.energy}
                      onChange={(e) => handleSliderChange('energy', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Stress */}
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Stress level? {formData.stress}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.stress}
                      onChange={(e) => handleSliderChange('stress', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Motivation? {formData.motivation}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.motivation}
                      onChange={(e) => handleSliderChange('motivation', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-lg font-semibold mb-2">Notes (optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="What's on your mind?"
                      className="celeste-input min-h-24"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="celeste-button w-full mt-8"
                >
                  Submit Check-In
                </button>
              </div>
            ) : (
              <div className="celeste-card text-center">
                <h2 className="text-2xl font-bold mb-4">Celeste says:</h2>
                <p className="text-xl mb-8 italic">" {response} "</p>
                <button
                  onClick={() => router.push('/')}
                  className="celeste-button"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
