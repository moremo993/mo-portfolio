# Hero Component

A kinetic hero section with synchronized Three.js/R3F text geometry and DOM typography animations using GSAP.

## Features

- **Three.js/R3F Text Geometry**: 3D text rendered in a Canvas overlay with custom shader effects
- **DOM Typography**: Staggered character animations with smooth transitions
- **GSAP Timeline**: Choreographed "assembly → disruption → resolve" sequence
- **Scanline/Jitter Shader**: Micro effects that resolve to a clean finish
- **Reduced Motion Support**: Respects `prefers-reduced-motion` with simple fade fallback
- **Timeline Controls**: Exposed through `useHeroTimeline` hook
- **No Infinite Loops**: All animations complete and stop after the resolve phase
- **Scroll Cue**: Clear indicator for users to continue scrolling

## Usage

### Basic Implementation

```tsx
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

### Advanced Control

```tsx
import { Hero, useHeroTimeline } from '@/components/sections/Hero';

function HomePage() {
  const handleComplete = () => {
    console.log('Hero animation complete');
  };

  return (
    <Hero
      headline="Your Headline"
      subline="Your subline text"
      autoPlay={true}
      onComplete={handleComplete}
    />
  );
}
```

## Animation Timeline

The hero animation follows a three-phase sequence:

### Phase 1: Assembly (0-2s)
- DOM characters appear with staggered entrance
- 3D text materializes from nothing
- Typography leads, 3D follows slightly after

### Phase 2: Disruption (2-3s)
- Micro jitter effect on 3D text
- Scanline shader introduces visual noise
- DOM characters have subtle shake
- Creates tension and energy

### Phase 3: Resolve (3-4s)
- All effects fade out smoothly
- Text settles into final position
- Subline fades in
- Scroll cue appears at the end

## Props

### Hero Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | Required | Main headline text to display |
| `subline` | `string` | Required | Secondary descriptive text |
| `autoPlay` | `boolean` | `true` | Whether to start animation automatically |
| `onComplete` | `() => void` | `undefined` | Callback when animation completes |

## Timeline Controls

The `useHeroTimeline` hook exposes timeline controls:

```tsx
const { timeline, isComplete, play, pause, restart, seek } = useHeroTimeline({
  autoPlay: true,
  reducedMotion: false,
  onComplete: () => console.log('Done!'),
});
```

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `timeline` | `gsap.core.Timeline \| null` | GSAP timeline instance |
| `isComplete` | `boolean` | Whether animation has completed |
| `play` | `() => void` | Start/resume the timeline |
| `pause` | `() => void` | Pause the timeline |
| `restart` | `() => void` | Restart from beginning |
| `seek` | `(time: number) => void` | Jump to specific time |

## Accessibility

### Reduced Motion

The component automatically detects `prefers-reduced-motion` and provides a simple fade-in alternative:

- No jitter or shake effects
- No scanline shader
- Simple opacity transitions
- Immediate content reveal

### Keyboard Navigation

- Scroll cue is clickable and keyboard accessible
- Smooth scroll to next section on activation

## Performance

- Shader effects are GPU-accelerated
- Canvas runs at optimized frame rate
- Animations are killed on unmount
- No infinite loops after completion
- Layout shift prevention built-in

## Customization

### Styling

All styles are in `src/styles/globals.css` under `.hero-*` classes.

Key customization points:
- Background gradient
- Typography sizes and weights
- Color scheme
- Animation timing
- Responsive breakpoints

### Timeline Duration

Edit timing values in the component files:
- `HeroTypography.tsx`: DOM animation timing
- `HeroCanvas.tsx`: 3D text animation timing
- `ScrollCue.tsx`: Scroll cue appearance timing

## Browser Support

- Modern browsers with WebGL support
- Graceful degradation for older browsers
- Reduced motion support for accessibility

## Development

Debug controls are available in development mode:
- Play button
- Pause button
- Restart button

These are automatically hidden in production builds.
