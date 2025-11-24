import { Button } from './ui/button';
import { Link } from 'react-router';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export function Hero({ title, subtitle, ctaText, ctaLink, className = '' }: HeroProps) {
  return (
    <section className={`bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <div>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}