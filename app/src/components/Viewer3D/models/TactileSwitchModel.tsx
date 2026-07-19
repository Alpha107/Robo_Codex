const BODY_SIZE = 0.24;
const BODY_H = 0.14;
const TOP = BODY_H / 2;

export const TACTILE_SWITCH_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Pin 1/2 (Side A)': [-0.1, -TOP - 0.06, 0.1],
  'Pin 3/4 (Side B)': [0.1, -TOP - 0.06, 0.1],
};

export default function TactileSwitchModel() {
  return (
    <group>
      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_SIZE, BODY_H, BODY_SIZE]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Center button plunger */}
      <mesh position={[0, TOP + 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 16]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>
      {/* 4 legs */}
      {[
        [-0.1, 0.1],
        [-0.1, -0.1],
        [0.1, 0.1],
        [0.1, -0.1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -TOP - 0.03, z]} castShadow>
          <boxGeometry args={[0.02, 0.06, 0.02]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
