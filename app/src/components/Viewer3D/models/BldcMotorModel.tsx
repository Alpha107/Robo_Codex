const BELL_R = 0.4;
const BELL_H = 0.35;

export const BLDC_MOTOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Phase A': [-0.06, -0.15, 0.62],
  'Phase B': [0, -0.15, 0.62],
  'Phase C': [0.06, -0.15, 0.62],
};

export default function BldcMotorModel() {
  return (
    <group>
      {/* Base/stator housing */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[BELL_R - 0.05, BELL_R - 0.05, 0.12, 32]} />
        <meshStandardMaterial color="#2b2f36" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Bell (rotor housing) */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[BELL_R, BELL_R, BELL_H, 32]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.08 + BELL_H / 2 + 0.01, 0]} castShadow>
        <cylinderGeometry args={[BELL_R - 0.03, BELL_R - 0.03, 0.02, 32]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 0.08 + BELL_H / 2 + 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.35, 12]} />
        <meshStandardMaterial color="#e8e8ec" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Mounting holes on base */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        return (
          <mesh key={i} position={[Math.cos(a) * (BELL_R - 0.12), -0.21, Math.sin(a) * (BELL_R - 0.12)]}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
            <meshStandardMaterial color="#0a0a0c" />
          </mesh>
        );
      })}
      {/* 3 phase wires, exiting the side toward the camera so they aren't
          hidden behind the base when viewed from the default elevated angle */}
      {[-0.06, 0, 0.06].map((x, i) => {
        const colors = ['#e8901f', '#3b3b3b', '#d1342a'];
        return (
          <mesh key={x} position={[x, -0.15, 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color={colors[i]} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
