export interface WirePost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  body: string;
  image: string;
  tags: string[];
}

export const WIRE_POSTS: WirePost[] = [
  {
    slug: 'the-quiet-authority-of-broken-in-chino',
    title: 'The Quiet Authority of Broken-In Chino',
    subtitle: 'Why the most powerful garments in finance are the ones that look like they\'ve been worn for a decade.',
    date: '2026-09-10',
    author: 'The Editors',
    readTime: '4 min read',
    excerpt: 'In a world of performance fabrics and athleisure, the most respected operators in private equity reach for the same thing every weekend: a soft, faded, stone-washed cotton chino cap that looks like it\'s been through a hundred Saturday morning coffee runs.',
    body: `In a world of performance fabrics and athleisure, the most respected operators in private equity reach for the same thing every weekend: a soft, faded, stone-washed cotton chino cap that looks like it's been through a hundred Saturday morning coffee runs.

There's a reason for this. Broken-in chino twill communicates something that technical mesh and structured wool cannot: ease. Not the performative ease of a brand-new garment styled to look casual, but the genuine ease of a thing that has been lived in.

At Sponsor Backed, every cap starts with 100% long-staple cotton chino twill and goes through a 45-minute stone enzyme wash before a single stitch is placed. The result is a cap that feels like year three on day one.

The antique brass tri-glide slider develops a rich patina over time. The Augusta Green undervisor — visible only when the cap is removed or tilted back — is an insider detail that signals belonging without broadcasting it.

This is quiet authority. Not loud. Not branded across the chest. Just the right fabric, the right wash, and the right restraint.`,
    image: '/images/sponsor_backed_cap.jpg',
    tags: ['Craftsmanship', 'Heritage'],
  },
  {
    slug: 'why-deal-toys-deserve-better',
    title: 'Why Deal Toys Deserve Better',
    subtitle: 'The case against acrylic tombstones — and for closing gifts your team will actually use.',
    date: '2026-09-06',
    author: 'The Editors',
    readTime: '3 min read',
    excerpt: 'Every deal team has a shelf of acrylic tombstones collecting dust. They\'re expensive to produce, fragile to ship, and universally ignored after the first week. We built the Closing Crate as the antidote.',
    body: `Every deal team has a shelf of acrylic tombstones collecting dust. They're expensive to produce, fragile to ship, and universally ignored after the first week. We built the Closing Crate as the antidote.

The Sponsor Backed Closing Crate replaces the dusty commemorative plaque with three functional luxury goods your deal team will actually use:

A custom washed chino cap with the deal codename arched across the crown and the closing date embroidered on the rear arch. A 24 oz heavy duck canvas boat tote monogrammed with the transaction initials. And an 85-gram solid die-struck brass desk coin stamped with the closing year.

Every piece is produced in Dallas by The Hat Company with a 7-day turnaround. The entire set is presented in a wooden crate with a letterpress closing certificate.

PE firms capitalize deal toys as transaction closing expenses under IRC § 263(a), making the $145–$185 per-set cost a rounding error on any fund's closing budget.

The result: closing gifts that get worn to the golf course, carried to client dinners, and kept on mahogany desks for years. Not filed away in a drawer.`,
    image: '/images/closed_q4_brass_coin.jpg',
    tags: ['Deal Toys', 'Corporate'],
  },
  {
    slug: 'dallas-mill-embroidery-floor',
    title: 'Inside the Dallas Embroidery Floor',
    subtitle: 'How The Hat Company produces institutional-grade headwear on multi-head Ricoma machines.',
    date: '2026-09-01',
    author: 'The Editors',
    readTime: '5 min read',
    excerpt: 'Behind every Sponsor Backed cap is a commercial embroidery operation in Dallas, Texas. The Hat Company runs multi-head Ricoma machines with high-density Madeira threads and solid antique brass hardware.',
    body: `Behind every Sponsor Backed cap is a commercial embroidery operation in Dallas, Texas. The Hat Company runs multi-head Ricoma machines with high-density Madeira threads and solid antique brass hardware.

The process starts with blank cap selection. We use 100% long-staple cotton chino twill blanks that undergo a 45-minute stone enzyme wash to achieve the broken-in hand feel that defines the brand.

Embroidery digitization is handled in-house. Each design file is optimized for the specific thread density, stitch angle, and underlay pattern required by the fabric weight. Chain-stitch lettering on the flagship caps requires a different approach than the flat satin-stitch on the EBITDA rope hat or the micro-embroidery on the Pls Fix cap.

Hardware is sourced separately — solid antique brass tri-glide sliders, gunmetal buckles, and engraved crest pieces. These are hand-assembled after embroidery.

The Augusta Green undervisor — our signature detail — is a separate cotton twill panel stitched into the bill construction. It's visible only from below, making it an insider detail that connects every cap in the collection.

Quality control checks every cap for stitch registration, thread tension, hardware alignment, and wash consistency before it ships in our unbleached kraft presentation box.

This is not print-on-demand. This is commercial manufacturing with full vertical control over every stitch.`,
    image: '/images/ebitda_rope_hat.jpg',
    tags: ['Manufacturing', 'Dallas'],
  },
];

export function getPostBySlug(slug: string): WirePost | undefined {
  return WIRE_POSTS.find((p) => p.slug === slug);
}
