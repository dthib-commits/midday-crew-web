import { PADDLE_SCORES } from '@/lib/mockData';

interface MiddayScorecardProps {
  handle: string;
}

export function MiddayScorecard({ handle }: MiddayScorecardProps) {
  const scores = PADDLE_SCORES[handle];
  
  if (!scores) return null;

  const metrics = [
    { label: 'Touch', value: scores.touch },
    { label: 'Power', value: scores.power },
    { label: 'Spin', value: scores.spin },
    { label: 'Hand Speed', value: scores.handSpeed },
    { label: 'Sweet Spot', value: scores.sweetSpot },
  ];

  return (
    <div className="mt-12 bg-court-cream border border-court-sand p-6 sm:p-8">
      <h3 className="font-serif text-2xl text-court-navy mb-6">The Midday Scorecard</h3>
      <div className="space-y-4 font-sans">
        {metrics.map((metric) => (
          <div key={metric.label} className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm text-court-charcoal font-medium uppercase tracking-wider col-span-1">
              {metric.label}
            </span>
            <div className="col-span-2 h-1.5 bg-court-sand/40 rounded-full overflow-hidden" role="progressbar" aria-valuenow={metric.value} aria-valuemin={0} aria-valuemax={10}>
              <div 
                className="h-full bg-court-sage rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(metric.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
