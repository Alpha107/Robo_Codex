import type { RoboticsProject } from '../types/project';
import { getComponentById } from './components';

const projectModules = import.meta.glob('./projects/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>;

const diagramModules = import.meta.glob('./projects/diagrams/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function diagramFor(projectId: string): string {
  const match = Object.entries(diagramModules).find(([path]) => path.endsWith(`/${projectId}.svg`));
  return match?.[1] ?? '';
}

const RAW_PROJECTS = Object.values(projectModules).map((m) => m.default) as Omit<
  RoboticsProject,
  'circuitDiagramSvg'
>[];

export const projects: RoboticsProject[] = RAW_PROJECTS.map((p) => ({
  ...p,
  circuitDiagramSvg: diagramFor(p.identity.id),
})).sort((a, b) => a.identity.title.localeCompare(b.identity.title));

export function getProjectById(id: string): RoboticsProject | undefined {
  return projects.find((p) => p.identity.id === id);
}

export function getProjectCategories(): string[] {
  return Array.from(new Set(projects.map((p) => p.identity.category))).sort();
}

export function getAdjacentProjects(id: string): {
  prev: RoboticsProject | null;
  next: RoboticsProject | null;
} {
  const index = projects.findIndex((p) => p.identity.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

/** Projects that use a given catalog component, for the component page's "used in" backlink. */
export function getProjectsUsingComponent(componentId: string): RoboticsProject[] {
  return projects.filter((p) => p.components.some((c) => c.componentId === componentId));
}

/** Resolves each project's component refs to real catalog entries, dropping any that don't exist. */
export function resolveProjectComponents(project: RoboticsProject) {
  return project.components
    .map((ref) => ({ ref, component: getComponentById(ref.componentId) }))
    .filter((x): x is { ref: typeof x.ref; component: NonNullable<typeof x.component> } => Boolean(x.component));
}

export interface ProjectTrouble {
  project: RoboticsProject;
  issue: string;
  fix: string;
}

/** Every troubleshooting entry across all projects, for the Common Mistakes hub. */
export function getAllProjectTroubleshooting(): ProjectTrouble[] {
  const out: ProjectTrouble[] = [];
  for (const p of projects) {
    for (const t of p.troubleshooting) {
      out.push({ project: p, issue: t.issue, fix: t.fix });
    }
  }
  return out;
}
