export interface StorySegment {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  order: number;
  theme?: 'dark' | 'light';
  duration?: number; // in milliseconds
  cameraTarget?: {
    x: number;
    y: number;
    z: number;
  };
  cameraPosition?: {
    x: number;
    y: number;
    z: number;
  };
}

export const storySegments: StorySegment[] = [
  {
    id: 'intro',
    title: 'Introduction',
    subtitle: 'Welcome to the Experience',
    description: 'Immerse yourself in a narrative-driven visual experience',
    order: 0,
    theme: 'dark',
    duration: 3000,
    cameraPosition: { x: 0, y: 0, z: 5 },
    cameraTarget: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'act-one',
    title: 'Act One',
    subtitle: 'The Beginning',
    description: 'Explore the foundations of our narrative',
    order: 1,
    theme: 'dark',
    duration: 5000,
    cameraPosition: { x: 3, y: 2, z: 5 },
    cameraTarget: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'act-two',
    title: 'Act Two',
    subtitle: 'The Development',
    description: 'Witness the unfolding of key moments',
    order: 2,
    theme: 'dark',
    duration: 5000,
    cameraPosition: { x: -3, y: 2, z: 5 },
    cameraTarget: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'act-three',
    title: 'Act Three',
    subtitle: 'The Climax',
    description: 'Experience the pinnacle of our story',
    order: 3,
    theme: 'dark',
    duration: 5000,
    cameraPosition: { x: 0, y: 3, z: 6 },
    cameraTarget: { x: 0, y: 0, z: 0 },
  },
];

export const getSegmentById = (id: string): StorySegment | undefined => {
  return storySegments.find((segment) => segment.id === id);
};

export const getSegmentByOrder = (order: number): StorySegment | undefined => {
  return storySegments.find((segment) => segment.order === order);
};

export const getNextSegment = (currentId: string): StorySegment | undefined => {
  const current = getSegmentById(currentId);
  if (!current) return undefined;
  return getSegmentByOrder(current.order + 1);
};

export const getPreviousSegment = (currentId: string): StorySegment | undefined => {
  const current = getSegmentById(currentId);
  if (!current) return undefined;
  return getSegmentByOrder(current.order - 1);
};
