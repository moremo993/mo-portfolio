export const scanlineVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const scanlineFragmentShader = `
  uniform float time;
  uniform float jitterAmount;
  uniform float scanlineIntensity;
  uniform vec3 textColor;
  uniform sampler2D textTexture;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Jitter effect
    float jitter = (random(vec2(time, vPosition.y)) - 0.5) * jitterAmount;
    uv.x += jitter;
    
    // Scanline effect
    float scanline = sin(vUv.y * 800.0 + time * 10.0) * scanlineIntensity;
    
    // Text color with effects
    vec3 color = textColor;
    color += scanline * 0.1;
    
    // Fade based on jitter amount (for resolve)
    float alpha = 1.0 - (jitterAmount * 2.0);
    alpha = clamp(alpha, 0.3, 1.0);
    
    gl_FragColor = vec4(color, alpha);
  }
`;
