import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeColors } from '../types';

export const DARK_THEME_COLORS: ThemeColors = {
  background: '#0F0F0F',
  surface: '#1A1A1A',
  elevated: '#242424',
  primary: '#FF6B35',
  secondary: '#FFA366',
  accent: '#00D9FF',
  textPrimary: '#FFFFFF',
  textSecondary: '#E5E5E5',
  textTertiary: '#A8A8A8',
  borderDark: 'rgba(255,255,255,0.12)',
  borderLight: 'rgba(255,255,255,0.20)',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  elevated: '#F3F3F3',
  primary: '#FF6B35',
  secondary: '#FFA366',
  accent: '#0099CC',
  textPrimary: '#0F0F0F',
  textSecondary: '#404040',
  textTertiary: '#727272',
  borderDark: 'rgba(0,0,0,0.12)',
  borderLight: 'rgba(0,0,0,0.08)',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('smartbite_theme');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      // System preference fallback, default to dark
      return true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smartbite_theme', isDarkMode ? 'dark' : 'light');
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        root.classList.remove('light');
        document.body.style.backgroundColor = DARK_THEME_COLORS.background;
        document.body.style.color = DARK_THEME_COLORS.textPrimary;
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        document.body.style.backgroundColor = LIGHT_THEME_COLORS.background;
        document.body.style.color = LIGHT_THEME_COLORS.textPrimary;
      }
    } catch (e) {
      console.error('Failed to sync theme to root DOM', e);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const colors = isDarkMode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
