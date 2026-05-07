# 🌐 Kamran Khan - Portfolio Website

A **modern, responsive, and interactive portfolio website** built with React, TypeScript, and Tailwind CSS. Features a dark futuristic UI with neon accents, AI integration, and smooth animations.

🔗 **Live:** [kamrandev.me](https://kamrandev.me)

---

## ✨ Features

### 🎨 **Design & UX**
- **Dark Futuristic Theme** with cyan neon accents
- **Fully Responsive** - Optimized for mobile (320px), tablet (768px), desktop (1024px), and laptop (1440px+)
- **Smooth Animations** - Powered by Framer Motion
- **Glass-Morphism UI** - Modern design patterns
- **Touch-Friendly** - 44px+ tap targets for mobile devices

### 🧠 **Interactive Features**
- **AI Chat Widget** - Powered by Google Gemini API
- **Resume Modal** - Professional resume display with sidebar navigation
- **Draggable Sidebar Navigation** - Desktop-exclusive navigation
- **Smooth Scroll Effects** - Custom scroll reveal animations
- **Terminal Display** - Interactive terminal mockup in hero section

### 📱 **Multi-Device Support**
- ✅ **Smartphones** (320px - 480px)
- ✅ **Tablets** (768px - 1024px)
- ✅ **Desktop** (1024px - 1440px)
- ✅ **Large Displays** (1440px+)
- ✅ **Landscape Mode** Support
- ✅ **Touch & Hover** Optimizations

### 🚀 **Performance**
- **Vite** - Lightning-fast build tool
- **Code Splitting** - Lazy loaded components
- **Asset Optimization** - Automatic image hashing
- **Automated Deployment** - GitHub Actions CI/CD

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion |
| **Build Tool** | Vite 6.4 |
| **UI Icons** | Lucide React |
| **AI Integration** | Google Gemini API |
| **Hosting** | GitHub Pages + Custom Domain |
| **CI/CD** | GitHub Actions |

---

## 📁 Project Structure

```
portfilo/
├── src/
│   ├── App.tsx                 # Main application component (~1300 lines)
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles & responsive design
│   ├── constants.ts            # Data & configuration
│   ├── components/             # Reusable components (7 files)
│   │   ├── Button.tsx          # Multi-variant button
│   │   ├── Card.tsx            # Glass-morphism card
│   │   ├── ProjectCard.tsx     # Project showcase card
│   │   ├── SkillBar.tsx        # Animated skill bar
│   │   ├── SectionHeading.tsx  # Section titles
│   │   ├── ExperienceItem.tsx  # Timeline experience
│   │   ├── CertificationCard.tsx # Certification display
│   │   └── index.ts            # Component exports
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAnimations.ts    # Scroll, animation, debounce hooks
│   │   └── index.ts            # Hook exports
│   └── utils/                  # Utility functions
│       ├── animations.ts       # Framer Motion variants
│       └── index.ts            # Utility exports
├── public/                     # Static assets
│   ├── portfilo-pic.jpeg       # Profile image
│   └── Kamran_Khan_Resume.docx # Resume document
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages auto-deployment
├── index.html                  # HTML entry point (responsive meta tags)
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/kamran-nizamani/portfiloo.git
cd portfiloo
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

Get your Gemini API key: [Google AI Studio](https://ai.google.dev/studio)

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. Changes auto-reload!

### Build

Build optimized production bundle:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

---

## 📝 Customization

### Update Profile Information

Edit [src/constants.ts](src/constants.ts):

```typescript
export const PROFILE = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://linkedin.com/in/yourprofile",
  education: {
    degree: "B.S. Computer Science",
    institution: "Your University",
    year: "2024"
  },
  summary: "Your professional summary...",
};
```

### Add Projects

Add to the `PROJECTS` array in [src/constants.ts](src/constants.ts):

```typescript
{
  title: "Project Name",
  description: "Project description",
  tags: ["React", "TypeScript", "Tailwind"],
  link: "https://github.com/yourrepo"
}
```

### Add Skills

Update the `SKILLS` array:

```typescript
{
  name: "React",
  category: "Frontend",
  level: 95
}
```

### Customize Colors

Edit CSS variables in [src/index.css](src/index.css):

```css
@theme {
  --color-brand: #00f2ff;           /* Primary color (cyan) */
  --color-bg: #030303;              /* Background */
  --color-surface: #0a0a0a;         /* Surface */
  --color-border: rgba(0, 242, 255, 0.1);
}
```

### Update Resume

1. Replace [public/Kamran_Khan_Resume.docx](public/Kamran_Khan_Resume.docx) with your resume
2. Update the filename reference in [src/App.tsx](src/App.tsx) if needed
3. Rebuild: `npm run build`

### Update Profile Image

1. Replace [public/portfilo-pic.jpeg](public/portfilo-pic.jpeg) with your image
2. Ensure filename has no spaces (uses Vite import system)
3. Image automatically optimized in build

---

## 🌍 Deployment

### GitHub Pages + Custom Domain

#### Step 1: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Set deployment source to **GitHub Actions**
3. No additional configuration needed

#### Step 2: Configure Custom Domain (Optional)
1. Create a `CNAME` file with your domain:
   ```
   kamrandev.me
   ```
2. Add to GitHub Pages settings (Settings → Pages → Custom domain)
3. Update DNS:
   - A records: GitHub's IP addresses
   - Or CNAME: `username.github.io`

#### Step 3: Auto-Deployment
- Push to `main` branch
- GitHub Actions workflow triggers automatically
- Builds with Vite and deploys to GitHub Pages
- **Live in ~1-2 minutes**

### Environment Variables (Production)

Set in GitHub repository secrets (Settings → Secrets → Actions):
- `VITE_GEMINI_API_KEY` - Your Gemini API key

The workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) automatically uses this in production builds.

---

## 📱 Responsive Design

### Breakpoints & Optimizations

| Device | Width | Layout | Features |
|--------|-------|--------|----------|
| **Mobile** | 320px - 480px | Stacked | Large touch targets (44px+) |
| **Small Mobile** | 480px - 640px | Stacked | Adjusted spacing |
| **Tablet** | 768px - 1024px | 2-3 columns | Sidebar navigation |
| **Desktop** | 1024px - 1440px | 3-4 columns | Full nav + draggable sidebar |
| **Large Display** | 1440px+ | 4+ columns | Max-width containers |

### Touch Device Support
- ✅ Automatic tap target sizing (44px minimum)
- ✅ No hover effects on touch devices
- ✅ Optimized form inputs for mobile keyboards
- ✅ Landscape mode support

### Accessibility
- ✅ `prefers-reduced-motion` support
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation

---

## 🎨 Design System

### Typography
- **Sans-serif:** Inter (body text, UI)
- **Monospace:** JetBrains Mono (code, labels)

### Color Palette
- **Brand (Cyan):** `#00f2ff`
- **Background:** `#030303`
- **Surface:** `#0a0a0a`
- **Text:** Gray scale (400-100)
- **Glow:** `rgba(0, 242, 255, 0.1-0.5)`

### Spacing & Layout
- Base unit: 4px (Tailwind)
- Responsive: `px-4 sm:px-6 md:px-12 lg:px-24`
- Fluid gap sizes based on breakpoints

### Components
- **Glass-morphism** - Frosted glass effect with backdrop blur
- **Neon borders** - Glowing cyan borders with box shadows
- **Smooth transitions** - 300ms ease-in-out animations
- **Framer Motion** - Advanced scroll and interaction animations

---

## ⚡ Performance

### Optimizations
- **Vite bundling** - Instant HMR in dev, optimized production builds
- **Code splitting** - Dynamic imports for better chunk sizes
- **Lazy loading** - Images load on demand with `loading="lazy"`
- **Asset hashing** - Automatic cache busting
- **CSS compression** - Minified and purged unused styles
- **Image optimization** - Automatically hashed by Vite

### Build Metrics
- **JavaScript:** ~666 KB (minified)
- **CSS:** ~68 KB (minified)
- **Profile Image:** ~19 KB
- **Resume Document:** Included via assetsInclude
- **Total:** ~753 KB

### Build Time
- Development: <1s (HMR)
- Production: ~10-15s

---

## 🔒 Security

- ✅ **No sensitive data** in repository
- ✅ **API keys** stored in environment variables
- ✅ **HTTPS enforced** on custom domain
- ✅ **No external tracking**
- ✅ **CRLF/LF line endings** configured in git

---

## 📄 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Format code (if configured)
npm run format

# Lint code (if configured)
npm run lint
```

---

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

### To customize:
1. Fork the repository
2. Update [src/constants.ts](src/constants.ts) with your information
3. Replace profile image and resume
4. Update custom domain in GitHub Pages settings
5. Deploy to your own GitHub Pages

---

## 📞 Contact

- **Email:** [kamran@sukkuribe.edu.pk](mailto:kamran@sukkuribe.edu.pk)
- **LinkedIn:** [linkedin.com/in/kamran-khan](https://linkedin.com/in/kamran-khan)
- **GitHub:** [@kamran-nizamani](https://github.com/kamran-nizamani)
- **Portfolio:** [kamrandev.me](https://kamrandev.me)

---

## 📜 License

This project is licensed under the **Apache License 2.0** - see the LICENSE file for details.

You're free to use this as a template for your own portfolio!

---

## 🙏 Acknowledgments

- **React** - UI framework
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Vite** - Next-generation build tool
- **Google Gemini API** - AI integration
- **Lucide React** - Beautiful icon library
- **GitHub Pages** - Free hosting & deployment

---

## 🔄 Version History

### v2.1 (Latest)
- ✨ Hero section layout flip (image left, text right)
- 📱 Touch device optimizations
- 🎯 Improved accessibility
- 🚀 Enhanced performance

### v2.0
- ✨ Full responsive design (mobile, tablet, desktop, laptop)
- 🎨 Comprehensive media queries for all breakpoints
- 📱 Touch-friendly tap targets (44px+)
- 🔧 Vite asset import system for images

### v1.0
- 🚀 Initial portfolio launch
- 🎨 Dark theme with neon accents
- 🧠 AI chat widget with Gemini API
- 📄 Professional resume modal
- ✨ Smooth scroll animations

---

## 🐛 Known Issues

- Build chunk size warning (~666 KB) - non-critical, can optimize with dynamic imports
- Gemini API requires valid API key and internet connection
- Windows CRLF line endings warning in git (cosmetic)

---

## 🗺️ Future Roadmap

- [ ] Dark/Light mode toggle
- [ ] Blog section with markdown support
- [ ] Project gallery with filtering
- [ ] Contact form with email integration
- [ ] Multi-language support (i18n)
- [ ] Code splitting for smaller chunks
- [ ] E2E tests with Playwright
- [ ] Performance monitoring

---

## 🚨 Troubleshooting

### Issue: Image not displaying
- **Solution:** Ensure image file has no spaces in filename (e.g., `portfilo-pic.jpeg`)
- Import via Vite: `import profileImage from '../public/portfilo-pic.jpeg'`

### Issue: Resume not downloading
- **Solution:** Check vite.config.ts includes `assetsInclude: ['**/*.docx']`
- Ensure resume filename matches import in App.tsx

### Issue: AI chat not working
- **Solution:** Verify `VITE_GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid at [Google AI Studio](https://ai.google.dev/studio)

### Issue: Page not responsive on mobile
- **Solution:** Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check viewport meta tag in index.html

---

**Made with ❤️ by Kamran Khan**

⭐ If you found this useful, please star the repo! It helps others discover it.

---


