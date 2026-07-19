import { headerPositions } from './parts';

const WIDTH = 0.9;
const DEPTH = 1.1;
const HEIGHT = 0.02;
const TOP = HEIGHT / 2;

export const MEMBRANE_KEYPAD_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['R1', 'R2', 'R3', 'R4', 'C1', 'C2', 'C3', 'C4'],
  -0.28,
  0.28,
  DEPTH / 2 + 0.15,
  TOP + 0.005,
);

export default function MembraneKeypadModel() {
  return (
    <group>
      {/* Flexible membrane sheet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.6} />
      </mesh>

      {/* 4x4 grid of key labels */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.32 + col * 0.21, TOP + 0.002, -0.42 + row * 0.21]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.15, 0.15]} />
            <meshStandardMaterial color="#2b2f36" />
          </mesh>
        )),
      )}

      {/* Ribbon cable tail */}
      <mesh position={[0, TOP - 0.005, DEPTH / 2 + 0.1]} castShadow>
        <boxGeometry args={[0.5, 0.01, 0.2]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.6} />
      </mesh>
    </group>
  );
}
