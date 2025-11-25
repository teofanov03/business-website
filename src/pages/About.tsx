import { Hero } from '../components/Hero';
import { Card, CardContent } from '../components/ui/card';
import { Users, Award, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our priority. We build lasting relationships based on trust and results.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, delivering quality you can count on.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We stay ahead of industry trends to provide cutting-edge solutions for your business.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honesty and transparency guide our actions, ensuring ethical business practices always.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Hero
          title="About Us"
          subtitle="We're a team of dedicated professionals committed to helping businesses succeed"
        />
      </motion.div>

      {/* Story Section */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to empower small and medium-sized businesses, we've grown into a trusted partner for companies seeking professional services and strategic guidance.
              </p>
              <p>
                Our team brings together decades of combined experience across various industries, allowing us to provide comprehensive solutions tailored to your unique needs. We believe that every business deserves access to world-class expertise and support.
              </p>
              <p>
                Today, we're proud to serve hundreds of clients, helping them overcome challenges, seize opportunities, and achieve sustainable growth. Our commitment to excellence and client satisfaction remains at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={cardVariants} whileHover={{ scale: 1.05 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={cardVariants} whileHover={{ scale: 1.03 }}>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
