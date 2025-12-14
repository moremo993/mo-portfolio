import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { StoryEngine } from '../components/StoryEngine';
import { useStoryEngine } from '../hooks/useStoryEngine';

const Home: NextPage = () => {
  const storyEngine = useStoryEngine();

  // Auto-start animation on mount
  React.useEffect(() => {
    storyEngine.startAnimation();
    storyEngine.setAnimationSpeed(0.8);
    storyEngine.setSeparationDistance(2.2);
  }, []);

  return (
    <>
      <Head>
        <title>Story Engine - React Three Fiber</title>
        <meta name="description" content="Modular Story Engine with React Three Fiber" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
        <StoryEngine
          className="main-story-engine"
          enableControls={true}
          enableEnvironment={true}
          showContactShadows={true}
          cameraPosition={[8, 5, 8]}
          cameraFov={45}
        />
      </main>
    </>
  );
};

export default Home;