import { PcbBoard, headerPositionsZ } from './parts';

const WIDTH = 0.6;
const DEPTH = 0.6;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

const pins = ['3.3V', 'GND', 'SIOC', 'SIOD', 'VSYNC', 'HREF', 'PCLK', 'D0-D7', 'RESET', 'PWDN'];

export const OV7670_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositionsZ(
  pins,
  DEPTH / 2 - 0.04,
  -DEPTH / 2 + 0.04,
  -WIDTH / 2 + 0.02,
  PIN_Y,
);

export default function Ov7670Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Lens barrel */}
      <mesh position={[0.1, TOP + 0.12, 0.05]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.24, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      <mesh position={[0.1, TOP + 0.25, 0.05]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
        <meshStandardMaterial color="#0a1a2e" roughness={0.15} metalness={0.4} />
      </mesh>
      {/* Sensor die under lens */}
      <mesh position={[0.1, TOP + 0.01, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.22]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
