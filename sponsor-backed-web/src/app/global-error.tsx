'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-[#FAF9F5] text-[#2C3E50] antialiased">
        <div className="text-center space-y-6 max-w-md px-4">
          <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 600 }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(44, 62, 80, 0.6)' }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1B2A4A',
              color: '#FAF9F5',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
