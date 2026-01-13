import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Hotel, Utensils, Ticket, ShoppingBag, 
  CheckCircle2, AlertCircle, Sparkles, ArrowLeft, Plus,
  MapPin, Calendar, Users, Wallet
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Navbar } from '@/components/Navbar';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { GradientButton } from '@/components/GradientButton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { useTrip } from '@/contexts/TripContext';
import { useEffect } from 'react';

const expenseIcons = {
  travel: Plane,
  stay: Hotel,
  food: Utensils,
  activities: Ticket,
  miscellaneous: ShoppingBag,
};

const expenseColors = [
  'hsl(185, 84%, 40%)',  // Teal
  'hsl(260, 70%, 58%)',  // Purple
  'hsl(320, 70%, 55%)',  // Pink
  'hsl(38, 92%, 50%)',   // Amber
  'hsl(142, 76%, 36%)',  // Green
];

export default function Results() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips, selectTrip, currentTrip } = useTrip();

  useEffect(() => {
    if (tripId) {
      selectTrip(tripId);
    }
  }, [tripId, selectTrip]);

  // Use demo data if no trip found
  const trip = currentTrip || {
    id: 'demo',
    destination: 'Paris, France',
    budget: 5000,
    duration: 7,
    people: 2,
    month: 'June',
    createdAt: new Date(),
    breakdown: {
      travel: 1200,
      stay: 1400,
      food: 840,
      activities: 600,
      miscellaneous: 360,
    },
    totalEstimated: 4400,
    isSufficient: true,
    extraRequired: 0,
    aiRecommendation: "Great news! Your budget for Paris, France looks solid. Consider setting aside 10-15% for unexpected expenses or spontaneous experiences. Pro tip: Book activities in advance to secure better rates and availability. You might even have room for a special dining experience or a unique local tour!",
  };

  const pieData = Object.entries(trip.breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const barData = Object.entries(trip.breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    amount: value,
  }));

  const remainingBudget = trip.budget - trip.totalEstimated;

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>
              <Link to="/plan">
                <GradientButton size="sm">
                  <Plus className="h-4 w-4" />
                  New Trip
                </GradientButton>
              </Link>
            </div>
          </FadeIn>

          {/* Trip Summary Card */}
          <FadeIn delay={0.1}>
            <div className="glass-card p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Trip to <span className="gradient-text">{trip.destination}</span>
                  </h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {trip.duration} days in {trip.month}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {trip.people} travelers
                    </span>
                    <span className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      ${trip.budget.toLocaleString()} budget
                    </span>
                  </div>
                </div>

                {/* Budget Status */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className={`glass-card p-6 text-center ${
                    trip.isSufficient ? 'border-success/50' : 'border-destructive/50'
                  }`}
                >
                  {trip.isSufficient ? (
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-2" />
                  ) : (
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
                  )}
                  <p className={`text-lg font-bold ${trip.isSufficient ? 'text-success' : 'text-destructive'}`}>
                    {trip.isSufficient ? 'Budget Sufficient!' : 'Budget Insufficient'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {trip.isSufficient 
                      ? `$${remainingBudget.toLocaleString()} remaining`
                      : `Need $${trip.extraRequired.toLocaleString()} more`
                    }
                  </p>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FadeIn delay={0.2}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-6">Expense Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={expenseColors[index % expenseColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-6">Expense Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={expenseColors[index % expenseColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Expense Cards */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(trip.breakdown).map(([key, value], index) => {
              const Icon = expenseIcons[key as keyof typeof expenseIcons];
              return (
                <StaggerItem key={key}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-4 text-center card-hover"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: expenseColors[index] }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground capitalize mb-1">{key}</p>
                    <p className="text-lg font-bold">${value.toLocaleString()}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* AI Recommendation */}
          <FadeIn delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 gradient-bg-primary opacity-5" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="gradient-bg-accent w-10 h-10 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Recommendation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {trip.aiRecommendation}
                </p>
              </div>
            </motion.div>
          </FadeIn>

          {/* Summary Footer */}
          <FadeIn delay={0.5}>
            <div className="mt-8 glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-xl font-bold">${trip.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <p className="text-xl font-bold">${trip.totalEstimated.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {trip.isSufficient ? 'Remaining' : 'Shortfall'}
                    </p>
                    <p className={`text-xl font-bold ${trip.isSufficient ? 'text-success' : 'text-destructive'}`}>
                      ${Math.abs(remainingBudget).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost per Day</p>
                    <p className="text-xl font-bold">
                      ${Math.round(trip.totalEstimated / trip.duration).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
