/**
 * Central content store for the portfolio.
 * Every claim here is backed by something real: a GitHub repo, a verifiable
 * certificate, or coursework — nothing here is an invented metric.
 */

export const PROFILE = {
  name: "Kamran Khan",
  title: "Software Engineer",
  tagline: "Building full-stack systems with applied AI integration.",
  email: "kamrannizamani35@gmail.com",
  github: "https://github.com/kamran-nizamani",
  githubHandle: "github.com/kamran-nizamani",
  linkedin: "https://www.linkedin.com/in/kamran-khan-6b6b4a406/",
  resumeFile: "/Kamran_Khan_Resume.docx",
  about: [
    "I'm a final-year Computer Science student at Sukkur IBA University. I build complete systems end to end — frontend, backend, database, and AI integration — rather than just UI shells.",
    "My recent projects use large language models (OpenAI GPT-4, Google Gemini) as structured, schema-constrained components of a backend — not as a bolted-on chat widget. That means validating model output against a real schema before it touches a database, and keeping API keys server-side instead of exposed to the browser.",
    "I'm looking for software engineering roles — full-stack or AI-integrated — where I can keep building real, working systems instead of demos.",
  ],
  education: {
    degree: "BS Computer Science",
    institution: "Sukkur IBA University",
    period: "2023 – 2027 (Expected)",
    note: "Final-year",
  },
};

export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Frontend Engineering",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend Engineering",
    items: ["Node.js", "Express", "REST APIs", "JWT Authentication", "bcrypt"],
  },
  {
    category: "Database",
    items: ["Prisma ORM", "SQLite", "PostgreSQL", "Firebase / Firestore"],
  },
  {
    category: "AI / LLM Integration",
    items: ["OpenAI API (GPT-4)", "Google Gemini API", "Schema-constrained generation", "Prompt design"],
  },
  {
    category: "Engineering & Tooling",
    items: ["Git / GitHub", "Docker", "Docker Compose", "GitHub Actions (CI/CD)", "Jest / Supertest"],
  },
];

export type ProjectChallenge = { challenge: string; solution: string };
export type ProjectStack = { label: string; items: string[] };

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  problem: string;
  architecture: string;
  stack: ProjectStack[];
  challenges: ProjectChallenge[];
  decisions: string[];
  knownIssues?: string[];
  roadmap: string[];
  repo: string;
  demo?: string;
  flagship?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "prepioneer",
    title: "Prepioneer",
    tagline: "AI-powered exam preparation platform",
    status: "MVP — fully functional locally, not yet deployed to a public URL",
    flagship: true,
    problem:
      "Students preparing for competitive exams (CSS, MDCAT, ECAT, LAT and similar) rely on scattered PDFs and generic question banks. Nothing tracks weak areas, adapts difficulty, or grades open-ended answers — so prep is unstructured and feedback is slow.",
    architecture:
      "React client → REST API (Express) → Prisma ORM → SQLite in development, PostgreSQL targeted for production. The OpenAI API is called only from the server — never from the browser — for question generation, MCQ/essay grading, and personalized feedback. A node-cron scheduler pushes daily quizzes through the Twilio WhatsApp API.",
    stack: [
      { label: "Frontend", items: ["React", "Vite", "Tailwind CSS", "React Router", "Chart.js"] },
      { label: "Backend", items: ["Node.js", "Express", "JWT + bcrypt auth"] },
      { label: "Database", items: ["Prisma ORM", "SQLite (dev)", "PostgreSQL (prod target)"] },
      { label: "AI", items: ["OpenAI GPT-4 Turbo", "JSON-schema-constrained responses"] },
      { label: "Messaging", items: ["Twilio WhatsApp API", "node-cron scheduling"] },
      { label: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions CI", "Jest/Supertest"] },
    ],
    challenges: [
      {
        challenge: "LLM output needs to be reliable enough to auto-grade — free text isn't usable.",
        solution:
          "Constrained OpenAI responses to a strict JSON schema (exactly 4 options, a correctAnswer that must match one of them) and re-validated server-side before anything is persisted.",
      },
      {
        challenge: "Supporting both pre-authored and AI-generated questions without duplicating logic.",
        solution:
          "One Question model linked to a TestCatalog, with TestSession storing an immutable snapshot of whichever questions (human or AI) were served for that attempt.",
      },
      {
        challenge: "Grading open-ended LAT essays consistently, not just MCQs.",
        solution:
          "A rubric-constrained prompt (content/structure/grammar weighting) that returns structured per-criterion scores instead of free-form text.",
      },
    ],
    decisions: [
      "JWT + bcrypt instead of server-side sessions — the API is consumed by a separate frontend client, so a stateless token fits better.",
      "SQLite for local development with PostgreSQL as the production target, to avoid local Postgres setup friction while iterating on schema.",
      "All OpenAI calls happen server-side only — the API key never reaches the client bundle.",
    ],
    roadmap: [
      "Deploy to a public URL (Fly.io config already exists, not yet executed)",
      "Extend automated test coverage beyond the auth flow",
      "Frontend test suite",
      "Mobile app (React Native)",
    ],
    repo: "https://github.com/kamran-nizamani/prepioneer-demo",
  },
  {
    slug: "smart-student-assistant",
    title: "Smart Student Assistant",
    tagline: "AI study companion — chat, quizzes, note summarization",
    status: "MVP — fully functional locally, not yet deployed",
    problem:
      "Students juggle notes, assignments, and exam prep across disconnected tools, with no single place that combines task tracking with AI-assisted studying.",
    architecture:
      "React client backed by Firebase for auth and data, with a dedicated service layer (lib/gemini.ts) isolating every call to the Google Gemini API behind typed functions — UI components never call the AI SDK directly.",
    stack: [
      { label: "Frontend", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Recharts"] },
      { label: "Backend / Data", items: ["Firebase Auth", "Firestore"] },
      { label: "AI", items: ["Google Gemini API", "Schema-constrained JSON output"] },
      { label: "Other", items: ["PWA (service worker + manifest)"] },
    ],
    challenges: [
      {
        challenge: "Getting consistent, parseable quiz data out of an LLM instead of loosely-formatted text.",
        solution:
          "Used Gemini's typed responseSchema to constrain quiz generation output, removing the need for fragile text parsing.",
      },
      {
        challenge: "Keeping the AI layer swappable and testable.",
        solution:
          "Isolated every Gemini call behind a small service module rather than calling the SDK from inside components.",
      },
    ],
    decisions: [
      "Applied the same schema-constrained-generation pattern used in Prepioneer's GPT integration, with a different model and SDK — validating the approach across two independent codebases.",
    ],
    knownIssues: [
      "The Gemini API key is currently called from the client, the same mistake this portfolio's previous version made with its chat widget. Moving this behind a server endpoint is the first item on the roadmap.",
    ],
    roadmap: [
      "Move AI calls server-side to stop exposing the API key in the client bundle",
      "Persist quiz history",
      "Deploy to a public URL",
    ],
    repo: "https://github.com/kamran-nizamani/Smart-Student-Assistant-Ap",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  category: string;
  grade?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "2023",
    verifyUrl: "#",
    category: "Data Science",
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Web Development",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    verifyUrl: "#",
    category: "AI / ML",
  },
  {
    title: "Play It Safe: Manage Security Risks",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "https://coursera.org/verify/85L7PABUA6RX",
    category: "Cybersecurity",
  },
  {
    title: "Foundations of Data Science",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Data Science",
    grade: "96.89%",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Coursera",
    date: "2024",
    verifyUrl: "#",
    category: "Cybersecurity",
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "education" | "project" | "certification";
};

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2023",
    title: "Started BS Computer Science",
    org: "Sukkur IBA University",
    description: "Began a four-year Computer Science degree, expected to graduate in 2027.",
    kind: "education",
  },
  {
    period: "2023 – 2024",
    title: "Foundational coursework",
    org: "Google, Coursera",
    description:
      "Completed the Google Data Analytics Professional Certificate, Foundations of Data Science, and Foundations of Cybersecurity.",
    kind: "certification",
  },
  {
    period: "2024",
    title: "Meta Front-End Developer & Deep Learning Specialization",
    org: "Meta, DeepLearning.AI",
    description: "Built formal frontend and deep learning fundamentals alongside coursework.",
    kind: "certification",
  },
  {
    period: "Dec 2025",
    title: "Built Prepioneer",
    org: "Independent project",
    description:
      "Full-stack AI exam-prep platform: Express + Prisma backend, JWT auth, OpenAI GPT-4 integration for question generation and grading, Twilio WhatsApp delivery.",
    kind: "project",
  },
  {
    period: "Apr 2026",
    title: "Built Smart Student Assistant",
    org: "Independent project",
    description:
      "AI study companion with Gemini-powered chat, schema-constrained quiz generation, and note summarization, backed by Firebase.",
    kind: "project",
  },
  {
    period: "2026 – 2027",
    title: "Final year",
    org: "Sukkur IBA University",
    description: "Completing the degree while continuing to ship independent projects.",
    kind: "education",
  },
];
