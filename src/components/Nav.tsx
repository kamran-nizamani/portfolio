import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useAnimations';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollToElement = useSmoothScroll();

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToElement(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <nav className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-20" aria-label="Primary">
        <a href="#home" onClick={(e) => handleClick(e, 'home')} className="font-semibold text-zinc-100">
          Kamran Khan
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-zinc-300 p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t border-border bg-bg px-6 py-4 gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="block py-2.5 text-sm text-zinc-300 hover:text-zinc-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Nav;
