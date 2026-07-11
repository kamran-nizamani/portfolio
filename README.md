# Kamran Khan — AI & Full-Stack Developer Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF0278?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Three.js](https://img.shields.io/badge/Three.js-0.167-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A premium, futuristic AI/Cybersecurity developer portfolio built with React, Vite, and Framer Motion — featuring 3D WebGL backgrounds, smooth scroll, glassmorphism UI, and a dark slate + cyan theme.

---

## Live Preview

🔗 **[kamrandev.me](https://kamrandev.me)**

---

## Screenshots

> _Add screenshots of your portfolio here_

| Hero Section | Projects | Certifications |
|:---:|:---:|:---:|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## Features

- **Premium Loading Screen** — ~15s animated boot sequence (logo, particle field, progress bar, terminal status lines) on first visit per session, with a skip button and `prefers-reduced-motion` support
- **3D Flip Certification Cards** — Click/tap to flip completed certs and reveal completion date + skills learned
- **3D WebGL Hero** — Torus knot, icosahedron, and 1 200-particle star field powered by Three.js with interactive mouse parallax
- **Circular Profile Image** — Animated conic-gradient border ring, glassmorphism frame, cyan glow, float + mouse-tilt effect
- **Typewriter Effect** — 5 cycling roles via a custom `useTypewriter` hook
- **Framer Motion Animations** — Scroll-triggered fade-ups, layout transitions, hover glow, stagger effects
- **Lenis Smooth Scroll** — Buttery 1.2 s easing on all scroll events
- **Glassmorphism UI** — `backdrop-filter: blur` cards, gradient borders, scanline overlay
- **Dark Slate + Cyan Theme** — `#0f172a` background, `#06B6D4` brand accent throughout
- **Responsive** — Mobile-first, tested across 320 px → 1440 px+
- **Scroll Progress Bar** — Thin cyan indicator at the top of the page
- **Scroll-to-Top Button** — Animated floating button with AnimatePresence
- **Certifications Section** — Filterable cards with animated progress bars, expand/collapse courses, learning timeline
- **Filter Tabs** — Projects and Certifications both support animated category filtering
- **ARIA-accessible** — Semantic HTML, `aria-label`, `aria-expanded`, `role="tab"` throughout
- **Code Splitting** — Vite `manualChunks` splits Three.js, Framer Motion, and vendor bundles

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| 3D Graphics | Three.js 0.167 |
| Smooth Scroll | Lenis 1.1 |
| Icons | Iconify React |
| Fonts | Space Grotesk · Inter · JetBrains Mono |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kamran-nizamani/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The dev server starts at **http://localhost:5173**

### Build for Production

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

---

## Folder Structure

```
portfolio/
├── public/
│   ├── profile.jpg          # Profile photo
│   ├── projects/            # Drop project screenshots here: 1.jpg … 5.jpg
│   └── certs/               # Drop certificate images here: c1.jpg … c4.jpg
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx # ~15s animated boot sequence (first visit/session)
│   │   ├── Navbar.jsx        # Fixed nav with animated underline pill
│   │   ├── Hero.jsx          # 3D canvas + circular profile + typewriter
│   │   ├── About.jsx         # Bio, 3D shapes canvas, animated stats
│   │   ├── Research.jsx      # Research paper cards
│   │   ├── Projects.jsx      # Filterable project grid w/ images + features
│   │   ├── Skills.jsx        # Skill glow cards + toolkit + certs
│   │   ├── Education.jsx     # Timeline layout
│   │   ├── Certifications.jsx# 3D flip cards + progress bars + timeline
│   │   ├── Contact.jsx       # WhatsApp CTA + contact form + social links
│   │   ├── Footer.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── ScrollToTop.jsx
│   ├── hooks/
│   │   └── useTypewriter.js  # Custom typewriter hook
│   ├── App.jsx               # Root layout + Lenis init + loader gating
│   ├── main.jsx
│   └── index.css             # Global styles, glassmorphism, animations
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

### Adding real project/certificate images

Project and certificate cards render clean placeholder art out of the box.
To use real images, just drop files into these paths — they're picked up
automatically with no code changes (broken/missing files fall back to the
placeholder art):

- `public/projects/1.jpg` … `public/projects/5.jpg` — project screenshots
- `public/certs/c1.jpg` … `public/certs/c4.jpg` — certificate images

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag the dist/ folder to Netlify Drop — https://app.netlify.com/drop
```

### GitHub Pages (with gh-pages)

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

npm run deploy
```

> Add `base: '/portfolio/'` to `vite.config.js` if deploying to a GitHub Pages sub-path.

---

## Customization

| What to change | Where |
|---|---|
| Profile photo | Replace `public/profile.jpg` |
| Name / bio | `src/components/Hero.jsx`, `About.jsx` |
| Projects | `PROJECTS` array in `src/components/Projects.jsx` |
| Certifications | `COMPLETED` / `IN_PROGRESS` arrays in `src/components/Certifications.jsx` |
| Social links | `About.jsx`, `Footer.jsx`, `Contact.jsx` |
| Brand color | `tailwind.config.js` → `brand` + `src/index.css` |
| Typewriter phrases | `src/hooks/useTypewriter.js` → `PHRASES` array |

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Author

**Kamran Khan**
AI & Full-Stack Developer · Cybersecurity Researcher

- GitHub: [@kamran-nizamani](https://github.com/kamran-nizamani)
- LinkedIn: [linkedin.com/in/kamran-nizamani](https://linkedin.com/in/kamran-nizamani)
- Website: [kamrandev.me](https://kamrandev.me)

---

_Built with React + Vite + Framer Motion · Designed and coded by Kamran Khan_
