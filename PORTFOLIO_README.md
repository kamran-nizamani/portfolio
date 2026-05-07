# 🚀 Professional Portfolio Website - Complete Refactor

A modern, fully responsive portfolio website with dark futuristic UI (neon blue accents). Built with React, TypeScript, Framer Motion, and Tailwind CSS.

## ✨ Key Features

### 🎨 UI/UX
- **Fully Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Scroll reveal effects with Framer Motion
- **Professional Theme** - Neon cyber aesthetic with glass-morphism
- **Interactive Elements** - Hover effects, draggable components, AI chat widget
- **Consistent Components** - Reusable card, button, and section components

### 📱 Responsive Breakpoints
```
Mobile:   < 640px   (sm)
Tablet:   640-1024px (md, lg)
Desktop:  > 1024px   (xl, 2xl)
```

### ⚡ Performance
- Optimized CSS with utility-first approach
- Component-based architecture for code splitting
- GPU-accelerated animations
- Lazy-load ready structure
- Smooth scrolling with debouncing

### ♿ Accessibility
- Semantic HTML elements
- Keyboard navigation support
- Focus states on interactive elements
- Reduced motion support (prefers-reduced-motion)
- Proper contrast ratios
- Form labels connected to inputs

## 📁 Project Structure

```
src/
├── components/
│   ├── Card.tsx                 # Reusable card wrapper
│   ├── Button.tsx               # Multi-variant button
│   ├── SectionHeading.tsx       # Consistent section headers
│   ├── ProjectCard.tsx          # Project display card
│   ├── SkillBar.tsx             # Animated skill progress
│   ├── CertificationCard.tsx    # Certification display
│   ├── ExperienceItem.tsx       # Timeline experience
│   └── index.ts                 # Component exports
│
├── hooks/
│   ├── useAnimations.ts         # Custom animation hooks
│   └── index.ts                 # Hook exports
│
├── utils/
│   ├── animations.ts            # Animation utilities
│   └── index.ts                 # Utility exports
│
├── App.tsx                      # Main app component
├── constants.ts                 # Data & configuration
├── index.css                    # Tailwind + custom CSS
├── main.tsx                     # React entry point
└── IMPROVEMENTS.md              # Detailed improvements guide

index.html                       # HTML entry point
package.json                     # Dependencies
tsconfig.json                    # TypeScript config
vite.config.ts                   # Vite configuration
```

## 🎯 Component Library

### Card
Reusable glass-morphism card with multiple hover variants.
```tsx
import { Card } from './components';

<Card hover="lift" className="p-8">
  {children}
</Card>
```

### Button
Multi-variant button component.
```tsx
import { Button } from './components';

<Button variant="primary" size="lg" icon={<Icon />}>
  Click me
</Button>
```

### SectionHeading
Consistent section headers with animations.
```tsx
<SectionHeading
  label="Protocol Capabilities"
  title="Technical Arsenal"
  highlight="Arsenal"
  description="Explore my technical skills..."
/>
```

### ProjectCard
Project display card with animations.
```tsx
<ProjectCard
  title="Project Name"
  description="Description..."
  tags={["React", "Node.js"]}
  link="#"
/>
```

### SkillBar
Animated skill progress bar.
```tsx
<SkillBar name="React" category="Web" level={88} />
```

## 🎬 Custom Hooks

### useScrollReveal
Triggers animation when element enters viewport.
```tsx
const { ref, isVisible } = useScrollReveal();
<div ref={ref}>Content</div>
```

### useMousePosition
Tracks mouse coordinates.
```tsx
const mousePos = useMousePosition();
// Use for interactive background effects
```

### useSmoothScroll
Smooth scroll to elements.
```tsx
const scrollToElement = useSmoothScroll();
scrollToElement('section-id');
```

### useLocalStorage
Type-safe localStorage management.
```tsx
const [theme, setTheme] = useLocalStorage('theme', 'dark');
```

## 🛠️ Utility Functions

### Animation Variants
Reusable Framer Motion variants.
```tsx
import { animationVariants } from './utils';
<motion.div {...animationVariants.fadeInUp}>Content</motion.div>
```

### Utility Functions
```tsx
import {
  debounce,
  throttle,
  scrollToElement,
  clamp,
  mapRange
} from './utils';
```

## 🎨 CSS Classes

### Neon Effects
- `.neon-text` - Glowing text effect
- `.neon-border` - Glowing border effect
- `.text-glow-blue` - Blue glow text

### Components
- `.glass-panel` - Glass-morphism panel
- `.brutalist-card` - Bold border card
- `.terminal-header` - Terminal style header

### Utilities
- `.mono-label` - Mono uppercase label
- `.noise-overlay` - Subtle noise texture
- `.scanline` - Scanline animation

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```bash
# .env.local
VITE_GEMINI_API_KEY=your_api_key_here
```

## 📊 Sections

1. **Home** - Hero section with introduction and CTA buttons
2. **Projects** - Artifact showcase with tags and descriptions
3. **Skills** - Technical arsenal with filterable skill bars
4. **Security Lab** - Research focus and highlights
5. **Experience** - Timeline of professional experience
6. **Contact** - Contact form and direct communication
7. **Certifications** - Verified credentials display

## 🎯 Responsive Design Features

### Mobile Optimizations
- Single-column layouts on mobile
- Larger touch targets (44px minimum)
- Improved spacing for smaller screens
- Optimized navigation (bottom bar)
- Hidden draggable sidebar

### Tablet Optimizations
- Two-column grid layouts
- Better utilization of landscape space
- Balanced spacing

### Desktop Optimizations
- Multi-column layouts
- Draggable elements
- Floating system metrics
- Draggable sidebar navigation

## ⚙️ Performance Tips

1. **Lazy Loading** - Components animate in on scroll
2. **Code Splitting** - Separate component files
3. **Animations** - GPU-accelerated via transform/opacity
4. **CSS** - Utility-first with Tailwind
5. **Debouncing** - Mouse tracking with smooth updates

## 🎨 Customization

### Colors
Edit the CSS variables in `index.css`:
```css
@theme {
  --color-brand: #00f2ff;
  --color-bg: #030303;
  --color-surface: #0a0a0a;
}
```

### Fonts
Update font imports in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

### Animations
Modify animation duration and easing in components:
```tsx
transition={{ duration: 0.5, ease: "easeInOut" }}
```

## 📱 Testing

### Mobile
- Test on various devices (320px - 1920px+)
- Test touch interactions
- Verify bottom navigation

### Tablet
- Test landscape mode
- Verify grid layouts
- Check spacing

### Desktop
- Test all hover effects
- Verify draggable elements
- Test keyboard navigation

## 🔗 Integrations

### Google Generative AI
AI chat widget powered by Google's Gemini API.

### External Links
- GitHub profile
- LinkedIn
- Email contact
- Portfolio website

## 📝 Future Enhancements

- [ ] Form validation and email sending
- [ ] Dark/light theme toggle
- [ ] Image lazy loading
- [ ] PWA support
- [ ] Analytics tracking
- [ ] Admin dashboard
- [ ] Blog section
- [ ] Project filtering
- [ ] Search functionality
- [ ] Comments system

## 🤝 Contributing

Feel free to fork and customize this portfolio template for your own use!

## 📄 License

SPDX-License-Identifier: Apache-2.0

---

**Made with ❤️ by Kamran Khan**

Built with React, TypeScript, Framer Motion, and Tailwind CSS.
