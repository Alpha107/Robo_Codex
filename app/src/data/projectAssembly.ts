import type { AssemblyConnection, AssemblyPlacement, ProjectComponentRef, RoboticsProject } from '../types/project';
import type { RoboticsComponent } from '../types/component';
import type { Vec3 } from '../utils/assemblyGeometry';
import { MODEL_REGISTRY } from '../components/Viewer3D/models/registry';
import { getComponentById } from './components';
import { autoArrangeAssembly } from './autoArrangeAssembly';
import { getAssemblyFootprint } from './assemblyFootprints';

export interface ResolvedAssemblyPart {
  key: string;
  componentId: string;
  instance: number;
  component: RoboticsComponent | undefined;
  ref: ProjectComponentRef | undefined;
  placement: AssemblyPlacement;
  name: string;
  qtyLabel: string;
  note: string | undefined;
  label: string;
  pinPositions: Record<string, Vec3>;
}

export interface ResolvedAssembly {
  parts: ResolvedAssemblyPart[];
  connections: AssemblyConnection[];
  centroid: Vec3;
}

export function assemblyPartKey(componentId: string, instance = 0): string {
  return `${componentId}#${instance}`;
}

export function getProjectAssembly(project: RoboticsProject): ResolvedAssembly {
  const placements = project.assembly3D?.placements ?? autoArrangeAssembly(project);
  const connections = project.assembly3D?.connections ?? [];

  const refByComponentId = new Map(project.components.map((ref) => [ref.componentId, ref]));

  const parts: ResolvedAssemblyPart[] = placements.map((rawPlacement) => {
    const instance = rawPlacement.instance ?? 0;
    const ref = refByComponentId.get(rawPlacement.componentId);
    const component = getComponentById(rawPlacement.componentId);
    const name = component?.identity.name ?? rawPlacement.componentId;
    const qtyLabel = ref && ref.quantity > 1 ? ` ×${ref.quantity}` : '';
    const instanceSuffix = ref && ref.quantity > 1 && ref.quantity <= 6 ? ` #${instance + 1}` : '';
    const label = rawPlacement.label ?? `${name}${instanceSuffix || qtyLabel}`;

    // Every model was authored at its own arbitrary internal scale (see
    // assemblyFootprints.ts) — bake the real-world-proportion correction in
    // here so every consumer (3D render, wiring lines, 2D projection) sees a
    // single already-normalized scale, on top of any deliberate per-placement override.
    const normalizedScale = getAssemblyFootprint(rawPlacement.componentId).scale;
    const placement: AssemblyPlacement = {
      ...rawPlacement,
      scale: (rawPlacement.scale ?? 1) * normalizedScale,
    };

    return {
      key: assemblyPartKey(placement.componentId, instance),
      componentId: placement.componentId,
      instance,
      component,
      ref,
      placement,
      name,
      qtyLabel,
      note: ref?.note,
      label,
      pinPositions: MODEL_REGISTRY[placement.componentId]?.pinPositions ?? {},
    };
  });

  const centroid: Vec3 =
    parts.length === 0
      ? [0, 0, 0]
      : parts
          .reduce<Vec3>(
            (sum, p) => [sum[0] + p.placement.position[0], sum[1] + p.placement.position[1], sum[2] + p.placement.position[2]],
            [0, 0, 0],
          )
          .map((v) => v / parts.length) as Vec3;

  return { parts, connections, centroid };
}

