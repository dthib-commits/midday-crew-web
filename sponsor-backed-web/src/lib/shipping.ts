// Shippo Shipping Integration
// Sign up at https://goshippo.com (free, pay per label)
// Set SHIPPO_API_KEY in Vercel env vars

const SHIPPO_API_KEY = process.env.SHIPPO_API_KEY || '';
const SHIPPO_BASE = 'https://api.goshippo.com';

// Jon's warehouse in Dallas — update with actual address
export const WAREHOUSE_ADDRESS = {
  name: 'The Hat Company',
  street1: process.env.WAREHOUSE_STREET || '1234 Commerce St',
  city: process.env.WAREHOUSE_CITY || 'Dallas',
  state: process.env.WAREHOUSE_STATE || 'TX',
  zip: process.env.WAREHOUSE_ZIP || '75201',
  country: 'US',
  phone: process.env.WAREHOUSE_PHONE || '',
  email: 'jon@hat.company',
};

// Standard package dimensions for caps & accessories
const PACKAGE_PRESETS = {
  cap: { length: '12', width: '8', height: '5', weight: '6', mass_unit: 'oz', distance_unit: 'in' },
  tote: { length: '16', width: '14', height: '4', weight: '18', mass_unit: 'oz', distance_unit: 'in' },
  accessory: { length: '8', width: '6', height: '3', weight: '4', mass_unit: 'oz', distance_unit: 'in' },
  multi: { length: '16', width: '14', height: '8', weight: '32', mass_unit: 'oz', distance_unit: 'in' },
} as const;

export type PackageSize = keyof typeof PACKAGE_PRESETS;

export function estimatePackageSize(itemCount: number, hasLargeItem: boolean): PackageSize {
  if (hasLargeItem) return 'tote';
  if (itemCount >= 3) return 'multi';
  if (itemCount === 1) return 'cap';
  return 'multi';
}

interface ShippoAddress {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
}

interface ShippoRate {
  object_id: string;
  provider: string;
  servicelevel: { name: string; token: string };
  amount: string;
  currency: string;
  estimated_days: number;
  duration_terms: string;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
  price: number; // in dollars
  estimatedDays: number;
  description: string;
}

// Get live shipping rates from Shippo
export async function getShippingRates(
  destination: ShippoAddress,
  packageSize: PackageSize = 'cap'
): Promise<ShippingRate[]> {
  if (!SHIPPO_API_KEY) {
    // Return flat-rate fallback when Shippo isn't configured
    return getFallbackRates();
  }

  const parcel = PACKAGE_PRESETS[packageSize];

  const shipmentRes = await fetch(`${SHIPPO_BASE}/shipments/`, {
    method: 'POST',
    headers: {
      Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address_from: WAREHOUSE_ADDRESS,
      address_to: destination,
      parcels: [parcel],
      async: false,
    }),
  });

  if (!shipmentRes.ok) {
    console.error('Shippo shipment error:', await shipmentRes.text());
    return getFallbackRates();
  }

  const shipment = await shipmentRes.json();

  const rates: ShippingRate[] = (shipment.rates || [])
    .filter((r: ShippoRate) => r.currency === 'USD')
    .map((r: ShippoRate) => ({
      id: r.object_id,
      carrier: r.provider,
      service: r.servicelevel.name,
      price: parseFloat(r.amount),
      estimatedDays: r.estimated_days || 5,
      description: `${r.provider} ${r.servicelevel.name} (${r.estimated_days || '3-5'} days)`,
    }))
    .sort((a: ShippingRate, b: ShippingRate) => a.price - b.price)
    .slice(0, 4); // Top 4 cheapest options

  return rates.length > 0 ? rates : getFallbackRates();
}

// Purchase a shipping label
export async function purchaseLabel(rateId: string): Promise<{
  labelUrl: string;
  trackingNumber: string;
  trackingUrl: string;
} | null> {
  if (!SHIPPO_API_KEY) return null;

  const res = await fetch(`${SHIPPO_BASE}/transactions/`, {
    method: 'POST',
    headers: {
      Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rate: rateId,
      label_file_type: 'PDF',
      async: false,
    }),
  });

  if (!res.ok) {
    console.error('Shippo label error:', await res.text());
    return null;
  }

  const transaction = await res.json();

  if (transaction.status !== 'SUCCESS') {
    console.error('Shippo label failed:', transaction.messages);
    return null;
  }

  return {
    labelUrl: transaction.label_url,
    trackingNumber: transaction.tracking_number,
    trackingUrl: transaction.tracking_url_provider,
  };
}

// Flat-rate fallback when Shippo isn't configured
function getFallbackRates(): ShippingRate[] {
  return [
    {
      id: 'flat_standard',
      carrier: 'USPS',
      service: 'Priority Mail',
      price: 5.95,
      estimatedDays: 3,
      description: 'USPS Priority Mail (2-3 business days)',
    },
    {
      id: 'flat_express',
      carrier: 'USPS',
      service: 'Priority Mail Express',
      price: 12.95,
      estimatedDays: 1,
      description: 'USPS Priority Mail Express (1-2 business days)',
    },
  ];
}
