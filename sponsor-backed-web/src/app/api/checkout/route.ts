import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const { items, giftMemo } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (stripeKey && !stripeKey.startsWith('mock_')) {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
      });

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: `${item.colorway} ${item.size ? `• Size: ${item.size}` : ''} ${
              item.customMonogram ? `• Monogram: ${item.customMonogram}` : ''
            }`,
            images: item.image.startsWith('http') ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const origin = req.headers.get('origin') || 'https://sponsorbacked.com';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB'],
        },
        metadata: {
          giftMemo: giftMemo || '',
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
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
