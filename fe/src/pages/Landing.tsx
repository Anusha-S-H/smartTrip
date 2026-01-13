import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Wallet, MapPin, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { GradientButton } from '@/components/GradientButton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: Wallet,
    title: 'Smart Budgeting',
    description: 'AI-powered expense breakdown tailored to your destination and travel style.',
  },
  {
    icon: MapPin,
    title: 'Destination Insights',
    description: 'Get cost estimates based on real travel data from around the world.',
  },
  {
    icon: TrendingUp,
    title: 'Savings Tips',
    description: 'Personalized recommendations to make the most of your travel budget.',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Intelligent suggestions for accommodations, activities, and more.',
  },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Travel Planning
              </span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text-hero animate-gradient">Plan Smart.</span>
              <br />
              <span className="text-foreground">Travel Better.</span>
              <br />
              <span className="gradient-text">Spend Wisely.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Your intelligent travel companion that analyzes your budget, breaks down expenses,
              and gives personalized recommendations for your dream trip.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
                <GradientButton size="lg" className="group">
                  <span>Start Planning</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <Link to={isAuthenticated ? '/plan' : '/login'}>
                <GradientButton variant="outline" size="lg">
                  {isAuthenticated ? 'Create Trip' : 'Login'}
                </GradientButton>
              </Link>
            </div>
          </FadeIn>

          {/* Floating Animation */}
          <FadeIn delay={0.4}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16"
            >
              <div className="glass-card inline-flex items-center gap-4 px-6 py-4">
                <div className="gradient-bg-primary rounded-full p-3">
                  <Plane className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Average savings</p>
                  <p className="text-xl font-bold gradient-text">$1,250 per trip</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need for{' '}
                <span className="gradient-text">Smart Travel Planning</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform helps you make informed decisions about your travel budget.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 h-full card-hover"
                >
                  <div className="gradient-bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-bg-primary opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Next Adventure?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of smart travelers who save money and stress with our intelligent budget planner.
              </p>
              <Link to={isAuthenticated ? '/plan' : '/signup'}>
                <GradientButton size="lg" className="group">
                  <span>Get Started Free</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="gradient-bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold gradient-text">TripBudget</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Smart Trip Budget Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
