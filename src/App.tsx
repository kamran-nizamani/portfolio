import { PROJECTS, SKILLS, CERTIFICATIONS, TIMELINE } from './constants';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import SkillsGrid from './components/SkillsGrid';
import Timeline from './components/Timeline';
import CertificationCard from './components/CertificationCard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionHeading from './components/SectionHeading';

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-zinc-50 focus:text-zinc-900 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Nav />

      <main id="main-content">
        <Hero />
        <About />

        <section id="projects" className="section border-t border-border">
          <div className="container-max">
            <SectionHeading
              label="Featured Projects"
              title="Things I've built"
              description="Two real, working MVPs — not invented metrics. Both run locally and are not yet deployed to a public URL."
              className="mb-12"
            />
            <div className="space-y-8">
              {PROJECTS.map((project, i) => (
                <ProjectCaseStudy key={project.slug} project={project} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section border-t border-border">
          <div className="container-max">
            <SectionHeading label="Skills" title="Technical toolkit" className="mb-12" />
            <SkillsGrid groups={SKILLS} />
          </div>
        </section>

        <section id="journey" className="section border-t border-border">
          <div className="container-max">
            <SectionHeading label="Journey" title="Education, projects & certifications" className="mb-12" />
            <Timeline entries={TIMELINE} />
          </div>
        </section>

        <section id="certifications" className="section border-t border-border">
          <div className="container-max">
            <SectionHeading label="Certifications" title="Coursework & credentials" className="mb-12" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, i) => (
                <CertificationCard
                  key={cert.title}
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  category={cert.category}
                  verifyUrl={cert.verifyUrl}
                  grade={cert.grade}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
