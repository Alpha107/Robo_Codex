const R = 0.22;
const H = 0.15;

export const BUZZER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Positive (+)': [-0.06, -H / 2 + 0.02, 0.5],
  'Negative (-)': [0.06, -H / 2 + 0.02, 0.5],
};

export default function BuzzerModel() {
  return (
    <group>
      {/* Cylindrical body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[R, R, H, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      {/* Top sound-hole grille */}
      <mesh position={[0, H / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R - 0.03, 32]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, H / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.05, 24]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Two legs, bent outward toward the camera so they clear the body's silhouette */}
      <mesh position={[-0.06, -H / 2 + 0.02, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.06, -H / 2 + 0.02, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
