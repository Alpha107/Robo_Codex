const BODY_W = 0.6;
const BODY_H = 0.45;
const BODY_D = 0.35;
const TOP = BODY_H / 2;

export const SHARP_GP2Y0A21_PIN_POSITIONS: Record<string, [number, number, number]> = {
  VCC: [0.08, 0.3, -BODY_D / 2 - 0.19],
  GND: [0, 0.3, -BODY_D / 2 - 0.19],
  Vo: [-0.08, 0.3, -BODY_D / 2 - 0.19],
};

export default function SharpGp2y0a21Model() {
  return (
    <group>
      {/* Main plastic case */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.5} />
      </mesh>

      {/* Emitter + receiver lenses on front face */}
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, 0.05, BODY_D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.03, 20]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.25} />
        </mesh>
      ))}

      {/* Connector cable stub at back */}
      <mesh position={[0, -0.05, -BODY_D / 2 - 0.08]} castShadow>
        <boxGeometry args={[0.24, 0.14, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>

      {/* Mounting tab */}
      <mesh position={[0, -TOP - 0.02, 0]} castShadow>
        <boxGeometry args={[BODY_W - 0.1, 0.04, BODY_D - 0.05]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.5} />
      </mesh>
    </group>
  );
}
