/**
 * Skill Bar Component
 * Reusable animated skill bar with label and level indicator
 */

import React from 'react';
import { motion } from 'motion/react';

interface SkillBarProps {
  name: string;
  category: string;
  level: number;
  delay?: number;
}

/**
 * SkillBar - Animated skill bar with smooth fill animation
 * @param name - Skill name (e.g., 'React', 'Python')
 * @param category - Skill category (e.g., 'Web', 'AI')
 * @param level - Proficiency level (0-100)
 * @param delay - Animation delay
 */
export const SkillBar: React.FC<SkillBarProps> = ({
  name,
  category,
  level,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group cursor-default"
    >
      {/* Header with category and level */}
      <div className="flex justify-between items-end mb-3">
        <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
          {category}
        </span>
        <span className="font-mono text-brand text-lg font-bold italic group-hover:neon-text transition-all">
          {level}%
        </span>
      </div>

      {/* Skill name and progress bar */}
      <div className="mb-4">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative group-hover:bg-white/10 transition-colors">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 0.8, delay: delay + 0.1 }}
            viewport={{ once: true }}
            className="absolute inset-y-0 left-0 bg-brand shadow-[0_0_10px_var(--color-brand)] rounded-full"
          />
        </div>
      </div>

      {/* Skill name and indicator dot */}
      <div className="flex justify-between items-center">
        <span className="text-white font-bold tracking-tight uppercase text-lg">
          {name}
        </span>
        <div className="w-1.5 h-1.5 bg-brand/30 rounded-full group-hover:bg-brand transition-colors" />
      </div>
    </motion.div>
  );
};

export default SkillBar;
