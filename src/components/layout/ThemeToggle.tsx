import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`w-10 h-10 rounded-full flex items-center justify-center relative cursor-pointer transition-colors duration-300 border ${
        isDarkMode
          ? 'bg-white/10 hover:bg-white/20 border-white/15 text-amber-300 shadow-[0_0_15px_rgba(255,107,55,0.25)] hover:shadow-[0_0_20px_rgba(255,107,55,0.45)]'
          : 'bg-black/5 hover:bg-black/10 border-black/10 text-orange-600 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.7 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-[#FFA366]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.7 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="w-5 h-5 text-[#FF6B35]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
