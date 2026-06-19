'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { voice } from '@/lib/voice';
import { getRandomResponse, celesteResponses } from '@/lib/celesteResponses';

interface CelesteAvatarProps {
  user?: User | null;
}

export default function CelesteAvatar({ user }: CelesteAvatarProps) {
  const [isGreeting, setIsGreeting] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (user && !isGreeting) {
      setIsGreeting(true);
      const greeting = getRandomResponse(celesteResponses.greeting);
      setCurrentMessage(greeting);
      voice.speak(greeting, 0.85);
    }
  }, [user, isGreeting]);

  const handleAvatarClick = () => {
    if (currentMessage) {
      voice.speak(currentMessage, 0.85);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Circle */}
      <button
        onClick={handleAvatarClick}
        className="celeste-avatar mb-6 hover:scale-110 transition-transform cursor-pointer shadow-2xl flex flex-col items-center justify-center group"
      >
        <div className="text-5xl mb-2">✨</div>
        <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">Click to repeat</div>
      </button>

      {/* Status */}
      {user && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-300">Goal: {user.primaryGoal}</p>
        </div>
      )}

      {/* Message Bubble */}
      {currentMessage && (
        <div className="bg-celeste-light rounded-lg p-4 max-w-xs text-center shadow-lg border border-celeste-accent/30">
          <p className="italic text-sm">" {currentMessage} "</p>
        </div>
      )}
    </div>
  );
}
