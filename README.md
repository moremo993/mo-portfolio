# Horizon Hero Section Prototype

Ultra-Premium Cinematic 3D Hero Section for Mohamed ElSaadawey's Portfolio

## Features

✅ **Premium Glassmorphism Navbar** - Fixed, semi-transparent with backdrop blur
✅ **Immersive 3D Particle Field** - Three.js powered with cinematic color grading
✅ **Staggered Text Animation** - "H O R I Z O N" letter-by-letter reveal
✅ **GSAP Scroll Animations** - Camera pull-back and layer reveals
✅ **Mouse-Responsive Effects** - Interactive particle field and hover states
✅ **Mobile Optimized** - Graceful degradation on mobile devices
✅ **60fps Performance** - Optimized for smooth animations

## Installation

```bash
npm install
npm start
```

## Project Structure

```
project-root/
├── index.html                  # Main HTML structure
├── css/
│   ├── global.css             # Base styles, colors, typography
│   ├── hero.css               # Hero section specific styles
│   ├── animations.css         # GSAP animation classes
│   └── glass-morphism.css     # Premium glass effects
├── js/
│   ├── three-init.js         # Three.js particle field
│   ├── gsap-scroll.js         # Scroll-triggered animations
│   ├── hero-cinema.js         # Cinematic text animations
│   └── interactions.js        # Micro-interactions & performance
├── assets/                    # Textures, fonts, etc.
└── package.json               # Project dependencies
```

## Design System

### Colors
- **Deep Charcoal**: `#0a0e27` (primary background)
- **Warm Black**: `#111111` (secondary surfaces)
- **Cyan Accent**: `#00d4ff` (primary accent)
- **Gold Accent**: `#ffd700` (secondary accent)

### Typography
- **Headings**: Playfair Display (300-700 weights)
- **Body**: Inter (300-600 weights)
- **UI**: Montserrat (300-600 weights)

### Animation Easing
- **Cinematic In**: `cubic-bezier(0.5, 0, 0.5, 1)`
- **Cinematic Out**: `cubic-bezier(0, 0, 0.2, 1)`
- **Weighted**: `cubic-bezier(0.25, 0.1, 0.25, 1)`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- **Particle Count**: 15,000 (reduced on mobile)
- **Target FPS**: 60fps
- **Optimizations**: WebGL rendering, additive blending, efficient updates

## License

MIT © Mohamed ElSaadawey