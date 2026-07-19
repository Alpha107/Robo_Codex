import { PcbBoard, UsbConnector, headerPositions, Led } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.35;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const TP4056_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['B+', 'B-'], -0.06, 0.06, -DEPTH / 2 + 0.03, TOP + 0.02),
  ...headerPositions(['OUT+', 'OUT-'], -0.06, 0.06, DEPTH / 2 - 0.03, TOP + 0.02),
  'IN+ (USB)': [-0.18, 0.05, 0],
  'IN-': [-0.18, -0.05, 0],
};

export default function Tp4056Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      <UsbConnector position={[-WIDTH / 2 - 0.06, 0.05, 0]} type="microB" rotation={[0, Math.PI / 2, 0]} />

      {/* TP4056 chip */}
      <mesh position={[0.05, TOP + 0.01, 0]} castShadow>
        <boxGeometry args={[0.1, 0.02, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      <Led position={[0.15, TOP + 0.005, -0.1]} color="#d1342a" />
      <Led position={[0.15, TOP + 0.005, 0.1]} color="#2ecc71" />
    </group>
  );
}
