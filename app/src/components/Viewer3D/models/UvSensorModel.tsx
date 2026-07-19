import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.42;
const DEPTH = 0.3;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const UV_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'OUT', 'EN', '3V3'],
  -0.16,
  0.16,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function UvSensorModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1f6b5c" />

      {/* UV photodiode sensing element — small dark violet lens/window */}
      <mesh position={[0, TOP + 0.02, 0.06]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 20]} />
        <meshStandardMaterial color="#241041" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, TOP + 0.041, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.045, 20]} />
        <meshStandardMaterial
          color="#5a2fb0"
          emissive="#5a2fb0"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}
