import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={className}>
      {label && <div className="eyebrow mb-3">{label}</div>}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-50"
      >
        {title}
      </motion.h2>
      {description && (
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
