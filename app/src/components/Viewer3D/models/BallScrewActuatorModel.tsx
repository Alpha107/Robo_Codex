const MOTOR_X = -1.3;
const END_L_X = -1.0;
const END_R_X = 1.0;
const ROD_LEN = 1.9;
const CARRIAGE_X = 0.2;

export const BALL_SCREW_ACTUATOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'MOTOR_A+': [MOTOR_X - 0.22, 0.1, 0.1],
  'MOTOR_A-': [MOTOR_X - 0.22, 0.1, -0.1],
  'MOTOR_B+': [MOTOR_X - 0.22, -0.1, 0.1],
  'MOTOR_B-': [MOTOR_X - 0.22, -0.1, -0.1],
  ENCODER_A: [MOTOR_X, 0.25, 0.1],
  ENCODER_B: [MOTOR_X, 0.25, -0.1],
  LIMIT_RETRACT: [END_L_X - 0.02, 0.25, 0.2],
  HOME_SENSOR: [END_L_X - 0.02, 0.25, -0.2],
  SWITCH_COMMON: [END_L_X - 0.02, 0.02, 0],
  LIMIT_EXTEND: [END_R_X + 0.02, 0.25, 0.2],
};

export default function BallScrewActuatorModel() {
  return (
    <group>
      {/* Drive motor (NEMA-style stepper/servo) at one end */}
      <mesh position={[MOTOR_X, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Motor corner mounting tabs */}
      {[
        [0.16, 0.16],
        [0.16, -0.16],
        [-0.16, 0.16],
        [-0.16, -0.16],
      ].map(([y, z], i) => (
        <mesh key={i} position={[MOTOR_X - 0.19, y, z]} castShadow>
          <boxGeometry args={[0.03, 0.06, 0.06]} />
          <meshStandardMaterial color="#111318" roughness={0.6} />
        </mesh>
      ))}
      {/* Motor cable connector block */}
      <mesh position={[MOTOR_X - 0.24, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.22, 0.24]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Left end-bearing block */}
      <mesh position={[END_L_X, 0, 0]} castShadow>
        <boxGeometry args={[0.16, 0.36, 0.36]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* Ball-screw threaded rod */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, ROD_LEN, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.75} roughness={0.3} />
      </mesh>
      {/* Stylized thread ridges along the rod */}
      {[-0.8, -0.55, -0.3, -0.05, 0.5, 0.75].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.045, 0.008, 8, 16]} />
          <meshStandardMaterial color="#a7acb3" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}

      {/* Right end-bearing block */}
      <mesh position={[END_R_X, 0, 0]} castShadow>
        <boxGeometry args={[0.16, 0.36, 0.36]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* Sliding carriage riding on the ball nut */}
      <mesh position={[CARRIAGE_X, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 0.3, 0.3]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
      {/* Carriage mounting plate on top */}
      <mesh position={[CARRIAGE_X, 0.19, 0]} castShadow>
        <boxGeometry args={[0.4, 0.03, 0.24]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} />
      </mesh>

      {/* Limit switch, retract end */}
      <mesh position={[END_L_X, 0.22, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.05]} />
        <meshStandardMaterial color="#d0433e" roughness={0.4} />
      </mesh>
      {/* Home sensor, retract end */}
      <mesh position={[END_L_X, 0.22, -0.2]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.05]} />
        <meshStandardMaterial color="#e8901f" roughness={0.4} />
      </mesh>
      {/* Limit switch, extend end */}
      <mesh position={[END_R_X, 0.22, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.05]} />
        <meshStandardMaterial color="#d0433e" roughness={0.4} />
      </mesh>

      {/* Guide rail supporting the carriage */}
      <mesh position={[0, -0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.06, ROD_LEN, 0.06]} />
        <meshStandardMaterial color="#5a5f66" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
