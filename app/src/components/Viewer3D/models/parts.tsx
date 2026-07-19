// Shared "kit of parts" for stylized component models. Keeps every board
// visually distinct (real proportions, real connector types, real chip
// placement) without re-deriving primitive geometry from scratch each time.

export function evenSpread(count: number, from: number, to: number): number[] {
  if (count === 1) return [(from + to) / 2];
  const step = (to - from) / (count - 1);
  return Array.from({ length: count }, (_, i) => from + step * i);
}

/** Builds a name -> [x,y,z] map for a row of evenly spaced pins. */
export function headerPositions(
  names: string[],
  from: number,
  to: number,
  z: number,
  y: number,
): Record<string, [number, number, number]> {
  const xs = evenSpread(names.length, from, to);
  const result: Record<string, [number, number, number]> = {};
  names.forEach((name, i) => {
    result[name] = [xs[i], y, z];
  });
  return result;
}

/** Same as headerPositions but spread along Z (for a header on a side edge). */
export function headerPositionsZ(
  names: string[],
  from: number,
  to: number,
  x: number,
  y: number,
): Record<string, [number, number, number]> {
  const zs = evenSpread(names.length, from, to);
  const result: Record<string, [number, number, number]> = {};
  names.forEach((name, i) => {
    result[name] = [x, y, zs[i]];
  });
  return result;
}

interface Vec3Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function PcbBoard({
  width,
  depth,
  height = 0.12,
  color = '#0b6e77',
}: {
  width: number;
  depth: number;
  height?: number;
  color?: string;
}) {
  return (
    <mesh receiveShadow castShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.15} />
    </mesh>
  );
}

export function HeaderStrip({
  position,
  length,
  height = 0.12,
  thickness = 0.16,
  rotation = [0, 0, 0],
  color = '#2b2f38',
}: Vec3Props & { length: number; height?: number; thickness?: number; color?: string }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  );
}

const USB_SIZES: Record<string, [number, number, number]> = {
  B: [0.32, 0.32, 0.4],
  miniB: [0.24, 0.15, 0.26],
  microB: [0.2, 0.1, 0.22],
  C: [0.22, 0.09, 0.26],
};

export function UsbConnector({
  position,
  rotation = [0, 0, 0],
  type = 'B',
}: Vec3Props & { type?: keyof typeof USB_SIZES }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={USB_SIZES[type]} />
      <meshStandardMaterial color="#c7ccd1" roughness={0.35} metalness={0.7} />
    </mesh>
  );
}

export function BarrelJack({ position, rotation = [0, 0, Math.PI / 2] }: Vec3Props) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[0.22, 0.22, 0.3, 20]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
    </mesh>
  );
}

export function DipChip({
  position,
  size = [0.62, 0.06, 0.32],
  color = '#15161a',
  notch = true,
}: Vec3Props & { size?: [number, number, number]; color?: string; notch?: boolean }) {
  const pos = position ?? [0, 0, 0];
  return (
    <group>
      <mesh position={pos} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {notch && (
        <mesh position={[pos[0] - size[0] / 2 + 0.05, pos[1] + size[1] / 2 + 0.002, pos[2]]}>
          <circleGeometry args={[0.025, 12]} />
          <meshStandardMaterial color="#8a8f99" />
        </mesh>
      )}
    </group>
  );
}

export function MetalCanModule({
  position,
  size = [0.5, 0.16, 0.4],
}: Vec3Props & { size?: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#9a9a9a" metalness={0.7} roughness={0.35} />
    </mesh>
  );
}

export function Crystal({
  position,
  size = [0.16, 0.09, 0.09],
}: Vec3Props & { size?: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#b8bcc2" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

export function TactileButton({
  position,
  color = '#d0433e',
  radius = 0.09,
  height = 0.06,
}: Vec3Props & { color?: string; radius?: number; height?: number }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, height, 16]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

export function Led({
  position,
  color = '#ff9f43',
  size = [0.05, 0.03, 0.03],
}: Vec3Props & { color?: string; size?: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  );
}

export function MountingHole({ position, radius = 0.06 }: Vec3Props & { radius?: number }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.6, radius, 20]} />
      <meshStandardMaterial color="#05050a" />
    </mesh>
  );
}
