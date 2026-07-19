import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.6;
const DEPTH = 0.4;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const BOOST_CONVERTER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['IN+', 'IN-'], -0.22, -0.1, -DEPTH / 2 + 0.03, TOP + 0.02),
  ...headerPositions(['OUT+', 'OUT-'], 0.1, 0.22, -DEPTH / 2 + 0.03, TOP + 0.02),
};

export default function BoostConverterModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#2e7d32" />

      {/* Shielded inductor can */}
      <mesh position={[-0.1, TOP + 0.05, 0.08]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 20]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* IC chip */}
      <mesh position={[0.12, TOP + 0.015, 0.08]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* Trimpot */}
      <mesh position={[0, TOP + 0.02, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>
    </group>
  );
}
