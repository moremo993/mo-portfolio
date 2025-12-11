// Hero Cinema Animations - Ultra-Premium Cinematic Effects
// Weighted easing curves, dramatic reveals

class HeroCinemaAnimations {
    constructor() {
        this.initCinematicAnimations();
        this.setupMouseEffects();
    }
    
    initCinematicAnimations() {
        // Cinematic color grading animation
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            gsap.to(heroSection, {
                '--color-cyan-accent': '#00d4ff',
                '--color-gold-accent': '#ffd700',
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        }
        
        // Premium text glow pulse
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            gsap.to(heroTitle, {
                textShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)',
                duration: 2,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1
            });
        }
        
        // Subtle particle field breathing effect
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            gsap.to(canvas, {
                opacity: 0.9,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        }
    }
    
    setupMouseEffects() {
        // Mouse move effects on text
        const heroLetters = document.querySelectorAll('.hero-letter');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            heroLetters.forEach((letter, index) => {
                const speed = 0.1 + (index * 0.01);
                const x = (mouseX - 0.5) * 20 * speed;
                const y = (mouseY - 0.5) * 10 * speed;
                
                gsap.to(letter, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: 'power3.out'
                });
            });
        });
        
        // Hover effects on navbar
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    letterSpacing: '3px',
                    color: '#00d4ff',
                    duration: 0.3,
                    ease: 'power3.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    letterSpacing: '1px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.3,
                    ease: 'power3.out'
                });
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroCinemaAnimations();
});