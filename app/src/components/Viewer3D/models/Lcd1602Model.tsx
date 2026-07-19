import { headerPositions } from './parts';

const WIDTH = 1.4;
const DEPTH = 0.6;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

export const LCD1602_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['GND', 'VCC', 'SDA', 'SCL'],
  -0.5,
  -0.2,
  -DEPTH / 2 - 0.12,
  -TOP - 0.02,
);

export default function Lcd1602Model() {
  return (
    <group>
      {/* PCB frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.5} />
      </mesh>

      {/* Backlit screen */}
      <mesh position={[0, TOP + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[WIDTH - 0.2, DEPTH - 0.15]} />
        <meshStandardMaterial color="#2a6b4a" emissive="#2a6b4a" emissiveIntensity={0.25} />
      </mesh>

      {/* Character grid dots (2 rows x 16 cols, sparse sample for perf) */}
      {Array.from({ length: 2 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.6 + col * 0.077, TOP + 0.006, -0.12 + row * 0.24]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.06, 0.14]} />
            <meshStandardMaterial color="#1a4633" />
          </mesh>
        )),
      )}

      {/* I2C backpack on the back */}
      <mesh position={[-0.35, -0.02, -DEPTH / 2 - 0.06]} castShadow>
        <boxGeometry args={[0.4, 0.14, 0.12]} />
        <meshStandardMaterial color="#1560bd" roughness={0.5} />
      </mesh>
      <mesh position={[-0.35, -0.02, -DEPTH / 2 - 0.13]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>
    </group>
  );
}
