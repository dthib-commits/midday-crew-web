export const metadata = {
  title: 'Community Events & Clinics | Midday Crew',
  description: 'Join the Midday Crew in Dallas, TX for weekly open rallies, tournament clinics, and paddle demo days.',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-court-cream/30">
      {/* Hero */}
      <div className="bg-court-navy text-court-cream py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="font-sans text-xs uppercase tracking-widest text-court-terracotta mb-3 font-semibold">
            Dallas, TX Community Hub
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">The Midday Club</h1>
          <p className="font-sans text-base md:text-lg text-court-cream/80 max-w-2xl mx-auto leading-relaxed">
            From Riverchon Park to Oasis, join the crew for weekly open rallies, tournament clinics, and demo days across DFW.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Weekly Schedule */}
        <section>
          <div className="text-center mb-10">
            <span className="text-xs font-sans uppercase tracking-widest text-court-sage font-semibold">
              Join the Rotation
            </span>
            <h2 className="font-serif text-3xl text-court-navy mt-1">Weekly Schedule</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-sm shadow-xs border border-court-sand/40">
              <div className="text-court-terracotta font-sans text-xs uppercase tracking-widest mb-1 font-semibold">Tuesdays</div>
              <h3 className="font-serif text-2xl text-court-navy mb-2">Twilight Rallies</h3>
              <p className="font-sans text-xs text-court-charcoal/70 mb-3">Riverchon Park • Oak Lawn, Dallas</p>
              <p className="font-sans text-sm text-court-navy font-semibold mb-4">6:00 PM – 8:30 PM</p>
              <p className="text-xs font-sans text-court-charcoal/80 mb-4">
                Casual round-robin open play under the evening court lights. All skill levels welcome.
              </p>
              <span className="bg-court-sand/30 px-2.5 py-1 rounded-xs text-[11px] font-sans text-court-charcoal font-medium">All Levels</span>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-xs border border-court-sand/40">
              <div className="text-court-terracotta font-sans text-xs uppercase tracking-widest mb-1 font-semibold">Saturdays</div>
              <h3 className="font-serif text-2xl text-court-navy mb-2">Morning Dink Club</h3>
              <p className="font-sans text-xs text-court-charcoal/70 mb-3">Cole Park • Uptown Dallas</p>
              <p className="font-sans text-sm text-court-navy font-semibold mb-4">8:00 AM – 11:00 AM</p>
              <p className="text-xs font-sans text-court-charcoal/80 mb-4">
                Structured competitive king-of-the-court drill sessions followed by team tacos and cold brew.
              </p>
              <span className="bg-court-sand/30 px-2.5 py-1 rounded-xs text-[11px] font-sans text-court-charcoal font-medium">3.5+ Competitive</span>
            </div>

            <div className="bg-court-navy p-8 rounded-sm shadow-xs text-court-cream border border-court-navy">
              <div className="text-court-terracotta font-sans text-xs uppercase tracking-widest mb-1 font-semibold">Sundays</div>
              <h3 className="font-serif text-2xl mb-2">Masterclass &amp; Demos</h3>
              <p className="font-sans text-xs text-court-cream/70 mb-3">Fretz Tennis &amp; Pickleball Center</p>
              <p className="font-sans text-sm font-medium mb-4">9:00 AM Start</p>
              <p className="text-xs font-sans text-court-cream/80 mb-4">
                Hands-on coaching clinic. Test-drive Selkirk LUXX, JOOLA Perseus, and Diadem 18K models free on court.
              </p>
              <span className="bg-white/10 px-2.5 py-1 rounded-xs text-[11px] font-sans text-court-cream font-medium">Demo Day Included</span>
            </div>
          </div>
        </section>

        {/* Local Courts Directory */}
        <section className="bg-white p-8 sm:p-12 rounded-sm border border-court-sand/40 shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-sans uppercase tracking-widest text-court-sage font-semibold">
              The Court Guide
            </span>
            <h2 className="font-serif text-3xl text-court-navy mt-1">Where We Play in DFW</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Riverchon Park', addr: '3505 Maple Ave, Dallas', courts: '4 Dedicated Courts', surface: 'Outdoor Hard Court' },
              { name: 'Cole Park', addr: '4000 McKinney Ave, Dallas', courts: '6 Dedicated Courts', surface: 'Outdoor Hard Court' },
              { name: 'Fretz Center', addr: '6950 Belt Line Rd, Dallas', courts: '12 Dedicated Courts', surface: 'Tournament Spec' },
              { name: 'Oasis Pickleball', addr: '5757 State Hwy 205, Rockwall', courts: '40+ Dedicated Courts', surface: 'Championship Pro' }
            ].map(court => (
              <div key={court.name} className="border-l-2 border-court-terracotta pl-4 py-1">
                <h4 className="font-serif text-lg text-court-navy">{court.name}</h4>
                <p className="text-xs font-sans text-court-charcoal/60 mb-2">{court.addr}</p>
                <div className="space-y-1 text-xs font-sans text-court-charcoal/80">
                  <p className="font-medium">• {court.courts}</p>
                  <p className="text-court-charcoal/60">• {court.surface}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
