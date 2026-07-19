export const LDR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Terminal 1': [-0.06, -0.18, 0],
  'Terminal 2': [0.06, -0.18, 0],
};

export default function LdrModel() {
  return (
    <group>
      {/* Disc body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#2b2f22" roughness={0.5} />
      </mesh>
      {/* Zig-zag resistive track (approximated with rings) */}
      {[0.13, 0.09, 0.05].map((r, i) => (
        <mesh key={i} position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.008, r, 32]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Two legs */}
      <mesh position={[-0.06, -0.09, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.06, -0.09, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
