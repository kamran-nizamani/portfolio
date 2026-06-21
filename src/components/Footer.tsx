import React from 'react';
import { PROFILE } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border px-6 md:px-12 lg:px-20 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} Kamran Khan</div>
      <div className="flex gap-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
