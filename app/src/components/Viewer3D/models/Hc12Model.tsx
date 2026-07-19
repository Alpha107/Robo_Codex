import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.3;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const HC12_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'TXD', 'RXD', 'SET'],
  -0.18,
  0.18,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function Hc12Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* RF module can */}
      <mesh position={[-0.1, TOP + 0.025, 0.05]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Wire antenna (helical spring look) */}
      <mesh position={[0.2, TOP + 0.1, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}
