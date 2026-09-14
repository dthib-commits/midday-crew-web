import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('--- NEW B2B DEAL TOY MANDATE RECEIVED ---');
    console.log('Deal Name:', data.dealName);
    console.log('Close Quarter:', data.closeQuarter);
    console.log('Team Units:', data.teamSize);
    console.log('Firm Name:', data.firmName);
    console.log('Contact Email:', data.contactEmail);
    console.log('Total Commitment:', `$${data.totalCost}`);
    console.log('Routed to: jon@hat.company');
    console.log('-----------------------------------------');

    return NextResponse.json({
      success: true,
      message: 'Mandate logged and forwarded to Dallas production desk.',
    });
  } catch (error: any) {
    console.error('B2B Inquiry error:', error);
    return NextResponse.json({ error: 'Failed to process mandate' }, { status: 500 });
  }
}
