'use client';

import './globals.css';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <html lang="en">
      <head>
        <title>Celeste Health</title>
        <meta name="description" content="Live forever. Seriously." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-celeste to-celeste-light text-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
