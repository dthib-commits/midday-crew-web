'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem('sb_email_subscribers') || '[]');
      existing.push({ email: email.trim(), subscribedAt: new Date().toISOString() });
      localStorage.setItem('sb_email_subscribers', JSON.stringify(existing));
    } catch { /* noop */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center space-x-2 text-sb-green text-sm">
        <Check className="w-4 h-4" />
        <span>You&rsquo;re on the list. Welcome to the inner circle.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="font-serif text-base text-sb-chalk font-medium">
        The Inner Circle
      </p>
      <p className="text-xs text-sb-chalk/60 leading-relaxed">
        Early access to new drops, limited colorways, and closing crate availability. Unsubscribe anytime.
      </p>
      <div className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@fund.com"
          className="flex-1 px-3 py-2.5 text-xs bg-white/10 border border-sb-chalk/20 text-sb-chalk placeholder:text-sb-chalk/40 focus:outline-none focus:border-sb-chalk/50 rounded-l-xs"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-sb-chalk text-sb-navy text-xs font-medium hover:bg-white transition-colors rounded-r-xs flex items-center space-x-1"
        >
          <span>Join</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </form>
  );
}
