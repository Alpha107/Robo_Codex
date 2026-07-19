const BODY_W = 0.3;
const BODY_H = 0.2;
const BODY_D = 0.16;

export const LIMIT_SWITCH_PIN_POSITIONS: Record<string, [number, number, number]> = {
  COM: [-BODY_W / 2 - 0.13, 0.06, 0],
  NO: [-BODY_W / 2 - 0.13, 0, 0],
  NC: [-BODY_W / 2 - 0.13, -0.06, 0],
};

export default function LimitSwitchModel() {
  return (
    <group>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.5} />
      </mesh>

      {/* Lever arm */}
      <mesh position={[BODY_W / 2 + 0.15, 0.06, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.3, 0.015, 0.04]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Roller at lever tip */}
      <mesh position={[BODY_W / 2 + 0.3, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* 3 terminals */}
      {[0.06, 0, -0.06].map((y) => (
        <mesh key={y} position={[-BODY_W / 2 - 0.03, y, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
