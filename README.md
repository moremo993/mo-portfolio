# Experience Shell - Production Ready

A production-ready Next.js 14 + TypeScript portfolio experience with persistent Canvas across route transitions, smooth scrolling with Lenis, GSAP animations, and global state management with Zustand.

## Features

### Core Technologies
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js & React Three Fiber** - 3D graphics and WebGL rendering
- **GSAP 3** - Professional animation library
- **Lenis** - Smooth scrolling library
- **Zustand** - Lightweight state management

### Architecture Highlights

#### Persistent Canvas Layer
- Single `<Canvas>` component mounted at the root layout
- Survives route transitions
- Sits beneath all page content with fixed positioning
- Accessible via the 3D context throughout the application

#### HTML Overlay System
- Fixed positioning layer (z-index: 10) for interactive UI elements
- Navigation bar with route tracking
- CTAs and copy elements
- Responsive design with pointer events management

#### Global State Management
The Zustand narrative store manages:
- **Narrative Section Tracking**: Current and previous section state
- **Interaction Mode**: idle, exploring, focused, transitioning states
- **Interaction Locks**: Prevent unwanted interactions during animations or transitions

#### Structured Data & Configuration
- **Story Segments**: Narrative sections with camera positioning and timing
- **Copy Configuration**: Section-specific copy, headings, and CTAs
- **Case Studies**: Portfolio projects with metadata and filtering utilities

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Canvas
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page
│   ├── work/page.tsx            # Portfolio/work page
│   ├── contact/page.tsx         # Contact page
│   ├── case-studies/[slug]/page.tsx  # Dynamic case study pages
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable React components
│   ├── Canvas.tsx               # 3D canvas wrapper
│   ├── HTMLOverlay.tsx          # HTML overlay layer
│   ├── Navigation.tsx           # Navigation component
│   ├── Section.tsx              # Section component with animations
│   └── Provider.tsx             # Root provider for global setup
├── stores/                       # Zustand state management
│   └── narrativeStore.ts        # Global narrative state
├── config/                       # Configuration files
│   ├── segments.ts              # Story segments configuration
│   ├── copy.ts                  # Copy/content configuration
│   └── caseStudies.ts           # Case studies data
├── utils/                        # Utility functions
│   └── lenis.ts                 # Lenis smooth scrolling setup
└── styles/                       # Global styles
    └── globals.css              # Tailwind + custom styles
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run analyze` - Analyze bundle size

## Configuration

### Tailwind CSS
Customize colors, fonts, and spacing in `tailwind.config.ts`:
- Dark, restrained color palette (background: #0a0a0a)
- Custom font families: Sans (Inter), Serif (Playfair Display)
- Extended spacing and animation utilities

### TypeScript
Strict mode enabled with path aliases for cleaner imports:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/stores/*` → `src/stores/*`
- `@/config/*` → `src/config/*`

### Story Segments
Modify story segments in `src/config/segments.ts`:
- Add new narrative sections
- Configure camera positions and targets
- Set segment duration and theme

### Copy & CTA
Update copy and calls-to-action in `src/config/copy.ts`:
- Customize headings and body text
- Configure CTA buttons and links
- Manage global copy strings

### Case Studies
Add projects to `src/config/caseStudies.ts`:
- Project metadata (title, category, year)
- Challenge/solution/result descriptions
- Tags for filtering and organization

## State Management

### Using the Narrative Store

```typescript
import { useNarrativeStore } from '@/stores/narrativeStore';

// In your component
const currentSection = useNarrativeStore(state => state.currentSection);
const setCurrentSection = useNarrativeStore(state => state.setCurrentSection);
const isLocked = useNarrativeStore(state => state.isLocked());

// Add interaction lock during animation
const addLock = useNarrativeStore(state => state.addLock);
addLock('animation-transition', 'Animating section change');

// Remove lock when done
const removeLock = useNarrativeStore(state => state.removeLock);
removeLock('animation-transition');
```

## Smooth Scrolling

Lenis is initialized globally in the `Provider` component. Access it in your components:

```typescript
import { scrollToElement, scrollToPosition, getLenis } from '@/utils/lenis';

// Scroll to element
scrollToElement('#case-studies', { offset: 50 });

// Scroll to position
scrollToPosition(1000);

// Get Lenis instance for advanced usage
const lenis = getLenis();
```

## Animations with GSAP

Animations are applied throughout the project using GSAP:

```typescript
import gsap from 'gsap';

// Animate section entrance
gsap.fromTo(
  ref.current,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
);
```

## 3D Canvas Usage

The persistent Canvas component can be extended with custom 3D elements:

```typescript
// In your component inside canvas context
export const MyModel: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e0e0e0" />
    </mesh>
  );
};

// Add to Canvas in layout.tsx
<Canvas>
  <MyModel />
</Canvas>
```

## Development Guidelines

### Code Style
- Follow existing TypeScript conventions
- Use functional components with hooks
- Maintain responsive design patterns
- Keep components modular and reusable

### Performance
- Use Next.js Image component for images
- Lazy load components with dynamic imports
- Monitor bundle size with `npm run analyze`
- Optimize animations for smooth 60fps

### Accessibility
- Use semantic HTML
- Provide focus visible states
- Add aria labels where needed
- Test keyboard navigation

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Troubleshooting

### Canvas not rendering
- Check browser WebGL support
- Verify Three.js and @react-three/fiber versions match
- Check browser console for errors

### Smooth scrolling not working
- Ensure Lenis initialization in Provider component
- Check for conflicting scroll events
- Verify Lenis library is loaded

### TypeScript errors
- Run `npm run build` to get detailed type errors
- Check tsconfig.json paths configuration
- Clear `.next` directory and rebuild

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` directory and static files
3. Ensure Node.js >= 18 on server
4. Set `NODE_ENV=production`

## Next Steps

1. **Customize Content**: Update copy, case studies, and story segments
2. **Add 3D Elements**: Create custom Three.js geometry and materials
3. **Expand Pages**: Create additional pages with Section components
4. **Integrate CMS**: Connect to Contentful, Sanity, or other headless CMS
5. **Analytics**: Add analytics library (Vercel Analytics, GA, etc.)

## License

MIT License - feel free to use this template for your projects.

## Support

For issues or questions, refer to the documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://greensock.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

Built with ❤️ for immersive web experiences.
