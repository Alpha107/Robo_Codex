import type { Difficulty } from './component';

export interface ProjectComponentRef {
  /** Must match a RoboticsComponent identity.id in the catalog. */
  componentId: string;
  quantity: number;
  /** e.g. "front sensor", "steering servo" — how this unit is used in this project. */
  note?: string;
}

export interface WiringStep {
  step: number;
  /** Short imperative instruction, e.g. "Connect Arduino D9 to HC-SR04 TRIG." */
  instruction: string;
  /** Optional "why" — the teaching explanation behind the step. */
  detail?: string;
}

export interface ProjectCode {
  filename: string;
  language: 'arduino' | 'cpp' | 'python';
  source: string;
  /** Line-by-line or block-by-block walkthrough of what the code does. */
  explanation?: string;
}

export interface TroubleshootingItem {
  issue: string;
  fix: string;
}

export interface ProjectIdentity {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: Difficulty;
  estimatedTime: string;
}

/** One placed instance of a project component in the 3D/2D assembly scene. */
export interface AssemblyPlacement {
  /** Must match a components[].componentId in this same project. */
  componentId: string;
  /** 0-based index when componentId's quantity > 1 (e.g. left/right motor). Defaults to 0. */
  instance?: number;
  /** Assembled (non-exploded) position, in the model's shared scene units. */
  position: [number, number, number];
  /** Radians, applied as an XYZ Euler rotation. */
  rotation?: [number, number, number];
  /** Uniform scale multiplier. Defaults to 1. */
  scale?: number;
  /** Overrides the auto-generated label (component name + componentRef note). */
  label?: string;
}

/** A reference to a specific pin on a specific placed component instance. */
export interface AssemblyPin {
  componentId: string;
  instance?: number;
  /** Must match a key in that component's MODEL_REGISTRY pinPositions. */
  pin: string;
}

export interface AssemblyConnection {
  from: AssemblyPin;
  to: AssemblyPin;
  label?: string;
}

export interface ProjectAssembly {
  /** Hand-authored layout. When absent, the viewer falls back to an auto-arranged layout. */
  placements?: AssemblyPlacement[];
  connections: AssemblyConnection[];
}

export interface RoboticsProject {
  identity: ProjectIdentity;
  goal: string;
  /** One-sentence, jargon-free "explain it to a beginner" version of the goal. */
  simpleSummary?: string;
  howItWorks: string;
  /** Physical tools and software needed beyond the listed components, e.g. "Arduino IDE", "Phillips screwdriver". */
  toolsNeeded?: string[];
  components: ProjectComponentRef[];
  /** Raw SVG markup (authored, trusted) for the schematic wiring diagram. */
  circuitDiagramSvg: string;
  circuitDiagramCaption?: string;
  /** Interactive 3D/2D physical assembly: how the components sit together and connect. */
  assembly3D?: ProjectAssembly;
  wiringSteps: WiringStep[];
  code: ProjectCode[];
  expectedBehavior: string;
  troubleshooting: TroubleshootingItem[];
  extensions?: string[];
}
