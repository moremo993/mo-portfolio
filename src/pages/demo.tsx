import React, { useState } from 'react';
import { StoryEngine, useStoryEngineStore } from '../components/StoryEngine';
import { useStoryEngine } from '../hooks/useStoryEngine';

const StoryEngineDemo: React.FC = () => {
  const [selectedLighting, setSelectedLighting] = useState('default');
  const [separationDistance, setSeparationDistance] = useState(2.5);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  
  const storyEngine = useStoryEngine();

  const handleLightingChange = (preset: string) => {
    setSelectedLighting(preset);
    storyEngine.setLightingPreset(preset as any);
  };

  const handleSeparationChange = (distance: number) => {
    setSeparationDistance(distance);
    storyEngine.setSeparationDistance(distance);
  };

  const handleSpeedChange = (speed: number) => {
    setAnimationSpeed(speed);
    storyEngine.setAnimationSpeed(speed);
  };

  const handleSegmentActivate = (segmentId: string) => {
    storyEngine.activateSegment(segmentId);
  };

  const segments = storyEngine.segments;
  const lighting = storyEngine.lighting;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0a0a0a' }}>
      {/* Story Engine Canvas */}
      <StoryEngine 
        className="story-engine-canvas"
        enableControls={true}
        enableEnvironment={true}
        showContactShadows={true}
        cameraPosition={[6, 4, 6]}
        cameraFov={50}
      />
      
      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        width: '300px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.85)',
        border: '1px solid #333',
        borderRadius: '8px',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        zIndex: 1000,
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          Story Engine Controls
        </h3>
        
        {/* Animation Controls */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            Animation
          </h4>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Speed: {animationSpeed}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <button
            onClick={() => storyEngine.setAnimationState({ 
              isAnimating: !storyEngine.animationState.isAnimating 
            })}
            style={{
              padding: '8px 16px',
              background: storyEngine.animationState.isAnimating ? '#4f9eff' : '#333',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              marginRight: '8px',
            }}
          >
            {storyEngine.animationState.isAnimating ? 'Stop' : 'Start'}
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={(e) => {
                setAutoRotate(e.target.checked);
                storyEngine.setAnimationState({ autoRotate: e.target.checked });
              }}
            />
            Auto Rotate
          </label>
        </div>

        {/* Lighting Controls */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            Lighting Preset
          </h4>
          <select
            value={selectedLighting}
            onChange={(e) => handleLightingChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#333',
              border: '1px solid #555',
              borderRadius: '4px',
              color: 'white',
            }}
          >
            <option value="default">Default</option>
            <option value="dramatic">Dramatic</option>
            <option value="subtle">Subtle</option>
            <option value="bright">Bright</option>
          </select>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#aaa' }}>
            Key: {lighting.keyLightIntensity.toFixed(1)} | 
            Rim: {lighting.rimLightIntensity.toFixed(1)} | 
            Ambient: {lighting.ambientIntensity.toFixed(1)}
          </div>
        </div>

        {/* Scene Controls */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            Scene
          </h4>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Segment Distance: {separationDistance}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={separationDistance}
              onChange={(e) => handleSeparationChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Segment Controls */}
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            Segments
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => handleSegmentActivate(segment.id)}
                style={{
                  padding: '6px 12px',
                  background: segment.active ? '#4f9eff' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '12px',
                }}
              >
                {segment.name}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #333' }}>
          <button
            onClick={() => storyEngine.reset()}
            style={{
              width: '100%',
              padding: '10px',
              background: '#666',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: '12px 16px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid #333',
        borderRadius: '6px',
        color: 'white',
        fontSize: '12px',
        maxWidth: '300px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Keyboard Controls:</div>
        <div>Space: Start/Stop Animation</div>
        <div>R: Toggle Auto Rotate</div>
        <div>1-5: Activate Segments</div>
        <div>Esc: Clear Active Segment</div>
      </div>
    </div>
  );
};

export default StoryEngineDemo;