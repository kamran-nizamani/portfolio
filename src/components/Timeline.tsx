import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Code2, Award } from 'lucide-react';
import type { TimelineEntry } from '../constants';

const icons = {
  education: GraduationCap,
  project: Code2,
  certification: Award,
};

export const Timeline: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
      <div className="space-y-10">
        {entries.map((entry, i) => {
          const Icon = icons[entry.kind];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-1">
                {entry.period}
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-1">{entry.title}</h3>
              <div className="text-sm text-zinc-500 mb-2">{entry.org}</div>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{entry.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
