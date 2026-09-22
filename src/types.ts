export interface ProjectItem {
  id: string;
  title: string;
  category: 'webgl' | 'web' | 'design';
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  gradient: string;
  badge: string;
  features: string[];
  demoType: 'showroom' | 'game' | 'visualizer' | 'concept';
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillItem {
  title: string;
  category: string;
  iconName: 'box' | 'code' | 'palette' | 'cpu' | 'layers' | 'sparkles';
  description: string;
  tools: string[];
  proficiency: number;
}

export type SceneGeometryShape =
  | 'torusknot'
  | 'icosahedron'
  | 'torus'
  | 'octahedron'
  | 'dodecahedron'
  | 'sphere'
  | 'diamond'
  | 'star';

export type ColorScheme = 'cyan' | 'purple' | 'emerald' | 'amber';

export interface Scene3DConfig {
  shape: SceneGeometryShape;
  wireframe: boolean;
  speed: number;
  particlesDensity: number;
  colorScheme: ColorScheme;
}
