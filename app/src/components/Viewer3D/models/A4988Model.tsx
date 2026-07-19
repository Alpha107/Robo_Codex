import { PcbBoard, headerPositionsZ } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.65;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

const rowA = ['ENABLE', 'MS1', 'MS2', 'MS3', 'RESET', 'SLEEP', 'STEP', 'DIR'];
const rowB = ['VMOT', 'GND', '2B', '2A', '1A', '1B', 'VDD'];

const LEFT_X = -WIDTH / 2 + 0.02;
const RIGHT_X = WIDTH / 2 - 0.02;

export const A4988_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.05, -DEPTH / 2 + 0.05, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.06, -DEPTH / 2 + 0.06, RIGHT_X, PIN_Y),
};

export default function A4988Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#5b2a86" />

      {/* Driver chip with small heatsink */}
      <mesh position={[0, TOP + 0.04, 0]} castShadow>
        <boxGeometry args={[0.26, 0.08, 0.26]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      <mesh position={[0, TOP + 0.09, 0]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Trimpot */}
      <mesh position={[0.15, TOP + 0.02, -DEPTH / 2 + 0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>
    </group>
  );
}
