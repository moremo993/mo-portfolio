export interface SegmentCopy {
  id: string;
  heading: string;
  subheading?: string;
  body: string;
  cta?: {
    text: string;
    href: string;
  };
  metadata?: Record<string, unknown>;
}

export const segmentCopy: Record<string, SegmentCopy> = {
  intro: {
    id: 'intro',
    heading: 'Welcome to the Experience',
    subheading: 'A Journey Through Innovation',
    body: 'Discover how we blend cutting-edge technology with thoughtful design to create immersive experiences that inspire.',
    cta: {
      text: 'Begin the Journey',
      href: '#act-one',
    },
  },
  'act-one': {
    id: 'act-one',
    heading: 'Act One: The Foundation',
    subheading: 'Where It All Begins',
    body: 'Every great story starts with a solid foundation. We started with a vision to create something truly remarkable.',
    cta: {
      text: 'Continue',
      href: '#act-two',
    },
  },
  'act-two': {
    id: 'act-two',
    heading: 'Act Two: The Evolution',
    subheading: 'Growth and Discovery',
    body: 'As our vision evolved, we discovered new possibilities. Each challenge became an opportunity to innovate.',
    cta: {
      text: 'Proceed',
      href: '#act-three',
    },
  },
  'act-three': {
    id: 'act-three',
    heading: 'Act Three: The Revelation',
    subheading: 'The Complete Picture',
    body: 'The culmination of our journey brings us to this moment. Experience the full potential of our innovation.',
    cta: {
      text: 'Explore Our Work',
      href: '/work',
    },
  },
  global: {
    id: 'global',
    heading: 'Explore',
    body: 'Navigate through our narrative experience.',
  },
};

export const getCopyById = (id: string): SegmentCopy | undefined => {
  return segmentCopy[id];
};
