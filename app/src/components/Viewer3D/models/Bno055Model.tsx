import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.55;
const DEPTH = 0.45;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const BNO055_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SDA', 'SCL', 'PS0', 'PS1', 'RST', 'INT'],
  -0.21,
  0.21,
  -DEPTH / 2 + 0.03,
  TOP + 0.15,
);

export default function Bno055Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#8e1b3b" />

      {/* Larger chip package (has its own MCU inside) */}
      <mesh position={[0, TOP + 0.025, 0.09]} castShadow>
        <boxGeometry args={[0.22, 0.05, 0.22]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.44, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
