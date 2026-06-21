import React from 'react';
import { PROFILE } from '../constants';
import SectionHeading from './SectionHeading';

export const About: React.FC = () => {
  return (
    <section id="about" className="section border-t border-border">
      <div className="container-max">
        <SectionHeading label="About" title="Engineer, not just a coder" className="mb-12" />
        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-5">
            {PROFILE.about.map((p, i) => (
              <p key={i} className="text-zinc-300 leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
          </div>
          <div className="panel p-6 self-start">
            <div className="text-xs font-medium text-zinc-500 mb-1">Education</div>
            <div className="text-zinc-100 font-medium mb-1">{PROFILE.education.degree}</div>
            <div className="text-sm text-zinc-400 mb-3">{PROFILE.education.institution}</div>
            <div className="text-xs font-mono text-zinc-500">
              {PROFILE.education.period} &middot; {PROFILE.education.note}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
