import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Canvas } from '@/components/Canvas';
import { HTMLOverlay } from '@/components/HTMLOverlay';
import { Navigation } from '@/components/Navigation';
import { Provider } from '@/components/Provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Experience Shell - Production Ready',
  description:
    'A production-ready Next.js 14 portfolio experience with persistent Canvas, GSAP animations, and Lenis smooth scrolling.',
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  keywords: [
    'Next.js',
    'React',
    'Three.js',
    'GSAP',
    'Animation',
    'Portfolio',
    'Web Experience',
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Experience Shell - Production Ready',
    description: 'A cutting-edge portfolio experience',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white" suppressHydrationWarning>
        <Provider>
          {/* Persistent Canvas Layer - Fixed across all routes */}
          <Canvas>
            {/* Default 3D scene content goes here */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </Canvas>

          {/* HTML Overlay for Navigation and CTAs */}
          <HTMLOverlay>
            <Navigation />
          </HTMLOverlay>

          {/* Main Content Layer */}
          <main className="content-layer relative z-20 w-full">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
