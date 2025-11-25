import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Check } from 'lucide-react';
import { Lightbulb, Target, Rocket, HeadphonesIcon, BarChart, Users, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const mainServices = [
    { icon: Lightbulb, title: 'Business Consulting', description: 'Expert guidance to help your business thrive in a competitive market.' },
    { icon: Target, title: 'Strategic Planning', description: 'Data-driven strategies tailored to your unique business goals.' },
    { icon: Rocket, title: 'Implementation', description: 'Seamless execution of solutions that deliver real results.' },
    { icon: HeadphonesIcon, title: 'Ongoing Support', description: 'Continuous support to ensure your success and growth.' },
    { icon: BarChart, title: 'Performance Analysis', description: 'In-depth analytics to track and optimize your business metrics.' },
    { icon: Users, title: 'Team Training', description: 'Comprehensive training programs to upskill your workforce.' },
    { icon: Zap, title: 'Process Optimization', description: 'Streamline operations for maximum efficiency and productivity.' },
    { icon: Shield, title: 'Risk Management', description: 'Identify and mitigate potential risks to protect your business.' },
  ];

  const packages = [
    { name: 'Starter', price: '$999', description: 'Perfect for small businesses getting started', features: ['Initial consultation','Business assessment','Strategic recommendations','Action plan development','Email support'] },
    { name: 'Professional', price: '$2,499', description: 'Ideal for growing businesses', features: ['Everything in Starter','Quarterly strategy sessions','Implementation support','Performance tracking','Priority support','Monthly reports'], featured: true },
    { name: 'Enterprise', price: 'Custom', description: 'Tailored solutions for large organizations', features: ['Everything in Professional','Dedicated account manager','Custom solutions','On-site consultations','24/7 support','Team training'] },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', description: 'We start by understanding your business, goals, and challenges through comprehensive consultations.' },
    { step: '02', title: 'Strategy', description: 'Our team develops a customized strategy tailored to your specific needs and objectives.' },
    { step: '03', title: 'Implementation', description: 'We work alongside you to execute the strategy, ensuring smooth integration and minimal disruption.' },
    { step: '04', title: 'Optimization', description: 'Continuous monitoring and refinement to maximize results and adapt to changing conditions.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero
          title="Our Services"
          subtitle="Comprehensive solutions designed to help your business grow and succeed"
          ctaText="Get in Touch"
          ctaLink="/contact"
        />
      </motion.div>

      {/* Main Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A full suite of services to address every aspect of your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the package that best fits your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className={pkg.featured ? 'border-blue-600 border-2 shadow-lg' : ''}>
                  <CardHeader>
                    {pkg.featured && (
                      <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <div className="text-4xl font-bold text-gray-900 mt-4">{pkg.price}</div>
                    <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A proven approach to delivering exceptional results</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex gap-6"
              >
                <div className="text-6xl font-bold text-blue-600 text-opacity-20 flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
