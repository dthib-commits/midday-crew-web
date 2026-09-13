'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';
import CartLineItem from './CartLineItem';
import { UPSELL_PRODUCTS } from '@/lib/mockData';
import Image from 'next/image';
import { Product } from '@/lib/types';

const FREE_SHIPPING_THRESHOLD = 100;

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, itemCount, subtotal, addItem } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const amountAway = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const earnedFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const handleUpsellAdd = (product: Product) => {
    addItem(product, product.variants[0], 1);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-court-navy/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-court-cream shadow-2xl flex flex-col border-l border-court-sand/30"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-court-sand/30 bg-white">
              <h2 className="font-serif text-lg text-court-navy">Your Bag ({itemCount})</h2>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-court-navy hover:text-court-terracotta transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-court-sand/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-court-navy/50" />
                </div>
                <p className="font-serif text-xl text-court-navy mb-2">Your bag is empty</p>
                <p className="text-court-sage text-sm mb-6">Looks like you haven't added anything yet.</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-court-navy text-white text-sm font-medium hover:bg-court-navy/90 transition-colors w-full rounded"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white px-6 py-4 border-b border-court-sand/30">
                  <p className="text-xs font-medium text-court-navy mb-2 text-center">
                    {earnedFreeShipping
                      ? "✓ You've earned complimentary shipping"
                      : `You're $${amountAway.toFixed(2)} away from complimentary shipping!`}
                  </p>
                  <div className="w-full h-1.5 bg-court-sand/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      className="h-full bg-court-sage"
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col">
                    {items.map((item) => (
                      <CartLineItem key={item.id} item={item} />
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-court-sand/30">
                    <h3 className="font-serif text-court-navy text-sm font-medium mb-4">Complete the Midday Bag</h3>
                    <div className="flex flex-col gap-3">
                      {UPSELL_PRODUCTS.slice(0, 2).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-white border border-court-sand/30 rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative bg-court-cream rounded overflow-hidden">
                              {product.images[0] && (
                                <Image
                                  src={product.images[0].url}
                                  alt={product.title}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-court-navy">{product.title}</p>
                              <p className="text-xs text-court-sage">${product.priceRange.minVariantPrice.amount}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleUpsellAdd(product)}
                            className="text-xs font-medium px-3 py-1.5 border border-court-navy text-court-navy hover:bg-court-navy hover:text-white transition-colors rounded-full"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-court-sand/30">
                  <div className="flex justify-between items-center mb-4 text-court-navy font-medium">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-court-sage mb-4 text-center">
                    Taxes and shipping calculated at checkout
                  </p>
                  <button className="w-full py-4 bg-court-navy text-white font-sans font-medium text-sm rounded hover:bg-court-navy/90 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
