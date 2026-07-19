import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.45;
const DEPTH = 0.35;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const COLOR_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL', 'SDA', 'INT', 'LED'],
  -0.17,
  0.17,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function ColorSensorModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#7a1f6b" />

      {/* White illumination LED */}
      <mesh position={[-0.09, TOP + 0.02, 0.06]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.3} />
      </mesh>

      {/* Dark sensor "eye" — the RGBC photodiode array behind its IR filter */}
      <mesh position={[0.09, TOP + 0.017, 0.06]} castShadow>
        <boxGeometry args={[0.09, 0.03, 0.07]} />
        <meshStandardMaterial color="#0a0a10" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0.09, TOP + 0.033, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#1c1030" roughness={0.15} metalness={0.6} />
      </mesh>
    </group>
  );
}
