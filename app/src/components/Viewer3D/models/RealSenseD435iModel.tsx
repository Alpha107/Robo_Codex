const BODY_W = 1.6;
const BODY_H = 0.42;
const BODY_D = 0.42;
const TOP = BODY_H / 2;

export const REALSENSE_D435I_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'USB-C': [-BODY_W / 2 - 0.06, 0, 0],
};

export default function RealSenseD435iModel() {
  return (
    <group>
      {/* Main bar-shaped body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.45} metalness={0.35} />
      </mesh>

      {/* Front face plate (slightly darker, recessed) */}
      <mesh position={[0, 0, BODY_D / 2 + 0.005]} castShadow>
        <boxGeometry args={[BODY_W - 0.06, BODY_H - 0.06, 0.01]} />
        <meshStandardMaterial color="#0c0d10" roughness={0.5} />
      </mesh>

      {/* Two IR stereo lenses (left/right) — bright chrome bezel so they read against the black body */}
      {[-0.55, 0.55].map((x) => (
        <group key={x} position={[x, 0.02, BODY_D / 2 + 0.02]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
            <meshStandardMaterial color="#8a8f99" roughness={0.25} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0, 0.026]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.065, 20]} />
            <meshStandardMaterial color="#4a90c2" roughness={0.08} metalness={0.3} emissive="#1a3a52" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* RGB lens, offset above/between — bright chrome bezel, warmer glass tint */}
      <group position={[0, 0.14, BODY_D / 2 + 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
          <meshStandardMaterial color="#8a8f99" roughness={0.25} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.021]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 20]} />
          <meshStandardMaterial color="#2e5a8c" roughness={0.08} metalness={0.3} emissive="#12294a" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* IR dot projector, small element between the two IR lenses */}
      <mesh position={[0, -0.02, BODY_D / 2 + 0.015]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.03, 16]} />
        <meshStandardMaterial color="#c0433a" roughness={0.3} metalness={0.5} emissive="#c0433a" emissiveIntensity={0.25} />
      </mesh>

      {/* USB-C connector on the side */}
      <mesh position={[-BODY_W / 2 - 0.03, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.16]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Mounting tab holes (bottom) */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, -TOP - 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.05, 20]} />
          <meshStandardMaterial color="#05050a" />
        </mesh>
      ))}
    </group>
  );
}
