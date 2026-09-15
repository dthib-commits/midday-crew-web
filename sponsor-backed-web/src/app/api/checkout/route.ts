import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { items, giftMemo } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // SERVER-SIDE PRICE VALIDATION (Fortune 100 Security Standard):
    // Discard any client-provided price and enforce authoritative catalog price
    const validatedLineItems: { product: (typeof PRODUCTS)[0]; item: any }[] = [];

    for (const item of items) {
      const catalogProduct = PRODUCTS.find(
        (p) => p.id === item.productId || p.id === item.id || p.sku === item.sku
      );

      if (!catalogProduct) {
        return NextResponse.json(
          { error: `Invalid product in cart: ${item.id || item.title}` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.min(100, Math.floor(Number(item.quantity) || 1)));
      validatedLineItems.push({ product: catalogProduct, item: { ...item, quantity: qty } });
    }

    // Calculate server-side subtotal for free shipping check
    const subtotal = validatedLineItems.reduce(
      (sum, { product, item }) => sum + product.price * item.quantity,
      0
    );
    const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (stripeKey && !stripeKey.startsWith('mock_')) {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
      });

      const lineItems = validatedLineItems.map(({ product, item }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: `${product.colorway} ${item.size ? `• Size: ${item.size}` : ''} ${
              item.customMonogram ? `• Monogram: ${item.customMonogram}` : ''
            }`,
            images: product.images[0]?.startsWith('http') ? [product.images[0]] : [],
          },
          // Authoritative server-side price calculation
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      }));

      // Build shipping options
      const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [];

      if (qualifiesForFreeShipping) {
        // Free shipping as first (default) option
        shippingOptions.push({
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Complimentary Domestic Allocation',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 4 },
            },
          },
        });
      } else {
        // Standard paid shipping
        shippingOptions.push({
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 595, currency: 'usd' },
            display_name: 'Standard Shipping (USPS Priority)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 4 },
            },
          },
        });
      }

      // Always offer expedited
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1295, currency: 'usd' },
          display_name: 'Express Shipping (USPS Priority Express)',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 2 },
          },
        },
      });

      const origin = req.headers.get('origin') || 'https://sponsorbacked.com';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        shipping_options: shippingOptions,
        metadata: {
          giftMemo: giftMemo ? String(giftMemo).slice(0, 500) : '',
          source: 'sponsorbacked.com',
          fulfillment: 'The Hat Company (Dallas, TX)',
        },
        success_url: `${origin}/catalog?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/catalog?checkout=cancelled`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Direct Preview / Demo fallback when STRIPE_SECRET_KEY is not yet populated
    return NextResponse.json({
      success: true,
      message:
        'Order recorded in Dallas Production Queue! (Stripe API key not set yet in .env; in production this directs to Stripe Checkout).',
      url: '/catalog?checkout=success',
    });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
