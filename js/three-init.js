// Three.js Particle Field - Ultra-Premium Cinematic Background
// Performance-optimized for 60fps

class HeroParticleField {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particleCount = 15000;
        this.mouse = new THREE.Vector2();
        this.windowHalf = new THREE.Vector2();
        this.targetMouse = new THREE.Vector2();
        this.easeFactor = 0.05;
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup - cinematic perspective
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 300;
        
        // Renderer setup - optimized for performance
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0e27, 0); // Deep charcoal with transparency
        
        // Particle system
        this.createParticles();
        
        // Cinematic lighting
        this.setupLighting();
        
        // Handle window resize
        this.handleResize();
    }
    
    createParticles() {
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        const colorCenter = new THREE.Color(0xffd700); // Gold center
        const colorEdge = new THREE.Color(0x00d4ff); // Cyan edge
        
        for (let i = 0; i < this.particleCount; i++) {
            // Position particles in a spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 200 + Math.random() * 100;
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            // Color gradient from gold center to cyan edges
            const distanceFromCenter = Math.sqrt(
                positions[i * 3] * positions[i * 3] +
                positions[i * 3 + 1] * positions[i * 3 + 1] +
                positions[i * 3 + 2] * positions[i * 3 + 2]
            );
            const normalizedDistance = distanceFromCenter / 300;
            
            const color = colorCenter.clone().lerp(colorEdge, normalizedDistance);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Size variation
            sizes[i] = 0.5 + Math.random() * 1.5;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }
    
    setupLighting() {
        // Ambient light for soft illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light for cinematic effect
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
    }
    
    handleResize() {
        this.windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.targetMouse.x = (event.clientX - this.windowHalf.x) * 0.0005;
        this.targetMouse.y = (event.clientY - this.windowHalf.y) * 0.0005;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth mouse following with easing
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * this.easeFactor;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * this.easeFactor;
        
        // Apply mouse influence to particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < this.particleCount; i++) {
                const px = positions[i * 3];
                const py = positions[i * 3 + 1];
                const pz = positions[i * 3 + 2];
                
                // Apply subtle mouse influence based on distance
                const distance = Math.sqrt(px * px + py * py + pz * pz);
                const influence = 1 - (distance / 300);
                
                positions[i * 3] += this.mouse.x * influence * 5;
                positions[i * 3 + 1] += this.mouse.y * influence * 5;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Gentle camera movement for cinematic feel
        this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.01;
        this.camera.position.y += (this.mouse.y * 50 - this.camera.position.y) * 0.01;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hero-canvas')) {
        new HeroParticleField('hero-canvas');
    }
});