"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // 1. Check local storage or system preference on load
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // 2. Apply the class to the HTML tag
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-all shadow-md"
      title="Toggle Dark Mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}