import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.55;
const DEPTH = 0.65;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const SIM800L_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'TXD', 'RXD', 'RST', 'NET'],
  -0.2,
  0.2,
  -DEPTH / 2 + 0.04,
  TOP + 0.02,
);

export default function Sim800lModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Main GSM chip */}
      <mesh position={[0, TOP + 0.03, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.06, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* SIM card slot on underside */}
      <mesh position={[0, -0.01, -0.15]} castShadow>
        <boxGeometry args={[0.28, 0.02, 0.2]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Antenna connector */}
      <mesh position={[0.2, TOP + 0.06, DEPTH / 2 - 0.05]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
