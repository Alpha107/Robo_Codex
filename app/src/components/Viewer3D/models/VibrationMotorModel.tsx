const RADIUS = 0.4;
const THICKNESS = 0.1;
const TOP = THICKNESS / 2;
const LEAD_LEN = 0.45;
const LEAD_R = 0.018;
const LEAD_Z_PLUS = 0.08;
const LEAD_Z_MINUS = -0.08;

export const VIBRATION_MOTOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Motor+': [-RADIUS - LEAD_LEN, 0, LEAD_Z_PLUS],
  'Motor-': [-RADIUS - LEAD_LEN, 0, LEAD_Z_MINUS],
};

export default function VibrationMotorModel() {
  return (
    <group>
      {/* Coin/pancake motor body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[RADIUS, RADIUS, THICKNESS, 28]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Metal top-disc detail */}
      <mesh position={[0, TOP + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[RADIUS - 0.04, 28]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Off-center eccentric weight bump */}
      <mesh position={[0.18, TOP + 0.045, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.09, 20]} />
        <meshStandardMaterial color="#4a4e55" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Thin wire leads */}
      <mesh position={[-RADIUS - LEAD_LEN / 2, 0, LEAD_Z_PLUS]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[LEAD_R, LEAD_R, LEAD_LEN, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[-RADIUS - LEAD_LEN / 2, 0, LEAD_Z_MINUS]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[LEAD_R, LEAD_R, LEAD_LEN, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
