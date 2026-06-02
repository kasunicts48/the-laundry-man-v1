import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

export default function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'premium';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-gold/30 bg-white/5 transition-all text-xs font-bold uppercase tracking-widest text-white">
      <Palette size={14} className="text-gold" />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="appearance-none bg-transparent outline-none cursor-pointer text-white [&>option]:bg-navy"
        aria-label="Select Theme"
      >
        <option value="premium">Premium</option>
        <option value="fresh-eco">Fresh Eco</option>
        <option value="organic">Organic</option>
        <option value="deep-woods">Deep Woods</option>
      </select>
    </div>
  );
}
