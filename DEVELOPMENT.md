# Development Guide

This guide provides detailed information for developers working on the Experience Shell project.

## Project Overview

The Experience Shell is a modern, production-ready portfolio experience built with Next.js 14, TypeScript, and cutting-edge web technologies. It features a persistent 3D Canvas layer, smooth scrolling, animations, and a sophisticated state management system.

## Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router and SSG/SSR support
- **React 18** - UI library with hooks
- **TypeScript 5** - Type safety and better DX

### Styling & Layout
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom CSS** - For specific effects and resets

### 3D & Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js abstractions

### Animation & Interactions
- **GSAP 3** - Professional animation library
- **Lenis** - Smooth scrolling with custom easing

### State Management
- **Zustand 4** - Lightweight state management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS/Autoprefixer** - CSS processing

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js pages and layouts
├── components/            # Reusable React components
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
├── config/               # Configuration and data
├── utils/                # Utility functions
├── styles/               # Global and component styles
└── types/                # TypeScript type definitions
```

### Layer Architecture

The application uses a layered rendering approach:

1. **Canvas Layer (z-index: 0)** - Fixed 3D canvas with Three.js
2. **HTML Overlay (z-index: 10)** - Interactive UI elements (nav, CTAs)
3. **Content Layer (z-index: 20)** - Main page content sections

This ensures the 3D experience persists across page navigation while UI elements remain interactive.

## Component Architecture

### Canvas Component

The `Canvas` component wraps React Three Fiber and renders the persistent 3D scene:

```typescript
<Canvas>
  {/* 3D elements go here */}
  <mesh>{/* geometry and material */}</mesh>
</Canvas>
```

**Features:**
- Auto-rotation in idle mode
- Orbit controls in exploring mode
- Camera positioning via Three.js camera
- Responsive to interaction mode changes

### Section Component

The `Section` component wraps page content and handles:
- Intersection observer for visibility detection
- GSAP animations on enter
- Narrative state updates
- Responsive layout with Tailwind

**Usage:**

```typescript
<Section
  id="section-id"
  title="Section Title"
  subtitle="Optional subtitle"
  onEnter={() => console.log('Section visible')}
  onExit={() => console.log('Section hidden')}
>
  {/* Content goes here */}
</Section>
```

### HTML Overlay

The `HTMLOverlay` component provides a fixed positioning container for interactive elements:

```typescript
<HTMLOverlay>
  <Navigation />
  <CTAButtons />
</HTMLOverlay>
```

## State Management

### Narrative Store

The Zustand store manages the global narrative state:

```typescript
import { useNarrativeStore } from '@/stores/narrativeStore';

// In a component
const {
  currentSection,
  setCurrentSection,
  interactionMode,
  setInteractionMode,
  addLock,
  removeLock,
  isLocked,
} = useNarrativeStore();
```

**State Properties:**
- `currentSection` - Currently active narrative section
- `previousSection` - Previously active section
- `sections` - Array of all sections
- `interactionMode` - Current interaction state (idle, exploring, focused, transitioning)
- `interactionLocks` - Map of active interaction locks

**Methods:**
- `setSections(sections)` - Update available sections
- `setCurrentSection(section)` - Change current section
- `setInteractionMode(mode)` - Update interaction mode
- `addLock(lockId, reason)` - Add an interaction lock
- `removeLock(lockId)` - Remove an interaction lock
- `isLocked()` - Check if any locks are active
- `reset()` - Reset all state to initial values

## Custom Hooks

### useSection

Monitors changes to a specific section:

```typescript
const { isActive, setCurrentSection } = useSection('section-id', {
  onEnter: () => console.log('Entered'),
  onExit: () => console.log('Exited'),
});
```

### useInteractionLock

Manages interaction locks with automatic cleanup:

```typescript
const { acquireLock, releaseLock, isLocked } = useInteractionLock('animation', 'Running animation');

// Lock interactions
acquireLock();

// Unlock when done
releaseLock();
```

### useInteractionMode

Easy access to interaction mode state:

```typescript
const {
  mode,
  setMode,
  isMode,
  isIdle,
  isExploring,
  isFocused,
  isTransitioning,
} = useInteractionMode();

if (isTransitioning) {
  // disable interactions
}
```

## Configuration

### Story Segments (src/config/segments.ts)

Define narrative segments with camera positioning:

```typescript
{
  id: 'intro',
  title: 'Introduction',
  description: 'Welcome message',
  order: 0,
  duration: 3000,
  cameraPosition: { x: 0, y: 0, z: 5 },
  cameraTarget: { x: 0, y: 0, z: 0 },
}
```

### Copy Configuration (src/config/copy.ts)

Manage all text content and CTAs:

```typescript
{
  id: 'intro',
  heading: 'Welcome to the Experience',
  subheading: 'A Journey Through Innovation',
  body: 'Discover...',
  cta: {
    text: 'Begin the Journey',
    href: '#act-one',
  },
}
```

### Case Studies (src/config/caseStudies.ts)

Portfolio projects with metadata:

```typescript
{
  id: 'case-01',
  title: 'Project Name',
  category: 'Web Experience',
  description: '...',
  challenge: '...',
  solution: '...',
  result: '...',
  tags: ['3D', 'React'],
  featured: true,
  slug: 'project-slug',
  year: 2024,
  client: 'Client Name',
}
```

## Styling Guidelines

### Colors

The project uses a dark, restrained color palette:

- **Background**: `#0a0a0a` (near black)
- **Foreground**: `#fafafa` (near white)
- **Primary**: `#1a1a1a` (dark gray)
- **Secondary**: `#2a2a2a` (medium gray)
- **Accent**: `#e0e0e0` (light gray)

### Typography

- **Sans**: Inter (regular text)
- **Serif**: Playfair Display (headings)
- **Monospace**: System default (code)

### Responsive Design

Use Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Animation Patterns

### GSAP Animations

```typescript
import gsap from 'gsap';

// Simple animation
gsap.to(element, {
  duration: 0.8,
  opacity: 1,
  ease: 'power2.out',
});

// From animation
gsap.fromTo(
  element,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
);

// Timeline
const tl = gsap.timeline();
tl.to(element1, { duration: 0.5, opacity: 1 })
  .to(element2, { duration: 0.5, opacity: 1 }, '-=0.25');
```

### Lenis Smooth Scrolling

```typescript
import { scrollToElement, getLenis } from '@/utils/lenis';

// Scroll to element
scrollToElement('#target', { offset: 50 });

// Get Lenis instance
const lenis = getLenis();
lenis?.stop(); // Stop scrolling
lenis?.start(); // Resume scrolling
```

## Performance Optimization

### Image Optimization

Always use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={800}
  priority={false}
/>
```

### Code Splitting

Use dynamic imports for large components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

### Bundle Analysis

Analyze bundle size:

```bash
npm run analyze
```

## Testing Locally

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Common Tasks

### Add a New Page

1. Create file in `src/app/page-name/page.tsx`
2. Use client component directive: `'use client'`
3. Use Section components for layout
4. Add to Navigation config in `components/Navigation.tsx`

### Add a New Section

1. Define in `src/config/segments.ts`
2. Add copy in `src/config/copy.ts`
3. Create Section in page component
4. Update store if needed

### Add 3D Elements

1. Create component in `src/components/3d/`
2. Export as Three.js/Fiber component
3. Add to Canvas in `layout.tsx`
4. Control with Zustand state if needed

### Update Styling

1. Modify Tailwind classes in components
2. For complex styles, add to `src/styles/globals.css`
3. Use CSS variables for theme colors
4. Run `npm run lint` to check

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

### Build Optimization

- Ensure `npm run build` succeeds
- Check bundle size with `npm run analyze`
- Test production build locally
- Verify all pages render correctly

## Troubleshooting

### Canvas Won't Render

1. Check browser console for WebGL errors
2. Verify Three.js version compatibility
3. Try clearing `.next` directory
4. Ensure GPU is available in browser

### Smooth Scroll Not Working

1. Check Provider component initialization
2. Verify Lenis library loaded
3. Check for conflicting scroll listeners
4. Clear browser cache

### TypeScript Errors

1. Run `npm run build` for detailed errors
2. Check `tsconfig.json` paths
3. Verify all imports are correct
4. Clear `.next` directory and rebuild

### Performance Issues

1. Use `npm run analyze` to find large dependencies
2. Check for unnecessary re-renders in DevTools
3. Monitor animation frame rate
4. Test on lower-end devices

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs)
- [GSAP](https://greensock.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lenis](https://lenis.darkroom.engineering)

## Code Style

### TypeScript

```typescript
// Use type annotations
interface Props {
  title: string;
  onClick: () => void;
}

// Use const for components
const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  return <div onClick={onClick}>{title}</div>;
};
```

### Components

```typescript
// Keep components focused and small
// Extract complex logic into hooks
// Use composition over inheritance
// Keep prop drilling minimal with context/Zustand
```

### Naming Conventions

- Components: PascalCase (`MyComponent.tsx`)
- Files: kebab-case (`my-component.tsx`)
- Functions/variables: camelCase (`myFunction`)
- Constants: UPPER_SNAKE_CASE (`MY_CONSTANT`)
- Types/Interfaces: PascalCase (`MyType`)

## Contributing

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Ensure tests pass: `npm run lint && npm run build`
4. Push to origin: `git push origin feat/feature-name`
5. Create a pull request

---

For more information, see [README.md](./README.md)
