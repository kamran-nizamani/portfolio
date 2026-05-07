/**
 * Reusable Section Heading Component
 * Ensures consistent typography and visual hierarchy across sections
 */

import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

/**
 * SectionHeading - Renders consistent section headers with animation
 * @param label - Small label above title (mono-style)
 * @param title - Main heading text
 * @param highlight - Part of title to highlight (brand color)
 * @param description - Optional description below title
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  highlight,
  description,
  className = ''
}) => {
  return (
    <div className={`text-center md:text-left ${className}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4 justify-center md:justify-start"
        >
          <div className="w-8 h-[1px] bg-brand/50 hidden sm:block" />
          <span className="font-mono text-[10px] sm:text-xs text-brand uppercase tracking-[0.2em] sm:tracking-[0.4em]">
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter mb-4 leading-[0.9]"
      >
        {title}
        {highlight && <span className="text-brand"> {highlight}</span>}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
