import { useEffect, useState } from 'react';

export const useDarkMode = (initialState: boolean) => {
  const [darkMode, setDarkMode] = useState(initialState);

  useEffect(() => {
    const preferedThemeMode = localStorage.getItem('theme') || '';
    if (!preferedThemeMode) return;
    if (preferedThemeMode === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
