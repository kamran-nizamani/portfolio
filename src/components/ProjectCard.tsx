/**
 * Project Card Component
 * Reusable card for displaying project information with consistent styling
 */

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  delay?: number;
}

/**
 * ProjectCard - Renders a project artifact card with tags and external link
 * Features: Hover animations, responsive layout, code snippet preview
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  link = '#',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group relative p-8 glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand/40 transition-all duration-300"
    >
      {/* Gradient background on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl group-hover:bg-brand/10 transition-colors duration-500 pointer-events-none" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 border border-brand/30 text-[9px] font-mono text-brand uppercase rounded transition-all group-hover:border-brand/60 group-hover:bg-brand/5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* External link icon */}
      <div className="absolute top-8 right-8 p-2 text-gray-500 group-hover:text-brand transition-colors">
        <ExternalLink className="w-5 h-5" />
      </div>

      {/* Content */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-glow-blue transition-all duration-300 pr-8 line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        {description}
      </p>

      {/* Status indicator */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 group-hover:text-white transition-colors">
        <div className="w-1 h-2 bg-brand/30 group-hover:bg-brand transition-colors" />
        SECURE CONNECTION ESTABLISHED
      </div>
    </motion.div>
  );
};

export default ProjectCard;
