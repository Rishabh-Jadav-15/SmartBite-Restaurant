import { useTheme as useThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const { isDarkMode, toggleTheme, setDarkMode, colors } = useThemeContext();
  return {
    isDarkMode,
    toggleTheme,
    setDarkMode,
    colors,
    theme: {
      colors,
    },
  };
};
