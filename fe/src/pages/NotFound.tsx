import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Plane } from 'lucide-react';
import { GradientButton } from '@/components/GradientButton';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <BackgroundOrbs />
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="inline-flex gradient-bg-primary w-24 h-24 rounded-3xl items-center justify-center mb-8"
        >
          <Plane className="h-12 w-12 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold gradient-text mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground mb-8"
        >
          Oops! This destination doesn't exist on our map.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/">
            <GradientButton size="lg">
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
