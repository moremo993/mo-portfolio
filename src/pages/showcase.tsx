import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

/**
 * DESIGN SYSTEM SHOWCASE
 * ======================
 * This page demonstrates the typography-first design system including:
 * - Fluid typography scales
 * - Layout containers
 * - Section backgrounds
 * - Visual effects (scanline, jitter)
 * - Utility classes
 * - Scroll behavior
 */

const ShowcasePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Design System Showcase - Typography First</title>
        <meta name="description" content="Demonstration of the typography-first design system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section - Dark with Jitter */}
      <section className="section-dark jitter-overlay py-2xl">
        <div className="container text-center">
          <h1 className="text-display text-accent mb-md">
            Typography First
          </h1>
          <p className="text-body-large mb-lg">
            A high-contrast, scroll-friendly design system built for modern web experiences.
          </p>
          <p className="text-small text-accent uppercase">
            Scroll to explore ↓
          </p>
        </div>
      </section>

      {/* Typography Scale Demo - Light */}
      <section className="section-light py-xl">
        <div className="container-narrow">
          <p className="text-tiny text-accent mb-sm">Typography Scale</p>
          <h2 className="text-h1 mb-md">Fluid & Responsive</h2>
          <p className="text-body mb-lg">
            All typography scales fluidly between viewport sizes using CSS clamp() functions,
            ensuring optimal readability from mobile to desktop without breakpoint adjustments.
          </p>
          
          <div className="mb-lg">
            <h3 className="text-h2 mb-sm">Display Heading</h3>
            <p className="text-body">
              The largest, most impactful text treatment. Uses Space Grotesk with tight tracking
              for maximum visual impact.
            </p>
          </div>

          <div className="mb-lg">
            <h4 className="text-h3 mb-sm">Section Heading</h4>
            <p className="text-body">
              Hierarchical heading styles maintain consistent visual rhythm while providing
              clear information architecture.
            </p>
          </div>

          <div className="mb-md">
            <h5 className="text-h4 mb-sm">Subsection Title</h5>
            <p className="text-body-large mb-md">
              Body text uses Inter for superior readability in longer-form content. The large
              variant provides emphasis while maintaining editorial quality.
            </p>
            <p className="text-body mb-md">
              Standard body text is optimized for comfortable reading with relaxed leading and
              appropriate letter spacing across all devices.
            </p>
            <p className="text-small">
              Small text for captions, metadata, and secondary information maintains legibility
              while establishing hierarchy.
            </p>
          </div>
        </div>
      </section>

      {/* Color Palette Demo - Dark Soft with Scanlines */}
      <section className="section-dark-soft scanline-overlay py-xl">
        <div className="container-narrow">
          <p className="text-tiny text-accent mb-sm">Color System</p>
          <h2 className="text-h2 mb-md">High Contrast Palette</h2>
          <p className="text-body mb-lg">
            A carefully curated palette emphasizing stark black and white contrasts with a
            single electric accent color for strategic emphasis.
          </p>

          <div className="flex flex-col gap-md">
            <div className="py-md">
              <div style={{ 
                background: 'var(--color-black)', 
                padding: 'var(--space-md)',
                border: '1px solid var(--color-white-soft)'
              }}>
                <p className="text-small text-white">Primary Black: #0a0a0a</p>
              </div>
            </div>

            <div className="py-md">
              <div style={{ 
                background: 'var(--color-white)', 
                padding: 'var(--space-md)',
                color: 'var(--color-black)'
              }}>
                <p className="text-small">Primary White: #fafafa</p>
              </div>
            </div>

            <div className="py-md">
              <div style={{ 
                background: 'var(--color-accent)', 
                padding: 'var(--space-md)',
                color: 'var(--color-black)'
              }}>
                <p className="text-small">Accent Green: #00ff88</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Demo - Light Soft */}
      <section className="section-light-soft py-xl">
        <div className="container">
          <p className="text-tiny text-accent mb-sm text-center">Layout System</p>
          <h2 className="text-h2 mb-md text-center">Flexible Containers</h2>
          <p className="text-body text-center mb-lg">
            Three container widths provide layout flexibility for different content types.
          </p>

          <div className="mb-xl">
            <div style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-md)'
            }}>
              <p className="text-small">
                <span className="text-accent">Container (1440px)</span>: Full-width content
                areas for grid layouts and rich media.
              </p>
            </div>

            <div className="container-narrow" style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-md)'
            }}>
              <p className="text-small">
                <span className="text-accent">Container Narrow (960px)</span>: Focused content
                with comfortable margins.
              </p>
            </div>

            <div className="container-reading" style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-md)'
            }}>
              <p className="text-small">
                <span className="text-accent">Container Reading (720px)</span>: Optimal line
                length for body text and editorial content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Effects Demo - Accent */}
      <section className="section-accent py-xl">
        <div className="container-narrow text-center">
          <p className="text-tiny mb-sm" style={{ color: 'var(--color-black)' }}>
            Visual Effects
          </p>
          <h2 className="text-h2 mb-md">Scanlines & Jitter</h2>
          <p className="text-body mb-lg">
            Subtle overlay effects add depth and visual interest. Both respect
            prefers-reduced-motion for accessibility.
          </p>
        </div>
      </section>

      {/* Spacing Demo - Dark */}
      <section className="section-dark py-xl">
        <div className="container-narrow">
          <p className="text-tiny text-accent mb-sm">Spacing System</p>
          <h2 className="text-h2 mb-md">Consistent Rhythm</h2>
          <p className="text-body mb-lg">
            A harmonious spacing scale creates vertical rhythm and maintains visual consistency
            across all breakpoints.
          </p>

          <div className="flex flex-col">
            <div className="py-xs" style={{ background: 'var(--color-gray-dark)' }}>
              <p className="text-small">xs: 0.5rem</p>
            </div>
            <div className="py-sm" style={{ background: 'var(--color-gray-dark)' }}>
              <p className="text-small">sm: 1rem</p>
            </div>
            <div className="py-md" style={{ background: 'var(--color-gray-dark)' }}>
              <p className="text-small">md: 2rem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Demo - Light with Scanlines */}
      <section className="section-light scanline-overlay py-xl">
        <div className="container-narrow">
          <p className="text-tiny text-accent mb-sm">Motion Tokens</p>
          <h2 className="text-h2 mb-md">Purposeful Animation</h2>
          <p className="text-body mb-lg">
            Motion tokens provide consistent timing across all transitions and animations,
            with full support for reduced-motion preferences.
          </p>

          <div className="flex flex-col gap-md mb-lg">
            <button 
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--color-black)',
                color: 'var(--color-white)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}
              className="text-body"
            >
              Fast (150ms) - Hover me
            </button>
            
            <button 
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--color-accent)',
                color: 'var(--color-black)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all var(--duration-base) var(--ease-in-out)',
              }}
              className="text-body"
            >
              Base (250ms) - Hover me
            </button>

            <button 
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--color-gray-dark)',
                color: 'var(--color-white)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all var(--duration-slow) var(--ease-bounce)',
              }}
              className="text-body"
            >
              Slow (400ms) with Bounce - Hover me
            </button>
          </div>

          <p className="text-small text-gray">
            Users with prefers-reduced-motion enabled will experience instant transitions
            instead of animations.
          </p>
        </div>
      </section>

      {/* Accessibility Note - Dark Soft */}
      <section className="section-dark-soft py-xl">
        <div className="container-reading text-center">
          <p className="text-tiny text-accent mb-sm">Accessibility First</p>
          <h2 className="text-h3 mb-md">Built for Everyone</h2>
          <p className="text-body mb-md">
            This design system respects user preferences, maintains WCAG contrast ratios,
            and provides semantic HTML structure throughout.
          </p>
          <p className="text-small text-gray">
            Reduced motion, high contrast, and keyboard navigation are fully supported.
          </p>
        </div>
      </section>

      {/* Footer - Black */}
      <footer className="section-dark py-lg">
        <div className="container-narrow text-center">
          <p className="text-tiny text-gray mb-sm">Design System v1.0</p>
          <p className="text-small">
            Built with <span className="text-accent">Space Grotesk</span> and{' '}
            <span className="text-accent">Inter</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default ShowcasePage;
