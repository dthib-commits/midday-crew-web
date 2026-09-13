import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Page Not Found | Midday Crew',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-court-cream flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-8xl md:text-9xl text-court-navy mb-6">404</h1>
      <h2 className="font-sans text-2xl md:text-3xl text-court-charcoal mb-8">Page not found</h2>
      <p className="font-sans text-court-charcoal/70 mb-10 max-w-md mx-auto">
        The court you're looking for doesn't exist. It might have been moved or the URL might be incorrect.
      </p>
      <Button as="link" href="/" variant="primary" size="lg">
        Return to Court
      </Button>
    </div>
  );
}
