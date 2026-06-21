import React from 'react';
import { motion } from 'motion/react';

interface SkillGroup {
  category: string;
  items: string[];
}

export const SkillsGrid: React.FC<{ groups: SkillGroup[] }> = ({ groups }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, i) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="panel p-6"
        >
          <h3 className="text-sm font-semibold text-zinc-100 mb-4">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li key={item} className="text-sm text-zinc-400 font-mono">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGrid;
