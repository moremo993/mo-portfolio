import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Hero } from '../components/sections/Hero';
import { StoryEngine } from '../components/StoryEngine';
import { useStoryEngine } from '../hooks/useStoryEngine';

const Home: NextPage = () => {
  const storyEngine = useStoryEngine();

  // Auto-start StoryEngine animation
  React.useEffect(() => {
    storyEngine.startAnimation();
    storyEngine.setAnimationSpeed(0.8);
    storyEngine.setSeparationDistance(2.2);
  }, [storyEngine]);

  return (
    <>
      <Head>
        <title>Mo Portfolio - Strategy & Storytelling</title>
        <meta name="description" content="Strategic storytelling through design and technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: '100vw', margin: 0, padding: 0 }}>
        {/* Hero Section */}
        <Hero
          headline="Build Stories That Matter"
          subline="Strategy, storytelling, and technology converge to create meaningful experiences"
        />

        {/* Story Engine Section */}
        <section style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <StoryEngine
            className="main-story-engine"
            enableControls={true}
            enableEnvironment={true}
            showContactShadows={true}
            cameraPosition={[8, 5, 8]}
            cameraFov={45}
          />
        </section>
      </main>
    </>
  );
};

export default Home;