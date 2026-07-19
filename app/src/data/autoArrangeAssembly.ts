import type { AssemblyPlacement, RoboticsProject } from '../types/project';
import { getAssemblyFootprint } from './assemblyFootprints';

// Components authored by count (how many jumper wires, how many resistors),
// not by distinct physical placement — there's no single sensible place to
// put "12 jumper wires" as one object, so they're left out of the 3D/2D
// assembly entirely (they still appear in the Components Required list).
const SKIP_IDS = new Set(['jumper-wires', 'basic-passives']);

// Preferred "main board" component ids, used to pick what the rest of the
// build gets arranged around when a project has no hand-authored layout.
const BASE_PRIORITY = ['robot-chassis-kit', 'arduino-uno-r3', 'esp32-devkit', 'arduino-mega-2560'];

function pickBaseIndex(componentIds: string[]): number {
  for (const id of BASE_PRIORITY) {
    const i = componentIds.indexOf(id);
    if (i !== -1) return i;
  }
  return 0;
}

/**
 * Generic fallback layout: places the project's main board at the origin and
 * rings the remaining components around it, each resting on its own
 * `groundOffset`. Used whenever a project has no hand-authored
 * `assembly3D.placements` — every project gets a readable, non-overlapping,
 * fully interactive assembly even without bespoke coordinates.
 */
export function autoArrangeAssembly(project: RoboticsProject): AssemblyPlacement[] {
  type Instance = { componentId: string; instance: number; quantity: number };
  const instances: Instance[] = [];
  for (const ref of project.components) {
    if (SKIP_IDS.has(ref.componentId)) continue;
    for (let i = 0; i < ref.quantity; i++) {
      instances.push({ componentId: ref.componentId, instance: i, quantity: ref.quantity });
    }
  }
  if (instances.length === 0) return [];

  const baseIndex = pickBaseIndex(instances.map((i) => i.componentId));
  const base = instances[baseIndex];
  const rest = instances.filter((_, i) => i !== baseIndex);

  const baseFootprint = getAssemblyFootprint(base.componentId);
  const placements: AssemblyPlacement[] = [
    { componentId: base.componentId, instance: base.instance, position: [0, baseFootprint.groundOffset, 0] },
  ];

  if (rest.length === 0) return placements;

  const restFootprints = rest.map((item) => getAssemblyFootprint(item.componentId));
  // Wide enough to clear the base, and wide enough that neighboring ring
  // items (each ~2*radius wide, plus a gap) don't overlap each other either.
  const neededCircumference = restFootprints.reduce((sum, f) => sum + f.radius * 2.6, 0);
  const ringRadius = Math.max(baseFootprint.radius + 0.4, neededCircumference / (2 * Math.PI));

  rest.forEach((item, i) => {
    const footprint = restFootprints[i];
    const angle = (i / rest.length) * Math.PI * 2;
    const x = Math.cos(angle) * ringRadius;
    const z = Math.sin(angle) * ringRadius;
    placements.push({
      componentId: item.componentId,
      instance: item.instance,
      position: [x, footprint.groundOffset, z],
      rotation: [0, -angle + Math.PI / 2, 0],
    });
  });

  return placements;
}
