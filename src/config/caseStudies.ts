export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  featured: boolean;
  slug: string;
  thumbnail?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  }[];
  year?: number;
  client?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'Immersive Portfolio Experience',
    category: 'Web Experience',
    description:
      'A narrative-driven portfolio showcasing our capabilities through an interactive 3D experience.',
    challenge:
      'Creating an engaging web experience that stands out while maintaining performance and accessibility.',
    solution:
      'Built a custom experience using React Three Fiber, GSAP animations, and smooth scrolling with Lenis.',
    result: 'Increased engagement by 300% and reduced bounce rate significantly.',
    tags: ['3D', 'React', 'WebGL', 'Animation'],
    featured: true,
    slug: 'immersive-portfolio',
    year: 2024,
    client: 'Self-directed',
  },
  {
    id: 'case-02',
    title: 'Digital Brand Experience',
    category: 'Interactive Design',
    description:
      'A comprehensive digital brand platform combining visual storytelling with seamless interactions.',
    challenge:
      'Translating brand values into an interactive digital medium while ensuring consistency.',
    solution:
      'Developed a modular component system with smooth transitions and intuitive navigation.',
    result: 'Established strong brand presence and improved user retention metrics.',
    tags: ['Design', 'Interaction', 'Branding'],
    featured: true,
    slug: 'digital-brand',
    year: 2024,
    client: 'Premium Brand',
  },
  {
    id: 'case-03',
    title: 'Motion Graphics Suite',
    category: 'Animation',
    description:
      'A collection of motion graphics and animated sequences for marketing and promotional content.',
    challenge: 'Delivering high-quality animations that work across all platforms and devices.',
    solution:
      'Leveraged GSAP and WebGL for performant, device-agnostic animations.',
    result: 'Successfully deployed across multiple channels with consistent performance.',
    tags: ['Motion', 'GSAP', 'Animation', 'Performance'],
    featured: false,
    slug: 'motion-graphics',
    year: 2024,
  },
];

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter((study) => study.featured);
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((study) => study.slug === slug);
};

export const getCaseStudiesByCategory = (category: string): CaseStudy[] => {
  return caseStudies.filter((study) => study.category === category);
};

export const getCaseStudiesByTag = (tag: string): CaseStudy[] => {
  return caseStudies.filter((study) => study.tags.includes(tag));
};
