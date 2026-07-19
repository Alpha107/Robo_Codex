const W = 0.5;
const H = 0.9;
const D = 0.15;
const TOP = H / 2;

export const MULTIMETER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'COM Port': [-0.1, -TOP + 0.15, D / 2],
  'V/Ω/mA Port': [0.1, -TOP + 0.15, D / 2],
  'Mode Selector Dial': [0, 0.05, D / 2],
};

export default function MultimeterModel() {
  return (
    <group>
      {/* Yellow body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#f0c419" roughness={0.5} />
      </mesh>

      {/* LCD screen */}
      <mesh position={[0, TOP - 0.2, D / 2 + 0.001]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.32, 0.18]} />
        <meshStandardMaterial color="#2a4a2a" emissive="#4a7a4a" emissiveIntensity={0.3} />
      </mesh>

      {/* Rotary dial */}
      <mesh position={[0, 0.05, D / 2 + 0.02]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[0.05, 0.15, D / 2 + 0.045]}>
        <boxGeometry args={[0.02, 0.04, 0.01]} />
        <meshStandardMaterial color="#e8e8ec" />
      </mesh>

      {/* Probe ports */}
      <mesh position={[-0.1, -TOP + 0.15, D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.1, -TOP + 0.15, D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Probes (red and black leads) */}
      <mesh position={[-0.1, -TOP - 0.15, D / 2 + 0.15]} rotation={[Math.PI / 2.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.1, -TOP - 0.15, D / 2 + 0.15]} rotation={[Math.PI / 2.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
    </group>
  );
}
