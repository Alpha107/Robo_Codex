import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.35;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;

export const CAPACITIVE_TOUCH_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'OUT'],
  -0.14,
  0.14,
  -DEPTH / 2 - 0.1,
  -TOP - 0.02,
);

export default function CapacitiveTouchSensorModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0b6e77" />

      {/* Round capacitive touch pad on top */}
      <mesh position={[0, TOP + 0.004, 0.04]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 24]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, TOP + 0.006, 0.04]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.1, 24]} />
        <meshStandardMaterial color="#8a6a10" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Small solder jumper pads near the back edge (momentary/toggle mode select) */}
      <mesh position={[-0.15, TOP + 0.004, -0.11]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, 0.025]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Small onboard LED indicator */}
      <mesh position={[0.16, TOP + 0.02, -0.1]}>
        <boxGeometry args={[0.035, 0.025, 0.025]} />
        <meshStandardMaterial color="#3ddc5a" emissive="#3ddc5a" emissiveIntensity={0.7} />
      </mesh>

      {/* 3-pin header (VCC, GND, OUT) on the back edge */}
      <mesh position={[0, -TOP - 0.005, -DEPTH / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.08, 0.1]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
