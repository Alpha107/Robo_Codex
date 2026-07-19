import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.55;
const DEPTH = 0.55;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const JOYSTICK_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'VRx', 'VRy', 'SW'],
  -0.18,
  0.18,
  -DEPTH / 2 + 0.04,
  TOP + 0.02,
);

export default function JoystickModuleModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Gimbal housing */}
      <mesh position={[0, TOP + 0.05, 0.02]} castShadow>
        <boxGeometry args={[0.32, 0.1, 0.32]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>

      {/* Stick shaft (angled) */}
      <mesh position={[0.03, TOP + 0.2, 0.05]} rotation={[0.15, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.25, 12]} />
        <meshStandardMaterial color="#3a4046" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Ball cap */}
      <mesh position={[0.06, TOP + 0.33, 0.07]} castShadow>
        <sphereGeometry args={[0.08, 20, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
    </group>
  );
}
