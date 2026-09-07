import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  elevation?: 'flat' | 'low' | 'high';
  clickable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowOnHover = false,
  elevation = 'low',
  clickable = false,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  const baseStyle = isDarkMode
    ? 'bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
    : 'bg-white/90 backdrop-blur-md border border-black/8 text-[#0F0F0F] shadow-[0_4px_20px_rgba(0,0,0,0.06)]';

  const glowStyle = glowOnHover
    ? 'hover:border-[#FF6B35]/50 hover:shadow-[0_8px_30px_rgba(255,107,55,0.18)] transition-all duration-300'
    : '';

  const elevationStyle = {
    flat: '',
    low: isDarkMode ? 'shadow-lg shadow-black/40' : 'shadow-md shadow-gray-200/50',
    high: isDarkMode ? 'shadow-2xl shadow-black/80' : 'shadow-xl shadow-gray-300/60',
  }[elevation];

  return (
    <motion.div
      whileHover={clickable ? { y: -3, scale: 1.005 } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl p-6 transition-colors duration-200 ${baseStyle} ${glowStyle} ${elevationStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
