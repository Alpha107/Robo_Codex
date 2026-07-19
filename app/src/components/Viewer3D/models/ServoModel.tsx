const BODY_W = 0.62;
const BODY_H = 0.85;
const BODY_D = 0.5;
const TOP = BODY_H / 2;

const WIRE_Z = BODY_D / 2 + 0.35;

export const SERVO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Signal (orange/yellow wire)': [-0.12, -0.15, WIRE_Z],
  'VCC (red wire)': [0, -0.15, WIRE_Z],
  'GND (brown/black wire)': [0.12, -0.15, WIRE_Z],
};

export default function ServoModel() {
  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#2f5fa8" roughness={0.45} metalness={0.1} />
      </mesh>

      {/* Mounting flanges */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (BODY_W / 2 + 0.09), -0.05, 0]} castShadow>
          <boxGeometry args={[0.18, 0.08, BODY_D + 0.1]} />
          <meshStandardMaterial color="#3d6fbd" roughness={0.5} />
        </mesh>
      ))}

      {/* Gearbox cap */}
      <mesh position={[0.12, TOP + 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 24]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>

      {/* Servo horn (cross shape) */}
      <group position={[0.12, TOP + 0.09, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 16]} />
          <meshStandardMaterial color="#f2f2f5" roughness={0.35} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.32, 0.03, 0.06]} />
            <meshStandardMaterial color="#f2f2f5" roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Wire bundle */}
      {[-0.12, 0, 0.12].map((x, i) => {
        const colors = ['#e8901f', '#d1342a', '#3b2a1f'];
        return (
          <mesh
            key={x}
            position={[x, -0.15, BODY_D / 2 + 0.18]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.025, 0.025, 0.36, 8]} />
            <meshStandardMaterial color={colors[i]} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
