import { Code, Database, Brain, Globe, Github, Mail, Phone, ExternalLink, Linkedin } from 'lucide-react';

export const PROFILE = {
  name: "Kamran Khan",
  title: "Data Analyst | Web Developer | AI Enthusiast",
  email: "kamrannizamani35@gmail.com",
  phone: "+92 325 8313573",
  github: "github.com/kamran-nizamani",
  linkedin: "https://www.linkedin.com/in/kamran-khan-6b6b4a406/",
  portfolio: "https://kamrandev.me",
  summary: "Computer Science student at Sukkur IBA University skilled in web development, data analysis, and AI. Currently researching Mimicking Human Emotions using AI with a sharp focus on NLP and sentiment analysis.",
  education: {
    degree: "BS Computer Science",
    institution: "Sukkur IBA University",
    year: "2023 - 2027 (Expected)"
  }
};

export const SKILLS = [
  { name: "Python", category: "AI & Backend", level: 92 },
  { name: "JavaScript", category: "Web", level: 90 },
  { name: "React", category: "Web", level: 88 },
  { name: "TensorFlow", category: "AI", level: 85 },
  { name: "MySQL", category: "Data", level: 85 },
  { name: "Java", category: "General", level: 80 },
  { name: "C++", category: "General", level: 82 },
  { name: "HTML/CSS", category: "Web", level: 95 },
];

export const RESEARCH = {
  title: "Mimicking Human Emotions using AI",
  description: "Advanced research focusing on NLP and sentiment analysis to create more biologically-accurate emotional intelligence in AI models.",
  focus: ["Natural Language Processing", "Sentiment Analysis", "Deep Learning"]
};

export const PROJECTS = [
  {
    title: "Smart Exam Prep",
    description: "A comprehensive student preparation platform designed to optimize learning outcomes through structured resources.",
    tags: ["Education", "Platform"],
    link: "#"
  },
  {
    title: "Prepioneer",
    description: "A live web-based preparation app providing real-time interactive learning experiences.",
    tags: ["React", "Live App"],
    link: "#"
  },
  {
    title: "AI Crop Disease Detection",
    description: "Machine learning based system that identifies crop diseases through image analysis, aiding in modern agriculture.",
    tags: ["Computer Vision", "TensorFlow"],
    link: "#"
  },
  {
    title: "Next.js Boilerplate",
    description: "A scalable, production-ready project structure for modern web applications.",
    tags: ["Next.js", "Architecture"],
    link: "https://github.com/kamran-nizamani"
  }
];

export const CERTIFICATIONS = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "2023",
    verifyUrl: "#",
    category: "Data Science"
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Web Development"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    verifyUrl: "#",
    category: "AI/ML"
  },
  {
    title: "Play It Safe: Manage Security Risks",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "https://coursera.org/verify/85L7PABUA6RX",
    category: "Cybersecurity"
  },
  {
    title: "Foundations of Data Science",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Data Science",
    grade: "96.89%"
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Cybersecurity"
  }
];

export const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    desc: "Architecting decentralized web solutions and custom AI integrations for international clients.",
    tech: ["React", "Node.js", "Python"]
  },
  {
    role: "AI Research Lead",
    company: "Academic Project",
    period: "2023 - 2024",
    desc: "Spearheading research in sentiment analysis mimicking human neural response patterns.",
    tech: ["PyTorch", "NLP", "Scikit-learn"]
  }
];

export const SYSTEM_METRICS = [
  { label: "Neural Latency", value: "0.2ms", status: "Optimal" },
  { label: "Kernel Integrity", value: "99.9%", status: "Verified" },
  { label: "Current Load", value: "2.4GHz", status: "Nominal" },
  { label: "Uptime", value: "999 DAYS", status: "Immortal" }
];

export const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/kamran-nizamani" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kamran-khan-6b6b4a406/" },
  { icon: Mail, label: "Email", href: `mailto:${PROFILE.email}` },
  { icon: ExternalLink, label: "Portfolio", href: PROFILE.portfolio },
];
