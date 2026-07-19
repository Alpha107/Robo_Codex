import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.55;
const DEPTH = 0.85;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.06;

const pins = ['5V', 'GND', 'U0R (RX)', 'U0T (TX)', 'GPIO0', 'GPIO4', 'GPIO12', 'GPIO13', 'RESET'];

export const ESP32_CAM_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  pins,
  -0.2,
  0.2,
  DEPTH / 2 - 0.05,
  PIN_Y,
);

export default function Esp32CamModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0b6e77" />

      {/* Header housing */}
      <mesh position={[0, TOP + 0.03, DEPTH / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.45, 0.06, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Camera module + lens */}
      <mesh position={[0, TOP + 0.05, -0.15]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      <mesh position={[0, TOP + 0.13, -0.15]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.12, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.35} />
      </mesh>
      <mesh position={[0, TOP + 0.2, -0.15]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 20]} />
        <meshStandardMaterial color="#0a1a2e" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* microSD slot */}
      <mesh position={[0, -0.01, DEPTH / 2 + 0.02]} castShadow>
        <boxGeometry args={[0.28, 0.03, 0.18]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Flash LED */}
      <mesh position={[0.18, TOP + 0.01, -0.35]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" emissive="#f5f5f5" emissiveIntensity={0.4} />
      </mesh>

      {/* PCB antenna trace hint at top edge */}
      <mesh position={[0, TOP + 0.001, -DEPTH / 2 + 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.35, 0.08]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
