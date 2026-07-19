export type Difficulty = 'Beginner' | 'Beginner-Intermediate' | 'Intermediate' | 'Advanced';

export type PinCategory = 'power' | 'digital' | 'analog' | 'communication' | 'special';

export interface Pin {
  name: string;
  position: [number, number, number] | null;
  category: PinCategory;
  function: string;
  voltageRange: string;
  currentLimit: string;
  alternateFunctions: string[];
  gotcha: string | null;
}

export interface UseCase {
  title: string;
  scenario: string;
  pinsInvolved: string[];
  difficulty: string;
}

export interface RelatedComponents {
  commonlyPairedWith: string[];
  oftenConfusedWith: string[];
  oftenUpgradedTo: string[];
}

export interface ComponentIdentity {
  id: string;
  name: string;
  category: string;
  difficulty: Difficulty;
  image: string | null;
  model3d: string | null;
}

export interface RoboticsComponent {
  identity: ComponentIdentity;
  overview: string;
  /** One-sentence, jargon-free "explain it to a beginner" version of the overview. */
  simpleSummary?: string;
  specifications: Record<string, string | number>;
  pinMap: Pin[];
  useCases: UseCase[];
  relatedComponents: RelatedComponents;
  beginnerMistakes?: string[];
}
