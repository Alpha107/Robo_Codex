const CELL_R = 0.18;
const CELL_LEN = 0.65;

export const HOLDER_18650_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Positive (+)': [0, 0.08, -CELL_LEN / 2 - 0.15],
  'Negative (-)': [0, -0.08, -CELL_LEN / 2 - 0.15],
};

export default function Holder18650Model() {
  return (
    <group>
      {/* Plastic holder shell */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[CELL_R + 0.04, CELL_R + 0.04, CELL_LEN + 0.1, 24, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} side={2} />
      </mesh>

      {/* Cell inside */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[CELL_R, CELL_R, CELL_LEN, 24]} />
        <meshStandardMaterial color="#2e7d32" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[CELL_LEN / 2 + 0.005, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[CELL_R - 0.02, CELL_R - 0.02, 0.01, 24]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Spring contact + tab */}
      <mesh position={[-CELL_LEN / 2 - 0.06, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.08, -CELL_LEN / 2 - 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[0, -0.08, -CELL_LEN / 2 - 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
