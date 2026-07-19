import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.6;
const DEPTH = 0.6;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const NEO6M_GPS_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'TXD', 'RXD', 'PPS'],
  -0.2,
  0.2,
  -DEPTH / 2 + 0.04,
  TOP + 0.02,
);

export default function Neo6mGpsModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* Ceramic patch antenna */}
      <mesh position={[0, TOP + 0.05, 0.08]} castShadow>
        <boxGeometry args={[0.32, 0.1, 0.32]} />
        <meshStandardMaterial color="#f0ead6" roughness={0.4} />
      </mesh>
      <mesh position={[0, TOP + 0.101, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Backup battery coin cell */}
      <mesh position={[0.18, TOP + 0.02, -0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 20]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* GPS chip */}
      <mesh position={[-0.18, TOP + 0.015, -0.18]} castShadow>
        <boxGeometry args={[0.14, 0.03, 0.14]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
    </group>
  );
}
