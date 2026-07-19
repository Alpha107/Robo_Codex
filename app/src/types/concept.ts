export type ConceptCategory =
  | 'Control Theory'
  | 'Kinematics & Dynamics'
  | 'Sensing, Estimation & Perception'
  | 'Motion Planning & Navigation'
  | 'AI & Machine Learning'
  | 'Software & Systems'
  | 'Actuation Foundations';

export type ConceptLevel = 'Foundational' | 'Intermediate' | 'Advanced';

export interface ConceptIdentity {
  id: string;
  title: string;
  category: ConceptCategory;
  level: ConceptLevel;
  tagline: string;
}

export interface ConceptEquation {
  label: string;
  expression: string;
  meaning: string;
}

export interface RoboticsConcept {
  identity: ConceptIdentity;
  simpleSummary: string;
  keyIdea: string;
  overview: string;
  equations?: ConceptEquation[];
  howItWorks: string;
  realWorldExamples: string[];
  commonMisconceptions?: string[];
  diagramCaption?: string;
  relatedComponents?: string[];
  relatedProjects?: string[];
  relatedConcepts?: string[];
}
