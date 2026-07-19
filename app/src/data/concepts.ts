import type { RoboticsConcept } from '../types/concept';
import { getComponentById } from './components';
import { getProjectById } from './projects';

const conceptModules = import.meta.glob('./concepts/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>;

const diagramModules = import.meta.glob('./concepts/diagrams/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function diagramFor(conceptId: string): string {
  const match = Object.entries(diagramModules).find(([path]) => path.endsWith(`/${conceptId}.svg`));
  return match?.[1] ?? '';
}

const RAW_CONCEPTS = Object.values(conceptModules).map((m) => m.default) as RoboticsConcept[];

export const concepts: RoboticsConcept[] = RAW_CONCEPTS.sort((a, b) =>
  a.identity.title.localeCompare(b.identity.title),
);

const diagramsById = new Map(concepts.map((c) => [c.identity.id, diagramFor(c.identity.id)]));

export function getConceptDiagram(conceptId: string): string {
  return diagramsById.get(conceptId) ?? '';
}

export function getConceptById(id: string): RoboticsConcept | undefined {
  return concepts.find((c) => c.identity.id === id);
}

export function getConceptCategories(): string[] {
  return Array.from(new Set(concepts.map((c) => c.identity.category)));
}

export function getAdjacentConcepts(id: string): {
  prev: RoboticsConcept | null;
  next: RoboticsConcept | null;
} {
  const index = concepts.findIndex((c) => c.identity.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? concepts[index - 1] : null,
    next: index < concepts.length - 1 ? concepts[index + 1] : null,
  };
}

export function resolveConceptComponents(concept: RoboticsConcept) {
  return (concept.relatedComponents ?? [])
    .map((id) => getComponentById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}

export function resolveConceptProjects(concept: RoboticsConcept) {
  return (concept.relatedProjects ?? [])
    .map((id) => getProjectById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export function resolveConceptConcepts(concept: RoboticsConcept) {
  return (concept.relatedConcepts ?? [])
    .map((id) => getConceptById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}

/** Concepts that reference a given component, for the component page's "Related Concepts" backlink. */
export function getConceptsUsingComponent(componentId: string): RoboticsConcept[] {
  return concepts.filter((c) => (c.relatedComponents ?? []).includes(componentId));
}

/** Concepts that reference a given project, for the project page's "Related Concepts" backlink. */
export function getConceptsUsingProject(projectId: string): RoboticsConcept[] {
  return concepts.filter((c) => (c.relatedProjects ?? []).includes(projectId));
}
