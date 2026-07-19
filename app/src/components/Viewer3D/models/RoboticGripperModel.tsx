// Robotic Gripper (2-finger parallel jaw): a mounting-flange block, a small
// actuator housing, and two rectangular finger prongs extending forward with a
// visible gap between them (open position). The gap is the single most important
// visual feature here.

const FLANGE_SIZE: [number, number, number] = [0.6, 0.6, 0.3];
const FLANGE_Z = -0.35;

const ACTUATOR_SIZE: [number, number, number] = [0.55, 0.35, 0.35];
const ACTUATOR_Z = 0.075;

const FINGER_SIZE: [number, number, number] = [0.16, 0.45, 0.75];
const FINGER_X = 0.22;
const FINGER_Z = 0.6;

const FINGER_PAD_SIZE: [number, number, number] = [0.16, 0.12, 0.1];

export const ROBOTIC_GRIPPER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Mounting Flange': [0, 0, FLANGE_Z - FLANGE_SIZE[2] / 2 - 0.1],
  'Finger Mount (Left)': [-FINGER_X, 0, FINGER_Z - FINGER_SIZE[2] / 2],
  'Finger Mount (Right)': [FINGER_X, 0, FINGER_Z - FINGER_SIZE[2] / 2],
  Signal: [ACTUATOR_SIZE[0] / 2 + 0.12, 0.09, ACTUATOR_Z],
  VCC: [ACTUATOR_SIZE[0] / 2 + 0.12, 0, ACTUATOR_Z],
  GND: [ACTUATOR_SIZE[0] / 2 + 0.12, -0.09, ACTUATOR_Z],
};

export default function RoboticGripperModel() {
  return (
    <group>
      {/* Mounting flange (attaches to robot wrist) */}
      <mesh position={[0, 0, FLANGE_Z]} castShadow receiveShadow>
        <boxGeometry args={FLANGE_SIZE} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Flange bolt circle (4 corner bolts) */}
      {[
        [-0.22, -0.22],
        [0.22, -0.22],
        [-0.22, 0.22],
        [0.22, 0.22],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, FLANGE_Z - FLANGE_SIZE[2] / 2 - 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 12]} />
          <meshStandardMaterial color="#111318" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {/* Actuator housing (rack-and-pinion mechanism) */}
      <mesh position={[0, 0, ACTUATOR_Z]} castShadow>
        <boxGeometry args={ACTUATOR_SIZE} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* Signal/power connector cluster on the side of the actuator housing */}
      {[0.09, 0, -0.09].map((y, i) => (
        <mesh key={i} position={[ACTUATOR_SIZE[0] / 2 + 0.05, y, ACTUATOR_Z]} castShadow>
          <boxGeometry args={[0.1, 0.04, 0.04]} />
          <meshStandardMaterial color={i === 0 ? '#d97706' : i === 1 ? '#dc2626' : '#111318'} />
        </mesh>
      ))}

      {/* Left finger */}
      <group>
        <mesh position={[-FINGER_X, 0, FINGER_Z]} castShadow>
          <boxGeometry args={FINGER_SIZE} />
          <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Fingertip pad (inner face, facing the gap) */}
        <mesh
          position={[-FINGER_X + FINGER_SIZE[0] / 2 - FINGER_PAD_SIZE[0] / 2 + 0.02, 0, FINGER_Z + 0.2]}
          castShadow
        >
          <boxGeometry args={FINGER_PAD_SIZE} />
          <meshStandardMaterial color="#111318" roughness={0.8} />
        </mesh>
      </group>

      {/* Right finger (mirrored, gap visible between the two) */}
      <group>
        <mesh position={[FINGER_X, 0, FINGER_Z]} castShadow>
          <boxGeometry args={FINGER_SIZE} />
          <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh
          position={[FINGER_X - FINGER_SIZE[0] / 2 + FINGER_PAD_SIZE[0] / 2 - 0.02, 0, FINGER_Z + 0.2]}
          castShadow
        >
          <boxGeometry args={FINGER_PAD_SIZE} />
          <meshStandardMaterial color="#111318" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
