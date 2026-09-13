import { Product, Collection } from './types';

export const COLLECTIONS: Collection[] = [
  { id: 'c-1', handle: 'paddles', title: 'The Paddles', description: 'Premium paddles for the dedicated player.' },
  { id: 'c-2', handle: 'court-edit', title: 'The Court Edit', description: 'Curated essentials for the court.' },
  { id: 'c-3', handle: 'apparel', title: 'Apparel & Goods', description: 'Elevate your game day attire.' },
  { id: 'c-4', handle: 'all', title: 'All Products', description: 'All available products.' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    handle: 'selkirk-luxx-control-air',
    title: 'Selkirk LUXX Control Air',
    description: 'The ultimate control paddle for the strategic player. Featuring a 16mm core and an elongated shape for maximum reach and finesse.',
    vendor: 'Selkirk',
    productType: 'Paddle',
    tags: ['paddles', 'control', 'elongated'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 219.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/selkirk-luxx.jpg', altText: 'Selkirk LUXX Control Air', width: 800, height: 800 }],
    variants: [
      { id: 'v-1-1', title: 'Court Navy', availableForSale: true, price: { amount: 219.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Court Navy' }] },
      { id: 'v-1-2', title: 'Court Chalk', availableForSale: true, price: { amount: 219.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Court Chalk' }] },
      { id: 'v-1-3', title: 'Heritage Green', availableForSale: true, price: { amount: 219.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Heritage Green' }] }
    ]
  },
  {
    id: 'p-2',
    handle: 'selkirk-vanguard-power-air-invikta',
    title: 'Selkirk Vanguard Power Air Invikta',
    description: 'Designed for the aggressive player who demands maximum power and spin. Engineered for optimal aerodynamics.',
    vendor: 'Selkirk',
    productType: 'Paddle',
    tags: ['paddles', 'power'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 199.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/selkirk-invikta.jpg', altText: 'Selkirk Vanguard Power Air Invikta', width: 800, height: 800 }],
    variants: [
      { id: 'v-2-1', title: 'Crimson', availableForSale: true, price: { amount: 199.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Crimson' }] },
      { id: 'v-2-2', title: 'Midnight', availableForSale: true, price: { amount: 199.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Midnight' }] },
      { id: 'v-2-3', title: 'Arctic', availableForSale: true, price: { amount: 199.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Arctic' }] }
    ]
  },
  {
    id: 'p-3',
    handle: 'joola-ben-johns-perseus-16mm',
    title: 'JOOLA Ben Johns Perseus 16mm',
    description: 'The weapon of choice for the world\'s #1 player. Combines a carbon friction surface with a responsive core for unmatched performance.',
    vendor: 'JOOLA',
    productType: 'Paddle',
    tags: ['paddles', 'pro'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 239.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/joola-perseus.jpg', altText: 'JOOLA Ben Johns Perseus 16mm', width: 800, height: 800 }],
    variants: [
      { id: 'v-3-1', title: 'Blue/Gold', availableForSale: true, price: { amount: 239.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Blue/Gold' }] },
      { id: 'v-3-2', title: 'Stealth Black', availableForSale: true, price: { amount: 239.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Stealth Black' }] },
      { id: 'v-3-3', title: 'Tournament White', availableForSale: true, price: { amount: 239.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Tournament White' }] }
    ]
  },
  {
    id: 'p-4',
    handle: 'joola-ben-johns-scorpeus',
    title: 'JOOLA Ben Johns Scorpeus',
    description: 'A 14mm powerhouse built for speed and agility at the kitchen line. Features a unique shape to maximize the sweet spot.',
    vendor: 'JOOLA',
    productType: 'Paddle',
    tags: ['paddles', 'speed'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 209.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/joola-scorpeus.jpg', altText: 'JOOLA Ben Johns Scorpeus', width: 800, height: 800 }],
    variants: [
      { id: 'v-4-1', title: 'Core Black', availableForSale: true, price: { amount: 209.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Core Black' }] },
      { id: 'v-4-2', title: 'Ice Blue', availableForSale: true, price: { amount: 209.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Ice Blue' }] }
    ]
  },
  {
    id: 'p-5',
    handle: 'diadem-edge-18k',
    title: 'Diadem Edge 18K',
    description: 'Premium tri-axial carbon fiber face for ultimate spin generation. The 16mm core provides exceptional control and touch.',
    vendor: 'Diadem',
    productType: 'Paddle',
    tags: ['paddles', 'spin'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 229.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/diadem-edge.jpg', altText: 'Diadem Edge 18K', width: 800, height: 800 }],
    variants: [
      { id: 'v-5-1', title: 'Raw Carbon', availableForSale: true, price: { amount: 229.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Raw Carbon' }] },
      { id: 'v-5-2', title: 'Forest', availableForSale: true, price: { amount: 229.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Forest' }] },
      { id: 'v-5-3', title: 'Sand', availableForSale: true, price: { amount: 229.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sand' }] }
    ]
  },
  {
    id: 'p-6',
    handle: 'diadem-warrior-v2',
    title: 'Diadem Warrior v2',
    description: 'The thickest paddle on the market at 19mm, offering unparalleled vibration dampening and a massive sweet spot. Perfect for absorbing hard drives.',
    vendor: 'Diadem',
    productType: 'Paddle',
    tags: ['paddles', 'control'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 199.99, currencyCode: 'USD' } },
    images: [{ url: '/images/paddles/diadem-warrior.jpg', altText: 'Diadem Warrior v2', width: 800, height: 800 }],
    variants: [
      { id: 'v-6-1', title: 'Obsidian', availableForSale: true, price: { amount: 199.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Obsidian' }] },
      { id: 'v-6-2', title: 'Arctic White', availableForSale: true, price: { amount: 199.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Arctic White' }] }
    ]
  },
  {
    id: 'p-7',
    handle: 'midday-crew-waxed-canvas-court-bag',
    title: 'Midday Crew Waxed Canvas Court Bag',
    description: 'A stylish and durable bag to carry your paddles, balls, and essentials. Features a water-resistant waxed canvas exterior.',
    vendor: 'Midday Crew',
    productType: 'Accessories',
    tags: ['accessories', 'bags'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 89.99, currencyCode: 'USD' } },
    images: [{ url: '/images/accessories/court-bag.jpg', altText: 'Midday Crew Waxed Canvas Court Bag', width: 800, height: 800 }],
    variants: [
      { id: 'v-7-1', title: 'Navy', availableForSale: true, price: { amount: 89.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy' }] },
      { id: 'v-7-2', title: 'Sand', availableForSale: true, price: { amount: 89.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sand' }] },
      { id: 'v-7-3', title: 'Sage', availableForSale: true, price: { amount: 89.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sage' }] }
    ]
  },
  {
    id: 'p-8',
    handle: 'midday-crew-court-towel-2-pack',
    title: 'Midday Crew Court Towel (2-Pack)',
    description: 'Keep your hands dry and your paddle clean with these premium microfiber towels. Essential for intense matches.',
    vendor: 'Midday Crew',
    productType: 'Accessories',
    tags: ['accessories', 'towels'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 34.99, currencyCode: 'USD' } },
    images: [{ url: '/images/accessories/towel.jpg', altText: 'Midday Crew Court Towel (2-Pack)', width: 800, height: 800 }],
    variants: [
      { id: 'v-8-1', title: 'Chalk', availableForSale: true, price: { amount: 34.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Chalk' }] },
      { id: 'v-8-2', title: 'Navy Stripe', availableForSale: true, price: { amount: 34.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy Stripe' }] }
    ]
  },
  {
    id: 'p-9',
    handle: 'performance-overgrip-3-pack',
    title: 'Performance Overgrip 3-Pack',
    description: 'Tacky and absorbent overgrips to ensure your paddle stays firmly in your hand. Easy to apply and long-lasting.',
    vendor: 'Midday Crew',
    productType: 'Accessories',
    tags: ['accessories', 'grips'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 14.99, currencyCode: 'USD' } },
    images: [{ url: '/images/accessories/overgrip.jpg', altText: 'Performance Overgrip 3-Pack', width: 800, height: 800 }],
    variants: [
      { id: 'v-9-1', title: 'White', availableForSale: true, price: { amount: 14.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'White' }] },
      { id: 'v-9-2', title: 'Black', availableForSale: true, price: { amount: 14.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Black' }] }
    ]
  },
  {
    id: 'p-10',
    handle: 'tournament-pickleballs-3-pack',
    title: 'Tournament Pickleballs (3-Pack)',
    description: 'USAP approved tournament balls with excellent durability and consistent flight. Play with confidence on any hard court.',
    vendor: 'Midday Crew',
    productType: 'Accessories',
    tags: ['accessories', 'balls'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 18.99, currencyCode: 'USD' } },
    images: [{ url: '/images/accessories/pickleballs.jpg', altText: 'Tournament Pickleballs (3-Pack)', width: 800, height: 800 }],
    variants: [
      { id: 'v-10-1', title: 'Dink Yellow', availableForSale: true, price: { amount: 18.99, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Dink Yellow' }] }
    ]
  },
  {
    id: 'p-11',
    handle: 'the-court-polo',
    title: 'The Court Polo',
    description: 'A classic silhouette reimagined for modern performance. Breathable, moisture-wicking fabric keeps you cool under pressure.',
    vendor: 'Midday Crew',
    productType: 'Apparel',
    tags: ['apparel', 'shirts'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 78.00, currencyCode: 'USD' } },
    images: [{ url: '/images/apparel/court-polo.jpg', altText: 'The Court Polo', width: 800, height: 1000 }],
    variants: [
      { id: 'v-11-1', title: 'Court Chalk', availableForSale: true, price: { amount: 78.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Court Chalk' }] },
      { id: 'v-11-2', title: 'Navy', availableForSale: true, price: { amount: 78.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy' }] },
      { id: 'v-11-3', title: 'Sage', availableForSale: true, price: { amount: 78.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sage' }] },
      { id: 'v-11-4', title: 'Terracotta', availableForSale: true, price: { amount: 78.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Terracotta' }] }
    ]
  },
  {
    id: 'p-12',
    handle: 'the-7-court-short',
    title: 'The 7" Court Short',
    description: 'Tailored for movement. These shorts feature a comfortable 7-inch inseam and four-way stretch fabric for uninhibited play.',
    vendor: 'Midday Crew',
    productType: 'Apparel',
    tags: ['apparel', 'shorts'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 68.00, currencyCode: 'USD' } },
    images: [{ url: '/images/apparel/court-short.jpg', altText: 'The 7" Court Short', width: 800, height: 1000 }],
    variants: [
      { id: 'v-12-1', title: 'Navy', availableForSale: true, price: { amount: 68.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy' }] },
      { id: 'v-12-2', title: 'Sand', availableForSale: true, price: { amount: 68.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sand' }] },
      { id: 'v-12-3', title: 'Sage', availableForSale: true, price: { amount: 68.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sage' }] }
    ]
  },
  {
    id: 'p-13',
    handle: 'the-clubhouse-quarter-zip',
    title: 'The Clubhouse Quarter-Zip',
    description: 'Perfect for cool morning warmups or post-match relaxation. A soft, versatile layer that transitions seamlessly from court to clubhouse.',
    vendor: 'Midday Crew',
    productType: 'Apparel',
    tags: ['apparel', 'outerwear'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 98.00, currencyCode: 'USD' } },
    images: [{ url: '/images/apparel/quarter-zip.jpg', altText: 'The Clubhouse Quarter-Zip', width: 800, height: 1000 }],
    variants: [
      { id: 'v-13-1', title: 'Heather Grey', availableForSale: true, price: { amount: 98.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Heather Grey' }] },
      { id: 'v-13-2', title: 'Navy', availableForSale: true, price: { amount: 98.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy' }] },
      { id: 'v-13-3', title: 'Court Green', availableForSale: true, price: { amount: 98.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Court Green' }] }
    ]
  },
  {
    id: 'p-14',
    handle: 'the-midday-visor',
    title: 'The Midday Visor',
    description: 'Keep the sun out of your eyes and focus on the ball. Features a moisture-wicking sweatband and adjustable fit.',
    vendor: 'Midday Crew',
    productType: 'Apparel',
    tags: ['apparel', 'hats'],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 38.00, currencyCode: 'USD' } },
    images: [{ url: '/images/apparel/visor.jpg', altText: 'The Midday Visor', width: 800, height: 1000 }],
    variants: [
      { id: 'v-14-1', title: 'Chalk', availableForSale: true, price: { amount: 38.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Chalk' }] },
      { id: 'v-14-2', title: 'Navy', availableForSale: true, price: { amount: 38.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Navy' }] },
      { id: 'v-14-3', title: 'Sage', availableForSale: true, price: { amount: 38.00, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Sage' }] }
    ]
  }
];

export const PADDLE_SCORES: Record<string, { touch: number; power: number; spin: number; handSpeed: number; sweetSpot: number }> = {
  'selkirk-luxx-control-air': { touch: 10, power: 7, spin: 8, handSpeed: 8, sweetSpot: 9 },
  'selkirk-vanguard-power-air-invikta': { touch: 7, power: 10, spin: 9, handSpeed: 8, sweetSpot: 7 },
  'joola-ben-johns-perseus-16mm': { touch: 8, power: 9, spin: 9, handSpeed: 8, sweetSpot: 8 },
  'joola-ben-johns-scorpeus': { touch: 8, power: 8, spin: 8, handSpeed: 10, sweetSpot: 9 },
  'diadem-edge-18k': { touch: 9, power: 8, spin: 10, handSpeed: 8, sweetSpot: 8 },
  'diadem-warrior-v2': { touch: 10, power: 7, spin: 8, handSpeed: 7, sweetSpot: 10 }
};

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getProductsByCollection(collectionHandle: string): Product[] {
  if (collectionHandle === 'all') return PRODUCTS;
  if (collectionHandle === 'paddles') return PRODUCTS.filter((p) => p.productType === 'Paddle');
  if (collectionHandle === 'apparel') return PRODUCTS.filter((p) => p.productType === 'Apparel');
  if (collectionHandle === 'court-edit') return PRODUCTS.filter((p) => p.productType === 'Accessories');
  return [];
}

export const UPSELL_PRODUCTS = [
  PRODUCTS.find(p => p.handle === 'performance-overgrip-3-pack')!,
  PRODUCTS.find(p => p.handle === 'tournament-pickleballs-3-pack')!,
  PRODUCTS.find(p => p.handle === 'midday-crew-court-towel-2-pack')!
];
