'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { PRODUCTS } from '@/lib/products';
import { X, Plus, Minus, ArrowRight, ShieldCheck, FileText, Check } from 'lucide-react';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    addItem,
    subtotal,
    freeShippingThreshold,
    giftMemo,
    setGiftMemo,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showGiftMemo, setShowGiftMemo] = useState(Boolean(giftMemo));

  const drawerRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Focus trap: focus the drawer panel when it opens
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const keyFob = PRODUCTS.find((p) => p.id === 'sb-acc-402');
  const hasKeyFob = items.some((i) => i.productId === 'sb-acc-402' || i.id === 'sb-acc-402');
  const needsFreeShippingBridge = subtotal > 0 && subtotal < freeShippingThreshold && !hasKeyFob && keyFob;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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
        alert(data.message || 'Checkout initialized.');
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-sb-navy/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div ref={drawerRef} tabIndex={-1} className="w-screen max-w-md bg-[#FAF9F5] border-l border-sb-charcoal/10 shadow-2xl flex flex-col focus:outline-none">
          {/* Header */}
          <div className="px-6 py-5 border-b border-sb-charcoal/10 flex items-center justify-between">
            <h2 id="cart-drawer-title" className="font-serif text-lg font-semibold text-sb-navy">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={closeCart}
              className="p-1.5 text-sb-charcoal/50 hover:text-sb-navy transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Allocation Note (Quiet Restraint, No Gamified Meters) */}
          <div className="bg-white px-6 py-3 border-b border-sb-charcoal/10 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center space-x-1.5 text-sb-green font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Complimentary domestic allocation included.</span>
              </div>
            ) : (
              <div className="text-sb-charcoal/60 flex justify-between items-center">
                <span>Orders over $120 ship complimentary.</span>
                <span className="font-medium text-sb-navy">${remainingForFreeShipping.toFixed(0)} away</span>
              </div>
            )}
          </div>

          {/* In-Cart Ledger Accelerator / Impulse Bridge SKU */}
          {needsFreeShippingBridge && (
            <div className="bg-[#F4F1EA] px-6 py-3 border-b border-sb-charcoal/10 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="relative w-9 h-9 bg-sb-chalk shrink-0 overflow-hidden rounded-xs">
                  <Image
                    src={keyFob.images[0]}
                    alt={keyFob.title}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-medium text-sb-navy truncate">
                    Horween Leather Crest Fob
                  </p>
                  <p className="text-[10px] text-sb-charcoal/50">
                    +$20 • Qualifies your order for free shipping
                  </p>
                </div>
              </div>
              <button
                onClick={() => addItem(keyFob)}
                className="shrink-0 text-xs bg-sb-navy hover:bg-sb-green text-sb-chalk px-2.5 py-1.5 rounded-xs transition-colors font-medium whitespace-nowrap"
              >
                + Add ($20)
              </button>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-sb-charcoal/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <p className="font-serif text-xl text-sb-navy">
                  Your bag is empty
                </p>
                <p className="text-xs text-sb-charcoal/60 max-w-xs leading-relaxed">
                  Browse our collection of broken-in chino caps, heavyweight knits, and canvas luggage.
                </p>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center px-5 py-2.5 bg-sb-navy text-sb-chalk text-xs font-medium tracking-wide hover:bg-sb-green transition-colors"
                >
                  Explore the Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-sb-chalk overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-sb-navy leading-snug pr-2">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium text-sb-navy">
                          ${(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                      <p className="text-xs text-sb-charcoal/50 mt-0.5">
                        {item.colorway} {item.size && `• ${item.size}`}
                      </p>
                      {item.customMonogram && (
                        <p className="text-xs text-sb-leather mt-0.5">
                          Monogram: &ldquo;{item.customMonogram}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-sb-charcoal/20 rounded-xs bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sb-chalk text-sb-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs">{item.quantity}</span>
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
                        className="text-xs text-sb-charcoal/40 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-sb-charcoal/10 bg-white p-6 space-y-4">
              {/* Gift Note Toggle */}
              <div>
                <button
                  onClick={() => setShowGiftMemo(!showGiftMemo)}
                  className="flex items-center space-x-1.5 text-xs text-sb-charcoal/60 hover:text-sb-navy transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{showGiftMemo ? 'Hide' : 'Add'} gift note or closing memo</span>
                </button>
                {showGiftMemo && (
                  <textarea
                    rows={2}
                    value={giftMemo}
                    onChange={(e) => setGiftMemo(e.target.value)}
                    placeholder="Enter gift note or deal team closing memo..."
                    className="w-full mt-2 p-2.5 bg-[#FAF9F5] border border-sb-charcoal/15 text-xs rounded-xs focus:outline-none focus:border-sb-navy"
                  />
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs text-sb-charcoal/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {subtotal >= freeShippingThreshold ? 'Complimentary' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-sb-navy pt-2 border-t border-sb-charcoal/10">
                  <span>Total</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors flex items-center justify-center space-x-2 rounded-xs disabled:opacity-50"
              >
                <span>{isCheckingOut ? 'Securing...' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-sb-charcoal/50 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-sb-green" />
                <span>Encrypted Stripe Checkout • Handcrafted in Dallas, TX</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
