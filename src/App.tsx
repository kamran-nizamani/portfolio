/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Main App Component
 * Portfolio website with dark futuristic UI (neon blue accents)
 * Sections: Home, Projects, Skills, Research, Contact, Resume
 * 
 * Features:
 * - Responsive design (mobile, tablet, desktop)
 * - Smooth scroll animations
 * - Interactive components with hover effects
 * - AI Chat widget
 * - Professional resume modal
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Mail,
  ExternalLink,
  Brain,
  Code,
  Database,
  Globe,
  Terminal,
  Cpu,
  ArrowRight,
  MessageSquare,
  X,
  Send,
  Loader2,
  Phone,
  Layers,
  Zap,
  Shield,
  Radio,
  Activity,
  Linkedin,
  Download,
  ChevronDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Import assets
import profileImage from '../public/portfilo-pic.jpeg';

// Import data constants
import {
  PROFILE,
  SKILLS,
  PROJECTS,
  RESEARCH,
  SOCIALS,
  CERTIFICATIONS,
  EXPERIENCE,
  SYSTEM_METRICS
} from './constants';

// Import reusable components
import Card from './components/Card';
import Button from './components/Button';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';
import SkillBar from './components/SkillBar';
import CertificationCard from './components/CertificationCard';
import ExperienceItem from './components/ExperienceItem';

// Import custom hooks
import { useMousePosition, useSmoothScroll } from './hooks/useAnimations';

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * AI Chat Widget Component
 * Allows users to ask questions about Kamran using Gemini AI
 */
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: `Greetings! I'm Kamran's digital twin. I can tell you about his research in AI emotional mimicking, his web stack (React/Node), or his data analysis projects. What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `
        You are the AI Portfolio Assistant for Kamran Khan.
        Context:
        - Name: ${PROFILE.name}
        - Title: ${PROFILE.title}
        - Summary: ${PROFILE.summary}
        - Research: ${RESEARCH.title}. Details: ${RESEARCH.description}
        - Skills: ${SKILLS.map(s => s.name).join(', ')}
        - Projects: ${PROJECTS.map(p => p.title).join(', ')}
        - Education: ${PROFILE.education.degree} at ${PROFILE.education.institution}

        Guidelines:
        - Be professional, technical, and concise.
        - Answer questions about Kamran's expertise and projects.
        - Keep responses short (1-3 sentences).

        User Query: ${userText}
      `
      });

      const text = response.text || "I couldn't generate a response right now.";
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: "I'm having trouble connecting to my central brain right now. Please try again or check Kamran's resume!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-panel mb-4 w-[calc(100vw-2rem)] md:w-[350px] h-[450px] rounded-2xl flex flex-col shadow-2xl overflow-hidden neon-border"
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-brand/5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-brand" />
                <span className="mono-label !text-brand !tracking-normal">Kamran_Link v1.0</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-xl text-sm ${
                      m.role === 'user'
                        ? 'bg-brand text-bg font-medium'
                        : 'bg-white/10 text-gray-200'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-brand" />
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about research..."
                className="flex-1 bg-white/5 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-brand text-bg p-2 rounded-lg hover:brightness-110 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand text-bg p-3 md:p-4 rounded-full shadow-lg flex items-center gap-2 font-medium hover:brightness-110 transition-all"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">{isOpen ? 'Close' : 'Ask AI'}</span>
      </motion.button>
    </div>
  );
};

/**
 * Resume Modal Component
 * Full-page resume display with sidebar and content sections
 */
const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="relative w-full max-w-4xl bg-[#eff1f3] text-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[95vh] md:h-auto md:max-h-[90vh]"
          >
            {/* Left Sidebar */}
            <div className="w-full md:w-[35%] bg-[#1a1c1e] text-white p-6 md:p-10 flex flex-col shrink-0 overflow-y-auto">
              {/* Profile header */}
              <div className="mb-6 md:mb-10">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-brand rounded-full mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                  <span className="text-bg text-3xl md:text-4xl font-black">K</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black leading-none mb-3 tracking-tighter">
                  KAMRAN<br />
                  KHAN
                </h2>
                <div className="inline-block px-2 py-1 bg-brand text-bg font-mono text-[9px] font-bold uppercase tracking-[0.2em] rounded">
                  Digital Architect
                </div>
              </div>

              {/* Contact section */}
              <div className="space-y-8 md:space-y-10 flex-1">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] font-bold">
                      Contact
                    </h4>
                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>
                  <ul className="space-y-4 text-[11px] font-medium text-gray-300">
                    <li className="flex items-center gap-3 break-all">
                      <Mail className="w-4 h-4 text-brand shrink-0" />
                      <span>{PROFILE.email}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-brand shrink-0" />
                      {PROFILE.phone}
                    </li>
                    <li className="flex items-center gap-3 break-all">
                      <Github className="w-4 h-4 text-brand shrink-0" />
                      <span>{PROFILE.github}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-brand shrink-0" />
                      kamrandev.me
                    </li>
                  </ul>
                </div>

                {/* Skills section */}
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] font-bold">
                      Skills
                    </h4>
                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map(s => (
                      <span
                        key={s.name}
                        className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono uppercase text-gray-400 hover:text-brand hover:border-brand/40 transition-colors"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-10 flex flex-col gap-3 w-full">
                {/* Download DOCX button */}
                <a
                  href="/Kamran_Khan_Resume.docx"
                  download="Kamran_Khan_Resume.docx"
                  className="px-6 py-4 bg-brand text-bg font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] rounded-lg flex items-center justify-center gap-2 w-full"
                >
                  <ExternalLink className="w-4 h-4" />
                  Download Resume
                </a>
                {/* Export/Print button */}
                <button
                  onClick={() => window.print()}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-[0.2em] transition-all border border-white/20 rounded-lg flex items-center justify-center gap-2 w-full"
                >
                  <ExternalLink className="w-4 h-4" />
                  Print/Export
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <div className="mono-label !text-gray-400 !tracking-[0.5em] mb-2">Registry: 2904-X</div>
                  <div className="text-[10px] font-mono text-gray-300 uppercase">Technical Dossier</div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-gray-400 group-hover:text-brand" />
                </button>
              </div>

              <div className="space-y-16">
                {/* Experience section */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xs font-mono font-black text-brand uppercase tracking-[0.4em]">
                      Experience_Log
                    </h3>
                    <div className="flex-1 h-[1px] bg-gray-100" />
                  </div>
                  <div className="space-y-10">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="relative pl-8 border-l-2 border-gray-100 group">
                        <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-2 border-brand rounded-full group-hover:bg-brand transition-colors" />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-1">
                          <h5 className="font-black text-lg uppercase tracking-tight text-gray-900 group-hover:text-brand transition-colors">
                            {exp.role}
                          </h5>
                          <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                            {exp.period}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-brand font-bold mb-4 uppercase tracking-[0.2em]">
                          {exp.company}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Projects section */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xs font-mono font-black text-brand uppercase tracking-[0.4em]">
                      Neural_Archive
                    </h3>
                    <div className="flex-1 h-[1px] bg-gray-100" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {PROJECTS.slice(0, 4).map((p, i) => (
                      <div
                        key={i}
                        className="p-6 border-2 border-gray-50 bg-gray-50/30 rounded-2xl hover:border-brand/20 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:border-brand/40 transition-colors">
                          <Zap className="w-4 h-4 text-gray-400 group-hover:text-brand" />
                        </div>
                        <h6 className="font-black text-sm mb-2 uppercase tracking-tight text-gray-900">
                          {p.title}
                        </h6>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education section */}
                <section className="pb-8">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xs font-mono font-black text-brand uppercase tracking-[0.4em]">
                      Educational_Origin
                    </h3>
                    <div className="flex-1 h-[1px] bg-gray-100" />
                  </div>
                  <div className="p-8 border-2 border-gray-900 bg-gray-900 text-white rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <h5 className="font-black text-2xl mb-2 italic tracking-tighter uppercase">
                        {PROFILE.education.degree}
                      </h5>
                      <p className="text-gray-400 text-sm mb-4 font-medium">
                        {PROFILE.education.institution}
                      </p>
                      <div className="inline-block px-3 py-1 border border-brand/40 rounded-full text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-brand/5">
                        {PROFILE.education.year}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/**
 * Navigation Component
 * Includes top nav, mobile bottom nav, and draggable sidebar
 */
const Navigation = ({ onResumeClick }: { onResumeClick: () => void }) => {
  const [active, setActive] = useState('home');
  const scrollToElement = useSmoothScroll();

  const navItems = [
    { id: 'home', label: 'Home', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'research', label: 'Security Lab', icon: Brain },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'experience', label: 'Resume', icon: Activity }
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (id === 'experience') {
      e.preventDefault();
      onResumeClick();
      return;
    }
    setActive(id);
    scrollToElement(id);
  };

  return (
    <>
      {/* Draggable sidebar - desktop only */}
      <motion.nav
        drag
        dragElastic={0.1}
        initial={{ x: 0, y: 0 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-16 h-[60vh] border border-white/10 hidden xl:flex flex-col items-center py-6 z-50 bg-surface/40 backdrop-blur-xl group rounded-[2rem] shadow-2xl cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-brand/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex-1 flex flex-col gap-6 pointer-events-auto mt-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.2 }}
              onClick={(e) => handleNavClick(e as any, item.id)}
              className="p-3 rounded-xl transition-all group/item hover:bg-brand/10"
              title={item.label}
            >
              <item.icon className="w-4 h-4 text-gray-500 hover:text-brand" />
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Top navigation */}
      <nav className="fixed top-0 left-0 w-full z-[60] bg-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full h-14 md:h-16 px-6 md:px-12 lg:px-20 flex items-center justify-start">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 pb-0.5 ${
                  active === item.id ? 'text-brand' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-14 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full z-[70] flex items-center justify-around px-4 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`p-2 rounded-full transition-all ${
              active === item.id ? 'bg-brand/20 text-brand' : 'text-gray-500'
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </>
  );
};

/**
 * Main App Component
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mousePos = useMousePosition();
  const [activeSkillCat, setActiveSkillCat] = useState("All");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-bg z-[100] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="noise-overlay" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center"
        >
          {/* Loading animation */}
          <div className="mb-12 relative flex justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-brand/20 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-4 border-brand rounded-full"
            />
            <Brain className="absolute inset-0 m-auto w-8 h-8 text-brand neon-text" />
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 2 }}
            className="h-1 bg-brand/20 rounded-full mx-auto overflow-hidden relative"
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/2 bg-brand shadow-[0_0_15px_var(--color-brand)]"
            />
          </motion.div>

          <div className="mt-8 font-mono text-[10px] tracking-[0.4em] text-brand uppercase animate-pulse">
            Establishing Secure Link...
          </div>

          {/* Loading steps */}
          <div className="mt-4 space-y-1">
            {["Neural Interface", "System Diagnostics", "Profile Archives"].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="font-mono text-[8px] text-gray-500 uppercase"
              >
                [LOADED] {step}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-brand/30 selection:text-white bg-bg">
      <div className="noise-overlay" />

      {/* Interactive background pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 255, 0.04), transparent 80%)`
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Navigation onResumeClick={() => setIsResumeOpen(true)} />

      {/* Floating system stats - desktop only */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-4">
        {SYSTEM_METRICS.map((metric, i) => (
          <motion.div
            key={i}
            drag
            whileDrag={{ scale: 1.05, zIndex: 60 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 3 }}
            className="glass-panel p-4 rounded-xl border-l-4 border-l-brand w-48 cursor-grab active:cursor-grabbing shadow-xl"
          >
            <div className="flex justify-between items-start mb-2 pointer-events-none">
              <span className="mono-label !text-[8px] !text-gray-500">{metric.label}</span>
              <div className="w-1 h-1 bg-brand rounded-full animate-pulse" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white tracking-tighter pointer-events-none">
              {metric.value}
            </div>
            <div className="text-[8px] font-mono text-brand/60 uppercase pointer-events-none">
              {metric.status}
            </div>
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 pt-20">
        {/* ===== HERO SECTION ===== */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-24 sm:py-28 md:py-32 relative">
          {/* Two-column layout: text (left) + image (right) */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto w-full">
            
            {/* LEFT COLUMN: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-left"
            >
              {/* Small label */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 uppercase">
                <span className="mono-label text-brand font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-xs">
                  Advanced Intelligence Active
                </span>
                <div className="w-8 h-[1px] bg-brand/50 hidden sm:block" />
              </div>

              {/* Main heading */}
              <h2 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 opacity-70">
                Greetings, I'm
              </h2>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-6 sm:mb-8 md:mb-10 tracking-tighter">
                <span className="text-glow-blue block break-words">KAMRAN</span>
                <span className="text-outline block opacity-50 break-words">KHAN</span>
              </h1>

              {/* Role badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-brand font-mono text-[11px] sm:text-xs md:text-sm mb-6 sm:mb-8 md:mb-10">
                <div className="px-2.5 sm:px-3 py-1 border border-brand/20 bg-brand/5 rounded-md whitespace-nowrap text-[10px] sm:text-xs">
                  Data Analyst
                </div>
                <div className="px-2.5 sm:px-3 py-1 border border-brand/20 bg-brand/5 rounded-md whitespace-nowrap text-[10px] sm:text-xs">
                  Web Developer
                </div>
                <div className="px-2.5 sm:px-3 py-1 border border-brand/20 bg-brand/5 rounded-md whitespace-nowrap text-[10px] sm:text-xs">
                  AI Enthusiast
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                Computer Science student at <span className="text-brand">Sukkur IBA University</span> focused on web development,
                data analysis, and emotional intelligence in AI.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 items-start">
                <Button
                  href="#projects"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  ACCESS ARTIFACTS
                </Button>
                <Button variant="secondary" href="#contact" size="lg">
                  ESTABLISH LINK
                </Button>
                
                {/* View Resume Button */}
                <a
                  href="/Kamran_Khan_Resume.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-brand/20 to-brand/10 border-2 border-brand/40 hover:border-brand/70 text-brand font-black text-xs md:text-sm uppercase tracking-[0.15em] rounded-lg transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>VIEW RESUME</span>
                </a>
              </div>

              {/* Certificates Badge */}
              <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 items-start xs:items-center">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-brand/5 border border-brand/20 rounded-lg">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-brand flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs font-mono text-brand uppercase tracking-wider whitespace-nowrap">6 Certifications</span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono hidden xs:block">
                  Google • Meta • DeepLearning.AI • Coursera
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex-1 flex justify-center md:justify-end items-center w-full md:w-auto"
            >
              {/* Neon glowing container */}
              <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand via-brand/50 to-brand rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Image with neon border */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-brand/40 shadow-2xl group-hover:border-brand/70 transition-all duration-300" style={{
                  boxShadow: '0 0 30px rgba(0, 242, 255, 0.3), inset 0 0 20px rgba(0, 242, 255, 0.1)'
                }}>
                  <img
                    src={profileImage}
                    alt="Kamran Khan"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal Display */}
          <div className="flex justify-center w-full">
            <motion.div
              drag
              whileDrag={{ scale: 1.02, zIndex: 50 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 md:mt-24 w-full max-w-4xl glass-panel rounded-xl overflow-hidden scanline neon-border cursor-grab active:cursor-grabbing group shadow-2xl"
            >
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="terminal-header relative z-10">
                <div className="dot-indicator bg-red-500/50" />
                <div className="dot-indicator bg-yellow-500/50" />
                <div className="dot-indicator bg-green-500/50" />
                <span className="ml-4 font-mono text-[10px] text-gray-500">KAMRAN@PRO_PORTFOLIO:~</span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto">
                <div className="flex gap-4 flex-wrap">
                  <span className="text-brand opacity-50 flex-shrink-0">01</span>
                  <span className="text-brand flex-shrink-0">➜</span>
                  <span className="text-white">system_core --status</span>
                </div>
                <div className="text-gray-500 pl-8 sm:pl-16 space-y-1">
                  <div>[OK] BRAIN_KERNEL v4.2.0 ONLINE</div>
                  <div>[OK] NEURAL_SYNC_STABLE</div>
                  <div>[OK] EMOTION_MATRIX_LOADED</div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <span className="text-brand opacity-50 flex-shrink-0">02</span>
                  <span className="text-brand flex-shrink-0">➜</span>
                  <span className="text-white">list_capabilities --detailed</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-2 pl-8 sm:pl-16">
                  {SKILLS.slice(0, 8).map((s, i) => (
                    <div key={i} className="text-gray-500 flex items-center gap-2 truncate">
                      <div className="w-1 h-[2px] bg-brand/30 flex-shrink-0" />
                      <span className="truncate">{s.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 animate-pulse">
                  <span className="text-brand opacity-50">03</span>
                  <span className="text-brand">➜</span>
                  <span className="text-white">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== TECH STACK SECTION ===== */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-y border-border bg-white/[0.01]">
          <div className="px-4 sm:px-6 md:px-12 lg:px-24">
            <div className="mono-label mb-6 sm:mb-8 md:mb-12 text-center opacity-50 text-[9px] sm:text-[10px]">Enterprise Tech Stack</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {[
                { name: "Neural Networks", icon: Brain },
                { name: "Fullstack Web", icon: Code },
                { name: "Edge Computing", icon: Cpu },
                { name: "Data Pipeline", icon: Database },
                { name: "Cloud Native", icon: Globe },
                { name: "DevOps", icon: Terminal }
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-border flex items-center justify-center group-hover:border-brand/50 group-hover:bg-brand/5 transition-all duration-500">
                    <tech.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-brand transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-white text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RESEARCH/SECURITY LAB SECTION ===== */}
        <section id="research" className="py-20 md:py-40 px-6 md:px-24">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-brand hidden sm:block" />
                <span className="mono-label !text-brand">Security Lab Registry</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-8 italic leading-tight uppercase break-words">
                Security<br />
                <span className="text-brand">Lab</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-mono">
                Exploring human emotions and secure neural logic patterns.
              </p>
            </div>
            <div className="p-6 md:p-8 border-l border-white/10 glass-panel flex-shrink-0">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">94%</div>
              <div className="mono-label !text-gray-500">Sentiment Accuracy</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main highlight card */}
            <div className="lg:col-span-2 brutalist-card p-8 md:p-12 rounded-3xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Layers className="w-16 md:w-20 h-16 md:h-20 text-brand/5 group-hover:text-brand/20 transition-all rotate-12" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-brand rounded-full animate-ping" />
                <span className="mono-label text-brand">Project Omega v.04</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold mb-6">{RESEARCH.title}</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl">
                {RESEARCH.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {RESEARCH.focus.map((f, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-white/10 bg-white/5 rounded-lg font-mono text-[10px] uppercase tracking-wider text-gray-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar stats */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-brand/20">
                <div className="flex justify-between items-start mb-6">
                  <Brain className="w-6 md:w-8 h-6 md:h-8 text-brand" />
                  <div className="px-2 py-1 bg-brand/10 rounded text-[8px] font-mono text-brand">REAL-TIME</div>
                </div>
                <h4 className="text-white font-bold mb-2">Cognitive Layering</h4>
                <p className="text-sm text-gray-500 font-mono">
                  Implementing multi-stage sentiment trees for nuanced response generation.
                </p>
              </div>

              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between items-start mb-6">
                  <Cpu className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />
                  <div className="px-2 py-1 bg-white/5 rounded text-[8px] font-mono text-gray-500">PENDING</div>
                </div>
                <h4 className="text-white font-bold mb-2">Hardware Acceleration</h4>
                <p className="text-sm text-gray-500 font-mono">
                  Optimizing CUDA kernels for biologically-accurate inference latency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS SECTION ===== */}
        <section id="skills" className="py-16 sm:py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 md:mb-16 gap-6 sm:gap-8 text-center md:text-left">
              <div className="w-full md:w-auto">
                <div className="mono-label !text-brand mb-3 sm:mb-4 text-[9px] sm:text-[10px]">Protocol Capabilities</div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase break-words">
                  Technical <span className="text-brand">Arsenal</span>
                </h2>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
                {["All", ...new Set(SKILLS.map(s => s.category))].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveSkillCat(cat)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-all ${
                      activeSkillCat === cat
                        ? 'bg-brand text-bg border-brand font-bold shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                        : 'border-white/10 text-gray-500 hover:border-brand/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 gap-y-10 md:gap-y-16">
              {SKILLS.filter(s => activeSkillCat === "All" || s.category === activeSkillCat).map(
                (skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    category={skill.category}
                    level={skill.level}
                    delay={i * 0.05}
                  />
                )
              )}
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE/RESUME SECTION ===== */}
        <section id="experience" className="py-20 md:py-40 px-6 md:px-24">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-16 md:mb-24 justify-center text-center">
            <div className="w-16 h-[1px] bg-brand/30 hidden md:block" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase break-words">
              Professional <span className="text-brand">Resume</span>
            </h2>
            <div className="w-16 h-[1px] bg-brand/30 hidden md:block" />
          </div>

          {/* Experience items */}
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceItem
                key={i}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                description={exp.desc}
                tech={exp.tech}
                isLast={i === EXPERIENCE.length - 1}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Education section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mt-24 md:mt-32 p-8 md:p-12 glass-panel rounded-2xl md:rounded-[2rem] neon-border border-brand/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-brand" />
                  <span className="mono-label !text-brand">Academic Registry</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic mb-2 break-words">
                  {PROFILE.education.degree}
                </h3>
                <p className="text-lg md:text-xl text-gray-400">{PROFILE.education.institution}</p>
              </div>
              <div className="text-center md:text-right flex-shrink-0">
                <div className="text-brand font-mono font-bold text-xl md:text-2xl mb-2">
                  {PROFILE.education.year}
                </div>
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                  Verified Secure Link
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section className="py-12 md:py-20 px-6 md:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "AI Models Trained", value: "12+" },
              { label: "Sentiment Accuracy", value: "94%" },
              { label: "Deployment Up-time", value: "99.9%" },
              { label: "Open Source Contribs", value: "400+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="mono-label !text-gray-500 text-[9px] sm:text-[10px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-24 gap-6 sm:gap-8">
            <div className="w-full">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-6 sm:w-8 h-[1px] bg-brand hidden sm:block" />
                <span className="mono-label !text-brand text-[9px] sm:text-[10px]">Security Lab & Archives</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold italic tracking-tighter break-words">
                Selected <span className="text-brand">Artifacts</span>
              </h2>
            </div>
            <p className="text-gray-500 font-mono text-[9px] sm:text-xs md:text-sm max-w-xs flex-shrink-0 hidden sm:block">
              A collection of secure systems and AI research explorations.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={i}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
                delay={i * 0.1}
              />
            ))}
          </div>
        </section>

        {/* ===== CERTIFICATIONS SECTION ===== */}
        <section className="py-20 md:py-40 px-6 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-brand hidden sm:block" />
                <span className="mono-label !text-brand">Credential Verification</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black italic break-words">
                Verified <br />
                <span className="text-white text-outline block">Artifacts</span>
              </h2>
            </div>
            <div className="flex gap-3 sm:gap-4 flex-shrink-0">
              {[Shield, Zap, Radio].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/5 flex items-center justify-center text-gray-500"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CERTIFICATIONS.map((cert, i) => (
              <CertificationCard
                key={i}
                title={cert.title}
                issuer={cert.issuer}
                date={cert.date}
                category={cert.category}
                verifyUrl={cert.verifyUrl}
                delay={i * 0.1}
              />
            ))}
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="glass-panel rounded-2xl md:rounded-3xl lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24 overflow-hidden neon-border scanline">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24">
              {/* Left side - Text and contact info */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-6 sm:w-8 h-[1px] bg-brand" />
                  <span className="mono-label !text-brand text-[9px] sm:text-[10px]">Secure Link Terminal</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight break-words">
                  Let's build the <span className="text-brand italic">future</span>.
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-12 max-w-md">
                  Currently available for high-level AI research and architectural consultations.
                </p>

                {/* Contact methods */}
                <div className="space-y-6 sm:space-y-8">
                  <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 sm:gap-4 md:gap-6 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-brand transition-all group-hover:neon-border flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-bg transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] uppercase text-brand font-mono tracking-widest mb-0.5 sm:mb-1">
                        Email Endpoint
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold group-hover:text-brand transition-colors break-all">
                        {PROFILE.email}
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] uppercase text-gray-500 font-mono tracking-widest mb-0.5 sm:mb-1">
                        Direct Voice Line
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold">{PROFILE.phone}</div>
                    </div>
                  </div>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 md:gap-6 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-brand transition-all group-hover:neon-border flex-shrink-0">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-bg transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] uppercase text-brand font-mono tracking-widest mb-0.5 sm:mb-1">
                        Professional Network
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold group-hover:text-brand transition-colors truncate">
                        linkedin.com/in/kamran-khan
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right side - Contact form */}
              <div className="space-y-5 sm:space-y-6 md:space-y-8 bg-white/5 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-3xl border border-white/10 glass-panel">
                {/* Name field */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="mono-label !text-gray-500 text-[9px] sm:text-[10px]">Identity</label>
                  <input
                    type="text"
                    placeholder="GUEST_USER"
                    className="w-full bg-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 focus:border-brand/50 outline-none transition-colors font-mono text-xs sm:text-sm"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="mono-label !text-gray-500 text-[9px] sm:text-[10px]">Frequency</label>
                  <input
                    type="email"
                    placeholder="USER@DOMAIN.COM"
                    className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 sm:py-4 focus:border-brand/50 outline-none transition-colors font-mono text-sm"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-3">
                  <label className="mono-label !text-gray-500">Transmission Payload</label>
                  <textarea
                    rows={4}
                    placeholder="ENTER DATA..."
                    className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 sm:py-4 focus:border-brand/50 outline-none transition-colors font-mono text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Transmission
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-8 md:py-12 px-6 md:px-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center md:text-left">
            © 2026 Crafted by Kamran Khan
          </div>
          <div className="flex gap-6 md:gap-8">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-500 hover:text-brand transition-colors uppercase tracking-widest"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-xs font-mono text-gray-500 hover:text-brand transition-colors uppercase tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs font-mono text-gray-500 hover:text-brand transition-colors uppercase tracking-widest"
            >
              Terms
            </a>
          </div>
        </footer>
      </main>

      <AIChatWidget />
    </div>
  );
}
