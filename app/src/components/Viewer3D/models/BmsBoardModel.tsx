import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.7;
const DEPTH = 0.35;
const HEIGHT = 0.04;
const TOP = HEIGHT / 2;

export const BMS_BOARD_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['B+', 'B-'], -0.25, -0.12, -DEPTH / 2 + 0.02, TOP + 0.01),
  ...headerPositions(['P+', 'P-'], 0.12, 0.25, -DEPTH / 2 + 0.02, TOP + 0.01),
  'Balance Leads': [0, DEPTH / 2 - 0.02, TOP + 0.01],
};

export default function BmsBoardModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0a0a0c" />

      {/* Protection MOSFETs */}
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, TOP + 0.015, 0.08]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
      ))}

      {/* Balance lead wires */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.2 + i * 0.13, TOP + 0.01, DEPTH / 2 + 0.05]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.008, 0.008, 0.1, 6]} />
          <meshStandardMaterial color={['#d1342a', '#e8901f', '#2ecc71', '#4dabf7'][i]} />
        </mesh>
      ))}
    </group>
  );
}
