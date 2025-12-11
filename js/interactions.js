// Micro-interactions - Premium Hover Effects & Mouse Responsiveness

class HeroInteractions {
    constructor() {
        this.initInteractions();
        this.setupPerformanceMonitoring();
    }
    
    initInteractions() {
        // Nav link interactions
        this.setupNavInteractions();
        
        // Scroll hint interactions
        this.setupScrollHint();
        
        // Mobile responsiveness
        this.setupMobileDetection();
    }
    
    setupNavInteractions() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Smooth hover transitions
            link.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
                link.style.letterSpacing = '3px';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
                link.style.letterSpacing = '1px';
            });
        });
    }
    
    setupScrollHint() {
        const scrollHint = document.querySelector('.scroll-hint');
        if (!scrollHint) return;
        
        // Pulse animation
        scrollHint.style.animation = 'scrollPulse 2s infinite';
        
        // Click to scroll
        scrollHint.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    setupMobileDetection() {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Reduce particle count for mobile performance
            const canvas = document.getElementById('hero-canvas');
            if (canvas) {
                canvas.style.opacity = '0.7';
            }
            
            // Adjust animations for mobile
            document.body.classList.add('is-mobile');
            
            // Add touch feedback
            this.setupTouchFeedback();
        }
    }
    
    setupTouchFeedback() {
        const touchElements = document.querySelectorAll('.nav-link, .scroll-hint');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor FPS for smooth 60fps performance
        let lastTime = performance.now();
        let frameCount = 0;
        let fps = 0;
        
        const updateFPS = () => {
            const now = performance.now();
            frameCount++;
            
            if (now >= lastTime + 1000) {
                fps = Math.round((frameCount * 1000) / (now - lastTime));
                frameCount = 0;
                lastTime = now;
                
                // Log FPS to console for debugging
                if (fps < 55) {
                    console.warn(`FPS dropped to ${fps} - Performance optimization needed`);
                }
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroInteractions();
});