/**
 * Experience Item Component
 * Displays a single experience/job entry with timeline styling
 */

import React from 'react';
import { motion } from 'motion/react';

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  isLast?: boolean;
  delay?: number;
}

/**
 * ExperienceItem - Renders timeline experience card
 * Features: Timeline connector, tech badges, smooth animations
 */
export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  role,
  company,
  period,
  description,
  tech,
  isLast = false,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start relative group"
    >
      {/* Date and Company (Left Column) */}
      <div className="md:col-span-3">
        <div className="text-brand font-mono font-bold text-lg">
          {period}
        </div>
        <div className="text-gray-600 font-mono text-xs uppercase tracking-widest">
          {company}
        </div>
      </div>

      {/* Timeline Connector (Center) */}
      <div className="md:col-span-1 flex flex-col items-center hidden md:flex">
        {/* Animated dot */}
        <div className="w-4 h-4 rounded-full border-2 border-brand bg-bg relative z-10 group-hover:scale-125 transition-transform duration-300" />
        {/* Vertical line (only if not last item) */}
        {!isLast && <div className="w-[1px] h-32 bg-white/10 group-hover:bg-white/20 transition-colors" />}
      </div>

      {/* Content (Right Column) */}
      <div className="md:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl neon-border group-hover:border-brand/40 transition-colors duration-300">
        {/* Role heading */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
          {role}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 italic border-l border-brand/20 pl-4">
          {description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-brand/60 px-2 py-1 bg-brand/5 rounded uppercase tracking-wide transition-all group-hover:text-brand/80 group-hover:bg-brand/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
