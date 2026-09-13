'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/mockData';
import { useCart } from '@/components/cart/CartProvider';
import { ArrowRight, RotateCcw, Check, Sparkles } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    tag: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'challenge',
    title: 'What is your primary challenge on court?',
    subtitle: 'Identify the shot or situation where you lose the most points.',
    options: [
      {
        label: 'Soft resets & kitchen popups',
        description: 'Hard drives bounce too high off my paddle; I need plush control.',
        tag: 'touch'
      },
      {
        label: 'Putting balls away & drive power',
        description: 'My drops are solid, but I lack finishing speed from the baseline.',
        tag: 'power'
      },
      {
        label: 'Hand speed in fast kitchen exchanges',
        description: 'I get jammed or caught late during rapid fire volleys.',
        tag: 'speed'
      },
      {
        label: 'Arm, wrist, or tennis elbow fatigue',
        description: 'Off-center strikes send harsh vibrations through my forearm.',
        tag: 'comfort'
      }
    ]
  },
  {
    id: 'background',
    title: 'What is your athletic background?',
    subtitle: 'Your existing mechanics dictate the ideal paddle swingweight and surface bite.',
    options: [
      {
        label: 'Tennis Player',
        description: 'Accustomed to driving through the ball and shaping heavy topspin.',
        tag: 'tennis'
      },
      {
        label: 'Table Tennis / Badminton',
        description: 'Rely on quick wrist snap, deceptive angles, and rapid reflexes.',
        tag: 'tabletennis'
      },
      {
        label: 'Multi-Sport / Former Athlete',
        description: 'Strong hand-eye coordination, looking for an all-around weapon.',
        tag: 'athlete'
      },
      {
        label: 'New to Racquet Sports',
        description: 'Need maximum forgiveness, large sweet spot, and easy maneuverability.',
        tag: 'recreation'
      }
    ]
  },
  {
    id: 'grip',
    title: 'What is your preferred backhand style?',
    subtitle: 'Handle length is critical for reach and two-handed stability.',
    options: [
      {
        label: 'Modern Two-Handed Backhand',
        description: 'I need an extended 5.5" handle for comfortable two-handed placement.',
        tag: 'two-handed'
      },
      {
        label: 'Traditional One-Handed Reach',
        description: 'Standard 5.25" – 5.35" handle gives me maximum reach and maneuverability.',
        tag: 'one-handed'
      }
    ]
  }
];

export function PaddleMatchmaker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matchedHandle, setMatchedHandle] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleSelect = (questionId: string, tag: string) => {
    const updated = { ...answers, [questionId]: tag };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate match
      const challenge = updated['challenge'];
      const bg = updated['background'];
      const grip = updated['grip'];

      let match = 'selkirk-luxx-control-air';

      if (challenge === 'comfort') {
        match = 'diadem-warrior-v2'; // 19mm plush vibration dampening
      } else if (grip === 'two-handed') {
        match = 'joola-ben-johns-perseus-16mm'; // 5.5" handle
      } else if (challenge === 'speed') {
        match = 'joola-ben-johns-scorpeus'; // 14mm widebody speed
      } else if (challenge === 'power') {
        match = 'selkirk-vanguard-power-air-invikta'; // Baseline power
      } else if (bg === 'tennis') {
        match = 'diadem-edge-18k'; // 18K Triaxial spin
      } else {
        match = 'selkirk-luxx-control-air'; // Finesse & kitchen control
      }

      setMatchedHandle(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedHandle(null);
  };

  const matchedProduct = matchedHandle ? PRODUCTS.find(p => p.handle === matchedHandle) : null;

  const handleAddToCart = () => {
    if (matchedProduct) {
      addItem(matchedProduct, matchedProduct.variants[0], 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (matchedProduct) {
    return (
      <div className="bg-white max-w-3xl mx-auto p-8 sm:p-12 rounded-sm border border-court-sand/40 shadow-xl animate-fade-in">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-court-sage/10 text-court-sage rounded-full text-xs font-sans uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 98% Match For Your Playstyle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-court-navy">
            Your Recommended Paddle
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-court-cream/30 p-6 rounded-sm border border-court-sand/30">
          <div className="relative w-48 h-48 bg-white rounded-sm overflow-hidden flex-shrink-0 shadow-xs">
            <Image
              src={matchedProduct.images[0]?.url || ''}
              alt={matchedProduct.title}
              fill
              className="object-contain p-3"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] font-sans uppercase tracking-widest text-court-charcoal/60">
              {matchedProduct.vendor} • USAPA Tournament Approved
            </p>
            <h3 className="font-serif text-2xl text-court-navy font-semibold">{matchedProduct.title}</h3>
            <p className="text-sm font-sans text-court-charcoal/80 leading-relaxed">
              {matchedProduct.description}
            </p>
            <p className="text-xl font-serif text-court-navy pt-2">
              ${matchedProduct.priceRange.minVariantPrice.amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-court-sand/15 p-6 rounded-sm mb-8 space-y-2 text-sm font-sans">
          <h4 className="font-semibold text-court-navy uppercase tracking-wider text-xs">Why This Fits You:</h4>
          <ul className="space-y-1.5 text-court-charcoal/80 text-xs">
            <li>• Engineered specifically to solve your target court challenge with optimized core density.</li>
            <li>• Tournament-grade surface material matches your athletic swing path and backhand preference.</li>
            <li>• Eligible for our 30-Day Court Guarantee: play in it on Dallas courts, or exchange free.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 bg-court-navy text-court-cream font-sans text-xs uppercase tracking-widest hover:bg-court-terracotta transition-colors flex items-center justify-center gap-2 rounded-xs"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" /> Added to Your Bag
              </>
            ) : (
              'Add to Bag • $100+ Free Shipping'
            )}
          </button>
          <Link
            href={`/products/${matchedProduct.handle}`}
            className="px-6 py-4 border border-court-navy text-court-navy font-sans text-xs uppercase tracking-widest hover:bg-court-sand/20 transition-colors text-center rounded-xs"
          >
            View Full Specs
          </Link>
          <button
            onClick={handleReset}
            className="p-4 border border-court-sand text-court-charcoal/60 hover:text-court-navy transition-colors flex items-center justify-center rounded-xs"
            aria-label="Retake Quiz"
            title="Retake Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentStep];

  return (
    <div className="bg-white max-w-2xl mx-auto p-8 sm:p-12 rounded-sm border border-court-sand/40 shadow-xl">
      {/* Step Indicator */}
      <div className="flex items-center justify-between text-xs font-sans text-court-charcoal/50 mb-8 border-b border-court-sand/30 pb-4">
        <span className="uppercase tracking-widest font-medium">Question {currentStep + 1} of {QUESTIONS.length}</span>
        <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete</span>
      </div>

      <div className="mb-8">
        <h3 className="font-serif text-2xl md:text-3xl text-court-navy mb-2">{q.title}</h3>
        <p className="font-sans text-sm text-court-charcoal/70">{q.subtitle}</p>
      </div>

      <div className="space-y-3 mb-8">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(q.id, opt.tag)}
            className="w-full text-left p-5 rounded-sm border border-court-sand/40 hover:border-court-navy hover:bg-court-cream/40 transition-all duration-200 group flex items-start justify-between"
          >
            <div>
              <div className="font-sans font-medium text-sm text-court-navy group-hover:text-court-terracotta transition-colors">
                {opt.label}
              </div>
              <div className="font-sans text-xs text-court-charcoal/60 mt-1">
                {opt.description}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-court-charcoal/30 group-hover:text-court-navy group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(prev => prev - 1)}
          className="text-xs font-sans text-court-charcoal/50 hover:text-court-navy uppercase tracking-widest"
        >
          ← Back to previous question
        </button>
      )}
    </div>
  );
}
