const PULLEY_R = 0.18;
const GAP = 0.9;

export const TIMING_BELT_PULLEY_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Belt Teeth': [0, PULLEY_R + 0.03, GAP / 4],
  'Pulley Bore': [-GAP / 2, 0, 0],
  'Idler Pulley Mount': [GAP / 2, 0, 0],
};

function Pulley({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[PULLEY_R, PULLEY_R, 0.12, 20]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.14, 12]} />
        <meshStandardMaterial color="#0a0a0c" />
      </mesh>
    </group>
  );
}

export default function TimingBeltPulleyModel() {
  return (
    <group>
      <Pulley x={-GAP / 2} />
      <Pulley x={GAP / 2} />

      {/* Belt loop (top and bottom straight runs) */}
      <mesh position={[0, PULLEY_R + 0.02, 0]} castShadow>
        <boxGeometry args={[GAP, 0.04, 0.12]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.6} />
      </mesh>
      <mesh position={[0, -PULLEY_R - 0.02, 0]} castShadow>
        <boxGeometry args={[GAP, 0.04, 0.12]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.6} />
      </mesh>
    </group>
  );
}
