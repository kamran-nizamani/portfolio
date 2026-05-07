/**
 * Certification Card Component
 * Displays certification details with verify link and hover animations
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, ExternalLink } from 'lucide-react';

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  category: string;
  verifyUrl?: string;
  grade?: string;
  delay?: number;
}

/**
 * CertificationCard - Renders credential card with verification link
 * Features: Smooth animations, responsive layout, hover effects
 */
export const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  category,
  verifyUrl = '#',
  grade,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="glass-panel p-6 sm:p-8 rounded-3xl group cursor-pointer hover:-translate-y-2 transition-all duration-500"
    >
      {/* Header with icon and date */}
      <div className="flex justify-between items-start mb-8 sm:mb-12">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-brand group-hover:animate-pulse" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-gray-600 uppercase tracking-tighter whitespace-nowrap ml-2">
          {date}
        </span>
      </div>

      {/* Issuer */}
      <div className="font-mono text-[10px] text-brand/40 mb-2 uppercase tracking-widest">
        {issuer}
      </div>

      {/* Certification title */}
      <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 group-hover:text-brand transition-colors line-clamp-3 leading-tight">
        {title}
      </h3>

      {/* Divider and footer */}
      <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/5">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-mono text-gray-500 uppercase">
            {category}
          </span>
          {grade && (
            <span className="text-[8px] font-mono text-brand/60 uppercase tracking-widest">
              Grade: {grade}
            </span>
          )}
        </div>
        <a
          href={verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[9px] font-mono text-gray-500 group-hover:text-brand transition-colors uppercase"
        >
          <span>Verify</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
