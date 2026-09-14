'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    giftMemo,
    setGiftMemo,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showGiftMemo, setShowGiftMemo] = useState(Boolean(giftMemo));

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, giftMemo }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || 'Checkout initiated in direct demo mode.');
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-sb-navy/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-sb-charcoal/20 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-sb-charcoal/15 flex items-center justify-between bg-sb-navy text-sb-chalk">
            <div>
              <h2 className="font-serif text-lg font-bold tracking-widest uppercase">
                Transaction Ledger
              </h2>
              <p className="text-[10px] font-mono tracking-wider opacity-70">
                PORTFOLIO ALLOCATION DESK
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-xs hover:bg-sb-charcoal/40 transition-colors text-sb-chalk"
              aria-label="Close Ledger"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-sb-chalk px-6 py-3 border-b border-sb-charcoal/10">
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <strong className="text-sb-green">✓ Complimentary Domestic Allocation Unlocked</strong>
                ) : (
                  <span>
                    Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span className="font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-sb-charcoal/15 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-sb-green h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-sb-charcoal/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-sb-charcoal/30 flex items-center justify-center text-sb-charcoal/40 font-mono text-xl">
                  $0
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-sb-navy">
                    Your Allocation is Empty
                  </p>
                  <p className="text-xs text-sb-charcoal/70 font-mono mt-1 max-w-xs">
                    No dry powder currently deployed. Explore Volume I of our catalog.
                  </p>
                </div>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center px-4 py-2 bg-sb-navy text-sb-chalk text-xs font-mono tracking-widest uppercase hover:bg-sb-green transition-colors"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-sb-chalk border border-sb-charcoal/15 rounded-xs overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-serif font-bold text-sb-navy leading-tight pr-2">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono font-bold text-sb-navy">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-sb-charcoal/60 mt-0.5">
                        {item.colorway} {item.size && `• ${item.size}`}
                      </p>
                      {item.customMonogram && (
                        <p className="text-[10px] font-mono text-sb-leather">
                          Monogram: &quot;{item.customMonogram}&quot;
                        </p>
                      )}
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-sb-charcoal/20 rounded-xs bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sb-chalk text-sb-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-sb-chalk text-sb-charcoal transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sb-charcoal/40 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-sb-charcoal/15 bg-white p-6 space-y-4">
              {/* Gift / Closing Memo Toggle */}
              <div>
                <button
                  onClick={() => setShowGiftMemo(!showGiftMemo)}
                  className="flex items-center space-x-1.5 text-xs font-mono text-sb-leather hover:text-sb-navy transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{showGiftMemo ? 'Hide' : 'Add'} Deal Closing Memo / Gift Note</span>
                </button>
                {showGiftMemo && (
                  <textarea
                    rows={2}
                    value={giftMemo}
                    onChange={(e) => setGiftMemo(e.target.value)}
                    placeholder="Enter formal closing memo, partner congratulations, or deal team dispatch..."
                    className="w-full mt-2 p-2.5 bg-sb-chalk border border-sb-charcoal/20 text-xs font-mono rounded-xs focus:outline-none focus:border-sb-navy"
                  />
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-sb-charcoal/70">
                  <span>Allocation Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sb-charcoal/70">
                  <span>Domestic Shipping</span>
                  <span>
                    {subtotal >= freeShippingThreshold ? 'Complimentary' : 'Calculated at Wire'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-sb-navy pt-2 border-t border-sb-charcoal/10">
                  <span>Total Capital Committed</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-2 rounded-xs shadow-md disabled:opacity-50"
              >
                <span>{isCheckingOut ? 'Securing Allocation...' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-sb-charcoal/50 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-sb-green" />
                <span>Direct Stripe Encryption • Invoiced in Dallas, TX</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
