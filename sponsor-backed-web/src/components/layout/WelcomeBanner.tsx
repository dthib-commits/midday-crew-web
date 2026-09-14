'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

export function WelcomeBanner() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('sb_welcome_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('sb_welcome_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem('sb_email_subscribers') || '[]');
      existing.push({ email: email.trim(), subscribedAt: new Date().toISOString(), source: 'welcome_banner' });
      localStorage.setItem('sb_email_subscribers', JSON.stringify(existing));
    } catch { /* noop */ }
    setSubmitted(true);
    setTimeout(() => {
      handleDismiss();
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-sb-navy border-t border-sb-chalk/10 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {submitted ? (
          <p className="text-sm text-sb-green font-medium">Welcome to the inner circle.</p>
        ) : (
          <>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-sb-chalk">
                First look access to new drops &amp; limited colorways
              </p>
              <p className="text-[11px] text-sb-chalk/60 mt-0.5">
                Join the inner circle. No spam, ever.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full sm:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@fund.com"
                className="flex-1 sm:w-56 px-3 py-2 text-xs bg-white/10 border border-sb-chalk/20 text-sb-chalk placeholder:text-sb-chalk/40 focus:outline-none focus:border-sb-chalk/50 rounded-l-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sb-chalk text-sb-navy text-xs font-medium hover:bg-white transition-colors rounded-r-xs whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </>
        )}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-3 sm:relative sm:top-auto sm:right-auto p-1 text-sb-chalk/40 hover:text-sb-chalk transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
