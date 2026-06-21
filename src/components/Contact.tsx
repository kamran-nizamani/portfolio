import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { PROFILE } from '../constants';
import SectionHeading from './SectionHeading';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section border-t border-border">
      <div className="container-max">
        <SectionHeading
          label="Contact"
          title="Interested in building intelligent software together?"
          description="Open to software engineering, full-stack, and AI-integration roles — internships, junior positions, or freelance work."
          className="mb-12"
        />
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-3 px-6 py-4 panel panel-hover"
          >
            <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-zinc-500">Email</div>
              <div className="text-sm font-medium text-zinc-100">{PROFILE.email}</div>
            </div>
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 panel panel-hover"
          >
            <Github className="w-5 h-5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-zinc-500">GitHub</div>
              <div className="text-sm font-medium text-zinc-100">{PROFILE.githubHandle}</div>
            </div>
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 panel panel-hover"
          >
            <Linkedin className="w-5 h-5 text-accent" aria-hidden="true" />
            <div>
              <div className="text-xs text-zinc-500">LinkedIn</div>
              <div className="text-sm font-medium text-zinc-100">Kamran Khan</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
