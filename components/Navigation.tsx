'use client';

import { User } from '@/lib/types';
import Link from 'next/link';

interface NavigationProps {
  user: User | null;
}

export default function Navigation({ user }: NavigationProps) {
  return (
    <nav className="bg-celeste/80 backdrop-blur border-b border-celeste-accent/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">✨</span>
          <span className="font-bold text-xl">Celeste</span>
        </Link>
        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link
                href="/"
                className="hover:text-celeste-accent transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/checkin"
                className="celeste-button text-sm"
              >
                Check In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
