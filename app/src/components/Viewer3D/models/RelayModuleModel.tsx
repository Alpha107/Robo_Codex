import { PcbBoard, headerPositions, Led } from './parts';

const WIDTH = 0.85;
const DEPTH = 0.5;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const RELAY_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['IN', 'VCC', 'GND'], -0.32, -0.18, -DEPTH / 2 + 0.04, TOP + 0.02),
  COM: [0.25, TOP + 0.15, -DEPTH / 2 + 0.06],
  NO: [0.35, TOP + 0.15, -DEPTH / 2 + 0.06],
  NC: [0.15, TOP + 0.15, -DEPTH / 2 + 0.06],
};

export default function RelayModuleModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* Blue relay cube */}
      <mesh position={[0.2, TOP + 0.1, 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.22, 0.24]} />
        <meshStandardMaterial color="#2255aa" roughness={0.5} />
      </mesh>

      {/* Screw terminal block */}
      <mesh position={[0.25, TOP + 0.06, -DEPTH / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.36, 0.12, 0.1]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Optocoupler chip */}
      <mesh position={[-0.25, TOP + 0.015, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      <Led position={[-0.25, TOP + 0.005, -0.1]} color="#2ecc71" />
    </group>
  );
}
