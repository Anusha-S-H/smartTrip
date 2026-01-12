import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Plane, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { AnimatedInput } from '@/components/AnimatedInput';
import { GradientButton } from '@/components/GradientButton';
import { FadeIn } from '@/components/animations/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const result = await signup(formData.name, formData.email, formData.password);
    setIsLoading(false);

    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Failed to create account');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          <FadeIn>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="glass-card p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="inline-flex gradient-bg-primary w-16 h-16 rounded-2xl items-center justify-center mb-4"
                >
                  <Plane className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
                <p className="text-muted-foreground">
                  Start planning smarter trips today
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatedInput
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <AnimatedInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <AnimatedInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />

                <GradientButton
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-6"
                >
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </GradientButton>
              </form>

              {/* Footer */}
              <p className="text-center mt-6 text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
