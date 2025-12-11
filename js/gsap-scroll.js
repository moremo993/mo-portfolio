// GSAP Scroll Animations - Cinematic Weighted Easing
// Staggered text reveal, scroll-triggered animations

class HeroScrollAnimations {
    constructor() {
        // Initialize animations
        this.initHeroAnimations();
        this.initScrollTriggers();
    }
    
    initHeroAnimations() {
        // Staggered text reveal for "H O R I Z O N"
        const heroLetters = document.querySelectorAll('.hero-letter');
        
        gsap.from(heroLetters, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Subtitle fade-in with delay
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            gsap.from(subtitle, {
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: 'power3.out',
                delay: 2.0
            });
        }
        
        // Scroll hint animation
        const scrollHint = document.querySelector('.scroll-hint');
        if (scrollHint) {
            gsap.from(scrollHint, {
                opacity: 0,
                y: 20,
                duration: 1.0,
                ease: 'power3.out',
                delay: 2.5
            });
        }
    }
    
    initScrollTriggers() {
        // Hero camera pull-back effect on scroll
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            gsap.to(heroSection, {
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    markers: false // Set to true for debugging
                },
                scale: 0.95,
                ease: 'power3.out'
            });
        }
        
        // Layer reveal animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            gsap.from(heroContent, {
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: '+=500',
                    scrub: true
                },
                opacity: 0,
                y: 50,
                ease: 'power3.out'
            });
        }
        
        // Premium easing for all scroll animations
        gsap.defaults({
            ease: 'power3.out' // Deceleration-focused easing for cinematic feel
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroScrollAnimations();
});