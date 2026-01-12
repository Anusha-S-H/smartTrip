import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Wallet, Calendar, Users, Cloud, ArrowRight, Plane } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { AnimatedInput } from '@/components/AnimatedInput';
import { GradientButton } from '@/components/GradientButton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { useTrip } from '@/contexts/TripContext';
import { toast } from 'sonner';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function TripPlan() {
  const navigate = useNavigate();
  const { createTrip } = useTrip();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: '',
    people: '',
    month: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!formData.budget || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget';
    }
    if (!formData.duration || Number(formData.duration) <= 0) {
      newErrors.duration = 'Please enter trip duration';
    }
    if (!formData.people || Number(formData.people) <= 0) {
      newErrors.people = 'Please enter number of travelers';
    }
    if (!formData.month) {
      newErrors.month = 'Please select a travel month';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const trip = createTrip({
      destination: formData.destination,
      budget: Number(formData.budget),
      duration: Number(formData.duration),
      people: Number(formData.people),
      month: formData.month,
    });

    setIsLoading(false);
    toast.success('Trip analyzed successfully!');
    navigate(`/results/${trip.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="inline-flex gradient-bg-primary w-16 h-16 rounded-2xl items-center justify-center mb-4"
              >
                <Plane className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Plan Your <span className="gradient-text">Dream Trip</span>
              </h1>
              <p className="text-muted-foreground">
                Enter your trip details and let our AI analyze your budget
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="glass-card p-8"
            >
              <form onSubmit={handleSubmit}>
                <StaggerContainer className="space-y-6">
                  <StaggerItem>
                    <AnimatedInput
                      label="Destination"
                      name="destination"
                      type="text"
                      placeholder="Paris, France"
                      icon={MapPin}
                      value={formData.destination}
                      onChange={handleChange}
                      error={errors.destination}
                    />
                  </StaggerItem>

                  <StaggerItem>
                    <AnimatedInput
                      label="Total Budget (USD)"
                      name="budget"
                      type="number"
                      placeholder="5000"
                      icon={Wallet}
                      value={formData.budget}
                      onChange={handleChange}
                      error={errors.budget}
                    />
                  </StaggerItem>

                  <StaggerItem>
                    <div className="grid grid-cols-2 gap-4">
                      <AnimatedInput
                        label="Duration (Days)"
                        name="duration"
                        type="number"
                        placeholder="7"
                        icon={Calendar}
                        value={formData.duration}
                        onChange={handleChange}
                        error={errors.duration}
                      />

                      <AnimatedInput
                        label="Number of People"
                        name="people"
                        type="number"
                        placeholder="2"
                        icon={Users}
                        value={formData.people}
                        onChange={handleChange}
                        error={errors.people}
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Travel Month
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Cloud className="h-5 w-5" />
                        </div>
                        <select
                          name="month"
                          value={formData.month}
                          onChange={handleChange}
                          className={`w-full rounded-xl border border-border bg-card pl-12 pr-4 py-3 text-foreground transition-all duration-300
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                            hover:border-primary/50 appearance-none cursor-pointer
                            ${errors.month ? 'border-destructive focus:ring-destructive' : ''}`}
                        >
                          <option value="">Select a month</option>
                          {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      {errors.month && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.month}
                        </motion.p>
                      )}
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <GradientButton
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={isLoading}
                      className="mt-4"
                    >
                      <span>Analyze My Budget</span>
                      <ArrowRight className="h-5 w-5" />
                    </GradientButton>
                  </StaggerItem>
                </StaggerContainer>
              </form>
            </motion.div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
