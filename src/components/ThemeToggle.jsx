import { useEffect, useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-white dark:text-yellow-300 p-2 rounded hover:bg-white/10 transition-all"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
