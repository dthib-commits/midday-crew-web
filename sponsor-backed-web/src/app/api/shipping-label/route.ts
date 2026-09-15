import { NextResponse } from 'next/server';
import { purchaseLabel } from '@/lib/shipping';

// POST /api/shipping-label — Generate a shipping label from a Shippo rate ID
// This is called after an order is paid to generate the label for Jon
export async function POST(req: Request) {
  try {
    const { rateId } = await req.json();

    if (!rateId) {
      return NextResponse.json({ error: 'Missing rateId' }, { status: 400 });
    }

    const label = await purchaseLabel(rateId);

    if (!label) {
      return NextResponse.json(
        { error: 'Failed to generate label. Check Shippo API key.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      labelUrl: label.labelUrl,
      trackingNumber: label.trackingNumber,
      trackingUrl: label.trackingUrl,
      message: 'Label generated. Send the PDF to Jon at The Hat Company for fulfillment.',
    });
  } catch (err: any) {
    console.error('Label generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
