# Mo Portfolio - React Three Fiber

A modern portfolio website featuring a kinetic hero section and modular Story Engine built with React Three Fiber, GSAP, and Next.js.

## Features

### Hero Section
- **Kinetic Typography**: GSAP-powered staggered character animations
- **Three.js Text Geometry**: 3D text with custom scanline/jitter shaders
- **Timeline Choreography**: Assembly → Disruption → Resolve sequence
- **Reduced Motion Support**: Accessible fallbacks for motion-sensitive users
- **Synchronized Animations**: DOM typography leads, Canvas follows
- **No Infinite Loops**: All animations complete cleanly

### Story Engine
- **Central Core Ring**: Engineered torus topology with intentional negative space
- **Five Radial Segments**: Strategy, Storytelling, Content, Analytics, Community
- **Dynamic Lighting System**: Soft key, rim, and ambient lights with state-driven intensities
- **Shared Materials**: Satin metal, emissive seams, and neutral dark materials

### Architecture
- **Global State Management**: Zustand store for geometry props binding
- **Single Canvas Scene**: Optimized single scene architecture
- **Efficient Rendering**: Shared geometries and instanced meshes where possible
- **State-Driven Animations**: All geometry props are bindable to global state

### Materials
1. **Satin Metal**: High metalness, low roughness for reflective surfaces
2. **Emissive Seams**: Dynamic emissive properties for visual accents
3. **Neutral Dark**: Base material for structural elements

### Lighting Configuration
- **Key Light**: Primary illumination with shadow casting
- **Rim Light**: Edge highlighting for depth and dimension
- **Ambient Light**: Base illumination with subtle modulation
- **State-Driven Intensities**: All lighting parameters configurable via global state

## Usage

### Hero Section
```jsx
import { Hero } from '@/components/sections/Hero';

function HomePage() {
  return (
    <Hero
      headline="Build Stories That Matter"
      subline="Strategy, storytelling, and technology converge"
    />
  );
}
```

### Story Engine
```jsx
import { StoryEngine } from '@/components/StoryEngine';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <StoryEngine 
        enableControls={true}
        enableEnvironment={true}
        showContactShadows={true}
      />
    </div>
  );
}
```

### Advanced Control
```jsx
import { useStoryEngine } from '@/hooks/useStoryEngine';

function ControlledStoryEngine() {
  const storyEngine = useStoryEngine();
  
  // Animation control
  storyEngine.startAnimation();
  storyEngine.setAnimationSpeed(1.5);
  storyEngine.setAnimationState({ autoRotate: false });
  
  // Segment control
  storyEngine.activateSegment('strategy');
  storyEngine.setSegmentActive('content', true);
  
  // Lighting control
  storyEngine.setLightingPreset('dramatic');
  
  // Scene configuration
  storyEngine.setSeparationDistance(3.0);
  
  return <StoryEngine />;
}
```

## State Management

### Store Structure
```typescript
interface StoryEngineState {
  coreRing: CoreRingConfig;
  segments: SegmentConfig[];
  lighting: LightingConfig;
  animationState: AnimationState;
  sceneConfig: SceneConfig;
  
  // Actions
  setCoreRingProps: (props: Partial<CoreRingConfig>) => void;
  setSegmentProps: (segmentId: string, props: Partial<SegmentConfig>) => void;
  setLightingProps: (props: Partial<LightingConfig>) => void;
  setAnimationState: (props: Partial<AnimationState>) => void;
  activateSegment: (segmentId: string) => void;
}
```

## Keyboard Controls

- **Space**: Start/Stop Animation
- **R**: Toggle Auto Rotate
- **1-5**: Activate specific segments
- **Esc**: Clear active segment

## Performance Optimizations

1. **Shared Geometries**: Core components use shared geometry instances
2. **Efficient Materials**: Dynamic material creation with state-based updates
3. **Memoized Components**: React memoization for expensive calculations
4. **Single Scene Architecture**: No multiple canvas instances
5. **Shadow Optimization**: Configurable shadow mapping for performance

## File Structure

```
src/
├── components/
│   ├── sections/
│   │   └── Hero/
│   │       ├── Hero.tsx              # Main Hero component
│   │       ├── HeroCanvas.tsx        # Three.js 3D text
│   │       ├── HeroTypography.tsx    # DOM typography animations
│   │       ├── ScrollCue.tsx         # Scroll indicator
│   │       ├── useHeroTimeline.ts    # Timeline hook
│   │       ├── shaders.ts            # Scanline/jitter shaders
│   │       ├── README.md             # Hero documentation
│   │       └── index.ts              # Exports
│   └── StoryEngine/
│       ├── CoreRing.tsx          # Central core ring component
│       ├── RadialSegments.tsx    # Five radial segments
│       ├── LightingSystem.tsx    # Dynamic lighting system
│       ├── StoryEngine.tsx       # Main component
│       ├── materials.ts          # Material configurations
│       └── index.ts              # Component exports
├── store/
│   └── storyEngineStore.ts   # Zustand global state
├── hooks/
│   └── useStoryEngine.ts     # Custom hook for state management
├── pages/
│   ├── index.tsx             # Main application page with Hero
│   ├── _app.tsx              # Next.js app component
│   ├── demo.tsx              # Interactive demo with controls
│   └── _document.tsx         # Document configuration
└── styles/
    └── globals.css           # Global styles and responsive design
```

## Dependencies

Core dependencies managed via package.json:
- React Three Fiber (@react-three/fiber)
- Three.js (three)
- Drei (@react-three/drei)
- Zustand (state management)
- Next.js (framework)

## Development

### Running the Application
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

### Story Engine Demo
Visit `/demo` for an interactive control panel to experiment with all features:
- Animation controls
- Lighting presets
- Scene configuration
- Segment activation

## Customization

### Adding New Lighting Presets
```typescript
const customPreset = {
  keyLightIntensity: 1.0,
  rimLightIntensity: 0.8,
  ambientIntensity: 0.4,
  keyLightColor: '#ffffff',
  rimLightColor: '#ff6b6b',
  ambientColor: '#404040',
};
```

### Creating Custom Segment Animations
```typescript
// Access via useStoryEngine hook
const { setSegmentProps, segments } = useStoryEngine();

// Modify segment properties dynamically
setSegmentProps('strategy', {
  scale: 1.2,
  separationDistance: 2.5,
});
```

## Technical Specifications

- **React Version**: 18.2.0
- **Three.js Version**: r157
- **Next.js Version**: 14.0.0
- **TypeScript**: Full type safety with strict mode
- **Bundle Size**: Optimized for production with tree-shaking
- **Browser Support**: Modern browsers with WebGL support

## License

This implementation is part of the mo-portfolio project.