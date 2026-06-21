import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Download } from 'lucide-react';
import { PROFILE } from '../constants';

const profileImage = '/profile.jpeg';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-16">
      <div className="container-max w-full grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow mb-6">Software Engineer</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-50 mb-6 leading-[1.05]">
            {PROFILE.tagline}
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
            Final-year Computer Science student at Sukkur IBA University. I ship complete
            systems — frontend, backend, database, and AI integration — as working MVPs,
            not demos.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-50 text-zinc-900 font-medium rounded-lg hover:bg-white transition-colors"
            >
              Featured work
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-strong text-zinc-100 font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={PROFILE.resumeFile}
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-zinc-400 font-medium rounded-lg hover:text-zinc-100 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border border-border">
            <img
              src={profileImage}
              alt="Kamran Khan"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
