export type Vec3 = [number, number, number];

export interface Placed {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}

/**
 * Approximates THREE's default 'XYZ' Euler order (rotate around X, then Y,
 * then Z). Good enough for assembly pin/line endpoints and the 2D top-down
 * projection — most placements only use a single axis (facing direction, or
 * a wheel tipped onto its side), where axis-composition order doesn't matter.
 */
export function rotatePoint(point: Vec3, rotation: Vec3): Vec3 {
  const [rx, ry, rz] = rotation;
  let [x, y, z] = point;

  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];

  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];

  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  [x, y] = [x * cz - y * sz, x * sz + y * cz];

  return [x, y, z];
}

/** Local-space point on a placed model -> world-space point in the assembly scene. */
export function resolveWorldPoint(placement: Placed, localPoint: Vec3): Vec3 {
  const scale = placement.scale ?? 1;
  const scaled: Vec3 = [localPoint[0] * scale, localPoint[1] * scale, localPoint[2] * scale];
  const rotated = placement.rotation ? rotatePoint(scaled, placement.rotation) : scaled;
  return [
    rotated[0] + placement.position[0],
    rotated[1] + placement.position[1],
    rotated[2] + placement.position[2],
  ];
}
