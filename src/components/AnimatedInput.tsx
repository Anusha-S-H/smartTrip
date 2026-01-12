import { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative"
        >
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground transition-all duration-300',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
              'hover:border-primary/50',
              Icon && 'pl-12',
              error && 'border-destructive focus:ring-destructive',
              className
            )}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';
