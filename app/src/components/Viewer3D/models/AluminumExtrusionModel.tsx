const LEN = 1.2;
const SIZE = 0.2;

export const ALUMINUM_EXTRUSION_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'T-Slot Channel': [0, SIZE / 2, 0],
  'Corner Bracket Mount': [-LEN / 2, 0, 0],
  'End Tap Point': [LEN / 2, 0, 0],
};

export default function AluminumExtrusionModel() {
  return (
    <group>
      {/* Main extrusion bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <boxGeometry args={[SIZE, LEN, SIZE]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* T-slot grooves (4 sides) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[(i * Math.PI) / 2, 0, Math.PI / 2]}
        >
          <boxGeometry args={[0.05, LEN + 0.01, SIZE + 0.002]} />
          <meshStandardMaterial color="#5a5f66" />
        </mesh>
      ))}

      {/* Corner bracket at one end */}
      <mesh position={[-LEN / 2 - 0.1, -0.1, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.15]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-LEN / 2 - 0.05, -0.15, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.15]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
