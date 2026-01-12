import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Plane, MapPin, Calendar, Users, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { GradientButton } from '@/components/GradientButton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { useTrip } from '@/contexts/TripContext';

const quickStats = [
  { icon: Plane, label: 'Total Trips', value: '0', color: 'text-primary' },
  { icon: TrendingUp, label: 'Budget Saved', value: '$0', color: 'text-success' },
  { icon: MapPin, label: 'Destinations', value: '0', color: 'text-accent' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { trips } = useTrip();

  const firstName = user?.name?.split(' ')[0] || 'Traveler';

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <FadeIn>
            <div className="glass-card p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome back,{' '}
                    <span className="gradient-text">{firstName}!</span>
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Ready to plan your next adventure? Let's make it happen.
                  </p>
                </div>
                <Link to="/plan">
                  <GradientButton size="lg" className="group whitespace-nowrap">
                    <Plus className="h-5 w-5" />
                    <span>New Trip Plan</span>
                  </GradientButton>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Quick Stats */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 card-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="gradient-bg-primary w-12 h-12 rounded-xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Recent Trips or Empty State */}
          <FadeIn delay={0.2}>
            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold mb-6">Recent Trip Plans</h2>

              {trips.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="inline-flex gradient-bg-primary w-20 h-20 rounded-2xl items-center justify-center mb-6 opacity-50"
                  >
                    <Plane className="h-10 w-10 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">No trips planned yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start planning your first trip and let our AI help you budget smartly.
                  </p>
                  <Link to="/plan">
                    <GradientButton>
                      <Plus className="h-5 w-5" />
                      <span>Create Your First Trip</span>
                    </GradientButton>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {trips.map((trip) => (
                    <Link key={trip.id} to={`/results/${trip.id}`}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="gradient-bg-primary w-10 h-10 rounded-lg flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{trip.destination}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {trip.duration} days
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {trip.people} people
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${trip.budget.toLocaleString()}</p>
                          <p className={`text-sm ${trip.isSufficient ? 'text-success' : 'text-destructive'}`}>
                            {trip.isSufficient ? 'Sufficient' : 'Insufficient'}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
