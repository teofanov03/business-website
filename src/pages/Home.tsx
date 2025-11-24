import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Lightbulb, Target, Rocket, HeadphonesIcon, Star } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: Lightbulb,
      title: 'Consulting',
      description: 'Expert guidance to help your business thrive in a competitive market.',
    },
    {
      icon: Target,
      title: 'Strategy',
      description: 'Data-driven strategies tailored to your unique business goals.',
    },
    {
      icon: Rocket,
      title: 'Implementation',
      description: 'Seamless execution of solutions that deliver real results.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Support',
      description: 'Ongoing support to ensure your continued success and growth.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      content: 'Working with this team transformed our business. Their expertise and dedication are unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'Growth Solutions LLC',
      content: 'Professional, efficient, and results-driven. They exceeded our expectations in every way.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Ventures',
      content: 'The strategic insights we received were invaluable. Our ROI has increased significantly.',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Elevate Your Business to New Heights"
        subtitle="We provide professional services that help small businesses grow, succeed, and thrive in today's competitive market."
        ctaText="Get Started"
        ctaLink="/contact"
      />

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed to meet your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help your business achieve its goals
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}