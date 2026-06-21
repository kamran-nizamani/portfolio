import React from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '../constants';

interface ProjectCaseStudyProps {
  project: Project;
  delay?: number;
}

const Block: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <h4 className="eyebrow mb-3">{label}</h4>
    {children}
  </div>
);

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
      className="panel p-6 sm:p-8 md:p-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 pb-10 border-b border-border">
        <div>
          {project.flagship && (
            <div className="eyebrow mb-3">Flagship Project</div>
          )}
          <h3 className="text-2xl md:text-3xl font-semibold text-zinc-50 mb-2">{project.title}</h3>
          <p className="text-zinc-400 text-base md:text-lg">{project.tagline}</p>
          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-500">
            <span className="status-dot bg-amber-400" aria-hidden="true" />
            {project.status}
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-strong text-sm font-medium text-zinc-100 hover:bg-white/5 transition-colors"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-50 text-zinc-900 text-sm font-medium hover:bg-white transition-colors"
              aria-label={`View live demo of ${project.title}`}
            >
              Live demo
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <Block label="Problem">
          <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
        </Block>
        <Block label="Architecture">
          <p className="text-zinc-300 leading-relaxed">{project.architecture}</p>
        </Block>
      </div>

      {/* Stack */}
      <div className="mb-10">
        <h4 className="eyebrow mb-4">Stack</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.stack.map((group) => (
            <div key={group.label}>
              <div className="text-xs font-medium text-zinc-500 mb-2">{group.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-surface-2 border border-border rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="mb-10">
        <h4 className="eyebrow mb-4">Technical challenges</h4>
        <div className="space-y-5">
          {project.challenges.map((c, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-3 sm:gap-6 pl-4 border-l-2 border-border">
              <p className="text-sm text-zinc-400">
                <span className="text-zinc-200 font-medium">Challenge — </span>
                {c.challenge}
              </p>
              <p className="text-sm text-zinc-400">
                <span className="text-zinc-200 font-medium">Solution — </span>
                {c.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <Block label="Engineering decisions">
          <ul className="space-y-2.5">
            {project.decisions.map((d, i) => (
              <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2.5">
                <span className="text-accent mt-1.5 shrink-0" aria-hidden="true">&#8226;</span>
                {d}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Roadmap">
          <ul className="space-y-2.5">
            {project.roadmap.map((r, i) => (
              <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2.5">
                <span className="text-zinc-600 mt-1.5 shrink-0" aria-hidden="true">&#8226;</span>
                {r}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {project.knownIssues && project.knownIssues.length > 0 && (
        <div className="mt-10 pt-8 border-t border-border">
          <h4 className="eyebrow mb-3 !text-amber-400">Known issue</h4>
          <ul className="space-y-2">
            {project.knownIssues.map((issue, i) => (
              <li key={i} className="text-sm text-zinc-400 leading-relaxed">{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
};

export default ProjectCaseStudy;
