const BODY_W = 0.85;
const BODY_H = 1.1;
const BODY_D = 0.62;
const TOP = BODY_H / 2;
const WIRE_Z = BODY_D / 2 + 0.35;

export const MG996R_SERVO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Signal (orange wire)': [-0.14, -0.2, WIRE_Z],
  'VCC (red wire)': [0, -0.2, WIRE_Z],
  'GND (brown/black wire)': [0.14, -0.2, WIRE_Z],
};

export default function Mg996rServoModel() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#1c2733" roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Mounting flanges */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (BODY_W / 2 + 0.11), -0.08, 0]} castShadow>
          <boxGeometry args={[0.22, 0.1, BODY_D + 0.15]} />
          <meshStandardMaterial color="#26323f" roughness={0.5} />
        </mesh>
      ))}

      {/* Gearbox cap */}
      <mesh position={[0.16, TOP + 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 24]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>

      {/* Horn */}
      <group position={[0.16, TOP + 0.12, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.07, 16]} />
          <meshStandardMaterial color="#f2f2f5" roughness={0.35} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0.22, 0, 0]} castShadow>
            <boxGeometry args={[0.38, 0.035, 0.07]} />
            <meshStandardMaterial color="#f2f2f5" roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Wires */}
      {[-0.14, 0, 0.14].map((x, i) => {
        const colors = ['#e8901f', '#d1342a', '#3b2a1f'];
        return (
          <mesh key={x} position={[x, -0.2, BODY_D / 2 + 0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.028, 0.028, 0.36, 8]} />
            <meshStandardMaterial color={colors[i]} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
