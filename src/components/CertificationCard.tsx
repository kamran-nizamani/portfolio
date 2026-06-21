import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowUpRight } from 'lucide-react';

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  category: string;
  verifyUrl?: string;
  grade?: string;
  delay?: number;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  category,
  verifyUrl,
  grade,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="panel panel-hover p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
          <Award className="w-4 h-4 text-accent" aria-hidden="true" />
        </div>
        <span className="text-xs font-mono text-zinc-500">{date}</span>
      </div>

      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-2">{issuer}</div>
      <h3 className="text-base font-semibold text-zinc-100 mb-4 leading-snug flex-1">{title}</h3>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500">{category}</span>
          {grade && <span className="text-xs text-accent">Grade: {grade}</span>}
        </div>
        {verifyUrl && verifyUrl !== '#' && (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Verify <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard;
