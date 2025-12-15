# Typography-First Design System

A comprehensive, scroll-friendly design system built on high-contrast aesthetics, fluid typography, and accessibility-first principles.

## 🎨 Overview

This design system provides a complete set of design tokens, utility classes, and patterns for building consistent, beautiful web experiences that work seamlessly with Three.js canvas elements.

## 📚 Table of Contents

- [Typography](#typography)
- [Colors](#colors)
- [Spacing](#spacing)
- [Layout](#layout)
- [Motion](#motion)
- [Visual Effects](#visual-effects)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)

---

## Typography

### Fonts

Two complementary typefaces are loaded via `next/font`:

- **Space Grotesk** (`--font-display`): Condensed grotesk for display and headings
- **Inter** (`--font-body`): Editorial companion for body text

Both fonts include weights 300-700 with optimized `swap` display for performance.

### Type Scale

All font sizes use `clamp()` for fluid scaling between 320px and 1920px viewports:

```css
--font-size-display: clamp(3rem, 8vw + 1rem, 6rem)
--font-size-h1: clamp(2.5rem, 6vw + 1rem, 4.5rem)
--font-size-h2: clamp(2rem, 4vw + 0.5rem, 3.5rem)
--font-size-h3: clamp(1.5rem, 3vw + 0.5rem, 2.5rem)
--font-size-h4: clamp(1.25rem, 2vw + 0.25rem, 1.875rem)
--font-size-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem)
--font-size-small: clamp(0.875rem, 0.25vw + 0.75rem, 1rem)
--font-size-tiny: clamp(0.75rem, 0.25vw + 0.625rem, 0.875rem)
```

### Utility Classes

```html
<!-- Display text -->
<h1 class="text-display">Largest headlines</h1>

<!-- Hierarchical headings -->
<h2 class="text-h1">Primary heading</h2>
<h3 class="text-h2">Secondary heading</h3>
<h4 class="text-h3">Tertiary heading</h4>
<h5 class="text-h4">Quaternary heading</h5>

<!-- Body text -->
<p class="text-body-large">Lead paragraph or emphasis</p>
<p class="text-body">Standard body copy</p>
<p class="text-small">Captions and metadata</p>
<p class="text-tiny">Labels and tags (auto-uppercase)</p>

<!-- Accent color -->
<span class="text-accent">Highlighted text</span>
```

### Letter Spacing & Line Height

```css
/* Tracking */
--tracking-tight: -0.02em    /* Display and large headings */
--tracking-normal: 0         /* Body text */
--tracking-wide: 0.02em      /* Small text */
--tracking-wider: 0.05em     /* Tiny text and labels */

/* Leading */
--leading-tight: 1.2         /* Display and headings */
--leading-snug: 1.375        /* Subheadings */
--leading-normal: 1.5        /* UI elements */
--leading-relaxed: 1.625     /* Body text */
--leading-loose: 1.75        /* Generous spacing */
```

---

## Colors

### High-Contrast Palette

```css
--color-black: #0a0a0a          /* Primary dark */
--color-black-soft: #1a1a1a     /* Soft dark */
--color-white: #fafafa          /* Primary light */
--color-white-soft: #e5e5e5     /* Soft light */
--color-accent: #00ff88         /* Electric green accent */
--color-accent-dim: #00cc6d     /* Dimmed accent */
--color-gray: #666666           /* Mid gray */
--color-gray-light: #999999     /* Light gray */
--color-gray-dark: #333333      /* Dark gray */
```

### Section Background Classes

```html
<!-- Dark backgrounds -->
<section class="section-dark">Primary dark background</section>
<section class="section-dark-soft">Soft dark background</section>

<!-- Light backgrounds -->
<section class="section-light">Primary light background</section>
<section class="section-light-soft">Soft light background</section>

<!-- Accent background -->
<section class="section-accent">Accent highlight section</section>
```

---

## Spacing

### Scale

Consistent spacing for vertical and horizontal rhythm:

```css
--space-xs: 0.5rem    /* 8px */
--space-sm: 1rem      /* 16px */
--space-md: 2rem      /* 32px */
--space-lg: 4rem      /* 64px */
--space-xl: 6rem      /* 96px */
--space-2xl: 8rem     /* 128px */
--space-3xl: 12rem    /* 192px */
```

### Utility Classes

```html
<!-- Margin top -->
<div class="mt-xs">Small top margin</div>
<div class="mt-sm">Standard top margin</div>
<div class="mt-md">Medium top margin</div>
<div class="mt-lg">Large top margin</div>
<div class="mt-xl">Extra large top margin</div>
<div class="mt-2xl">2X large top margin</div>

<!-- Margin bottom -->
<div class="mb-xs">Small bottom margin</div>
<!-- ... same pattern as margin-top -->

<!-- Vertical padding -->
<div class="py-xs">Small vertical padding</div>
<div class="py-sm">Standard vertical padding</div>
<div class="py-md">Medium vertical padding</div>
<div class="py-lg">Large vertical padding</div>
<div class="py-xl">Extra large vertical padding</div>
<div class="py-2xl">2X large vertical padding</div>
```

---

## Layout

### Container Widths

```css
--container-max: 1440px       /* Full-width layouts */
--container-narrow: 960px     /* Focused content */
--container-reading: 720px    /* Optimal reading width */
--container-padding: 2rem     /* Horizontal gutter */
```

### Container Classes

```html
<!-- Full-width container -->
<div class="container">
  Wide content, grid layouts, rich media
</div>

<!-- Narrow container -->
<div class="container-narrow">
  Focused content with comfortable margins
</div>

<!-- Reading container -->
<div class="container-reading">
  Body text and editorial content
</div>
```

### Flexbox Utilities

```html
<div class="flex">Flexbox container</div>
<div class="flex flex-col">Column direction</div>
<div class="flex items-center">Vertically centered</div>
<div class="flex justify-center">Horizontally centered</div>
<div class="flex gap-sm">Small gap between items</div>
<div class="flex gap-md">Medium gap between items</div>
<div class="flex gap-lg">Large gap between items</div>
```

---

## Motion

### Duration Tokens

```css
--duration-instant: 100ms     /* Immediate feedback */
--duration-fast: 150ms        /* Quick transitions */
--duration-base: 250ms        /* Standard animations */
--duration-slow: 400ms        /* Deliberate motion */
--duration-slower: 600ms      /* Emphasized motion */
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Usage

```css
.my-element {
  transition: all var(--duration-fast) var(--ease-out);
}

.my-animated-element {
  animation: slideIn var(--duration-base) var(--ease-in-out);
}
```

---

## Visual Effects

### Scanline Overlay

Adds horizontal scanline effect for retro/technical aesthetic:

```html
<section class="scanline-overlay section-dark py-xl">
  Content with scanline effect
</section>
```

**Note:** Automatically disabled when `prefers-reduced-motion` is active.

### Jitter Overlay

Subtle animated distortion effect:

```html
<section class="jitter-overlay section-light py-xl">
  Content with subtle jitter animation
</section>
```

**Note:** Automatically disabled when `prefers-reduced-motion` is active.

### Customization

```css
:root {
  --scanline-opacity: 0.05;     /* Adjust scanline intensity */
  --jitter-intensity: 0.02;     /* Adjust jitter strength */
}
```

---

## Accessibility

### Reduced Motion Support

All animations and transitions honor `prefers-reduced-motion`:

- Motion durations set to 0ms
- Visual effects (scanlines, jitter) hidden
- Scroll behavior set to `auto` instead of `smooth`

This is handled automatically through CSS media queries.

### High Contrast

The color system maintains WCAG AA contrast ratios:

- Black on white: 19.5:1 (AAA)
- White on black: 19.5:1 (AAA)
- Accent on black: 7.2:1 (AA)
- Accent on white: 2.7:1 (for large text only)

### Keyboard Navigation

All interactive elements support keyboard navigation and have appropriate focus states.

---

## Usage Examples

### Basic Page Structure

```tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const MyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>

      {/* Hero Section */}
      <section className="section-dark jitter-overlay py-2xl">
        <div className="container text-center">
          <h1 className="text-display text-accent mb-md">
            Welcome
          </h1>
          <p className="text-body-large">
            Your content here
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-light py-xl">
        <div className="container-narrow">
          <h2 className="text-h2 mb-md">Section Title</h2>
          <p className="text-body mb-lg">
            Body content with optimal readability.
          </p>
        </div>
      </section>
    </>
  );
};

export default MyPage;
```

### With Three.js Canvas

```tsx
import { StoryEngine } from '@/components/StoryEngine';

const MyPage: NextPage = () => {
  return (
    <>
      {/* Three.js Canvas Section */}
      <section style={{ height: '100vh', position: 'relative' }}>
        <StoryEngine
          className="story-engine-canvas"
          enableControls={true}
          cameraPosition={[8, 5, 8]}
        />
      </section>

      {/* Scrollable Content Below */}
      <section className="section-light py-xl">
        <div className="container-narrow">
          <h2 className="text-h2">Content continues...</h2>
        </div>
      </section>
    </>
  );
};
```

### Form Elements

```tsx
<form className="container-narrow py-lg">
  <div className="mb-md">
    <label className="text-small text-accent uppercase mb-xs">
      Name
    </label>
    <input
      type="text"
      className="text-body"
      style={{
        width: '100%',
        padding: 'var(--space-sm)',
        background: 'var(--color-black-soft)',
        border: '1px solid var(--color-gray-dark)',
        borderRadius: '4px',
        color: 'var(--color-white)',
        transition: 'border-color var(--duration-fast) var(--ease-out)',
      }}
    />
  </div>

  <button
    className="text-body"
    style={{
      padding: 'var(--space-sm) var(--space-md)',
      background: 'var(--color-accent)',
      color: 'var(--color-black)',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all var(--duration-fast) var(--ease-out)',
    }}
  >
    Submit
  </button>
</form>
```

---

## Testing

Visit `/showcase` to see all design system components in action with live examples and interactive demonstrations.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties required
- CSS clamp() required (all modern browsers)
- Prefers-reduced-motion support (all modern browsers)

## Performance

- Fonts loaded with `next/font` for optimal performance
- CSS variables for efficient property updates
- Minimal JavaScript requirements
- GPU-accelerated animations (transform, opacity)

---

## Future Enhancements

Potential additions to the design system:

- [ ] Dark/light mode toggle (currently fixed to dark)
- [ ] Additional color accents for different states
- [ ] Grid system utilities
- [ ] Animation presets library
- [ ] Component library (cards, buttons, etc.)
- [ ] CSS-in-JS integration
- [ ] Theming system for multi-brand support
