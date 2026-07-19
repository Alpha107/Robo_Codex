import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.9;
const DEPTH = 0.5;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const LM2596_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['IN+', 'IN-'], -0.35, -0.2, -DEPTH / 2 + 0.04, TOP + 0.11),
  ...headerPositions(['OUT+', 'OUT-'], 0.2, 0.35, -DEPTH / 2 + 0.04, TOP + 0.11),
};

export default function Lm2596Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* IC chip */}
      <mesh position={[-0.05, TOP + 0.02, 0.1]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* Toroidal inductor */}
      <mesh position={[0.15, TOP + 0.06, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.1, 0.05, 12, 24]} />
        <meshStandardMaterial color="#2a6b2a" roughness={0.5} />
      </mesh>

      {/* Electrolytic capacitor */}
      <mesh position={[0.32, TOP + 0.06, 0.1]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#1a3a6b" roughness={0.4} />
      </mesh>

      {/* Screw terminal blocks */}
      <mesh position={[-0.3, TOP + 0.05, -DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.1]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
      <mesh position={[0.3, TOP + 0.05, -DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.1]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Trimpot */}
      <mesh position={[0, TOP + 0.02, -0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>
    </group>
  );
}
