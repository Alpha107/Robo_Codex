// Placeholder hotspot geometry, used until real 3D models with authored pin
// coordinates exist (see content-pilot/README.md, Phase 1 asset production).
// Pins are spaced evenly around the perimeter of a stand-in board footprint
// so every pin gets a distinct, clickable position in 3D space.

export interface BoardFootprint {
  width: number;
  depth: number;
  height: number;
}

const FOOTPRINTS: Record<string, BoardFootprint> = {
  'arduino-uno-r3': { width: 2.7, depth: 2.1, height: 0.15 },
  'hc-sr04': { width: 1.8, depth: 0.8, height: 0.15 },
  'sg90-servo': { width: 0.9, depth: 1.2, height: 0.5 },
};

const DEFAULT_FOOTPRINT: BoardFootprint = { width: 2, depth: 1.4, height: 0.2 };

export function getBoardFootprint(componentId: string): BoardFootprint {
  return FOOTPRINTS[componentId] ?? DEFAULT_FOOTPRINT;
}

export function perimeterPositions(
  count: number,
  footprint: BoardFootprint,
): [number, number, number][] {
  const { width, depth, height } = footprint;
  const perimeter = 2 * (width + depth);
  const y = height / 2 + 0.05;
  const positions: [number, number, number][] = [];

  for (let i = 0; i < count; i++) {
    const t = (i / count) * perimeter;
    let x: number;
    let z: number;

    if (t < width) {
      x = -width / 2 + t;
      z = depth / 2;
    } else if (t < width + depth) {
      x = width / 2;
      z = depth / 2 - (t - width);
    } else if (t < 2 * width + depth) {
      x = width / 2 - (t - width - depth);
      z = -depth / 2;
    } else {
      x = -width / 2;
      z = -depth / 2 + (t - 2 * width - depth);
    }

    positions.push([x, y, z]);
  }

  return positions;
}
