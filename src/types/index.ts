// Narrative and Interaction Types
export type InteractionMode = 'idle' | 'exploring' | 'focused' | 'transitioning';

export interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface InteractionLock {
  locked: boolean;
  reason?: string;
  timestamp?: number;
}

// 3D and Camera Types
export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// Content Types
export interface SegmentCopy {
  id: string;
  heading: string;
  subheading?: string;
  body: string;
  cta?: CTA;
  metadata?: Record<string, unknown>;
}

export interface CTA {
  text: string;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface StorySegment {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  order: number;
  theme?: 'dark' | 'light';
  duration?: number;
  cameraTarget?: CameraPosition;
  cameraPosition?: CameraPosition;
}

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
  media?: Media[];
  year?: number;
  client?: string;
}

export interface Media {
  type: 'image' | 'video';
  src: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  target?: '_blank' | '_self';
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface TransitionConfig {
  duration: number;
  ease: string;
}

// Component Props Types
export interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface CanvasProps {
  children?: React.ReactNode;
}

export interface HTMLOverlayProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ProviderProps {
  children: React.ReactNode;
}

// API Response Types (for future CMS integration)
export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
