// 6-DOF Robotic Arm Kit: a simplified articulated arm — base cylinder, rotating
// turret, an upper-arm link and forearm link connected at visible joint cylinders
// (angled to read as an elbow bend), ending in a small gripper stub at the tip.
// This is the most complex model in the batch, built to read unmistakably as
// "robot arm" rather than a generic stack of boxes.

const BASE_RADIUS = 0.5;
const BASE_HEIGHT = 0.3;
const BASE_Y = BASE_HEIGHT / 2;

const TURRET_RADIUS = 0.32;
const TURRET_HEIGHT = 0.25;
const TURRET_Y = BASE_HEIGHT + TURRET_HEIGHT / 2;

const SHOULDER_POS: [number, number, number] = [0, 0.55, 0];
// Upper arm reaches up and forward
const UPPER_ARM_VEC: [number, number, number] = [0, 0.8, 0.35];
const UPPER_ARM_LEN = Math.hypot(UPPER_ARM_VEC[1], UPPER_ARM_VEC[2]);
const UPPER_ARM_ANGLE = Math.atan2(UPPER_ARM_VEC[2], UPPER_ARM_VEC[1]);
const ELBOW_POS: [number, number, number] = [
  SHOULDER_POS[0],
  SHOULDER_POS[1] + UPPER_ARM_VEC[1],
  SHOULDER_POS[2] + UPPER_ARM_VEC[2],
];
const UPPER_ARM_MID: [number, number, number] = [
  SHOULDER_POS[0],
  SHOULDER_POS[1] + UPPER_ARM_VEC[1] / 2,
  SHOULDER_POS[2] + UPPER_ARM_VEC[2] / 2,
];

// Forearm bends back slightly relative to the upper arm - visible elbow bend
const FOREARM_VEC: [number, number, number] = [0, 0.5, -0.15];
const FOREARM_LEN = Math.hypot(FOREARM_VEC[1], FOREARM_VEC[2]);
const FOREARM_ANGLE = Math.atan2(FOREARM_VEC[2], FOREARM_VEC[1]);
const WRIST_POS: [number, number, number] = [
  ELBOW_POS[0],
  ELBOW_POS[1] + FOREARM_VEC[1],
  ELBOW_POS[2] + FOREARM_VEC[2],
];
const FOREARM_MID: [number, number, number] = [
  ELBOW_POS[0],
  ELBOW_POS[1] + FOREARM_VEC[1] / 2,
  ELBOW_POS[2] + FOREARM_VEC[2] / 2,
];

const WRIST_HOUSING_POS: [number, number, number] = [WRIST_POS[0], WRIST_POS[1] + 0.12, WRIST_POS[2] + 0.08];
const GRIPPER_BLOCK_POS: [number, number, number] = [WRIST_POS[0], WRIST_POS[1], WRIST_POS[2] + 0.26];
const FINGER_Z = GRIPPER_BLOCK_POS[2] + 0.18;
const FINGER_TIP_Z = FINGER_Z + 0.16;

export const ROBOTIC_ARM_6DOF_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Base Mount': [0, -0.05, 0],
  'Joint 1 Signal (Base Yaw)': [BASE_RADIUS + 0.05, 0.15, 0],
  'Joint 2 Signal (Shoulder Pitch)': [0.3, SHOULDER_POS[1], SHOULDER_POS[2]],
  'Joint 3 Signal (Elbow Pitch)': [0.25, ELBOW_POS[1], ELBOW_POS[2]],
  'Joint 4 Signal (Wrist Roll)': [0.15, WRIST_POS[1], WRIST_POS[2]],
  'Joint 5 Signal (Wrist Pitch)': [0.15, WRIST_HOUSING_POS[1], WRIST_HOUSING_POS[2]],
  'Joint 6 Signal (Wrist Yaw)': [-0.15, WRIST_HOUSING_POS[1], WRIST_HOUSING_POS[2]],
  'Power Input (V+)': [-(BASE_RADIUS + 0.05), 0.15, 0],
  'Power Input (GND)': [-(BASE_RADIUS + 0.05), 0.05, 0],
  'End Effector Mount': [0, WRIST_POS[1], FINGER_TIP_Z],
};

export default function RoboticArm6DofModel() {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, BASE_Y, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[BASE_RADIUS, BASE_RADIUS * 1.08, BASE_HEIGHT, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Rotating turret (base yaw) */}
      <mesh position={[0, TURRET_Y, 0]} castShadow>
        <cylinderGeometry args={[TURRET_RADIUS, TURRET_RADIUS, TURRET_HEIGHT, 32]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* Shoulder joint pivot */}
      <mesh position={SHOULDER_POS} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.5, 20]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Upper arm link (tapered, shoulder -> elbow) */}
      <mesh position={UPPER_ARM_MID} rotation={[UPPER_ARM_ANGLE, 0, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.16, UPPER_ARM_LEN, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Elbow joint pivot */}
      <mesh position={ELBOW_POS} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.45, 20]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Forearm link (tapered, elbow -> wrist) */}
      <mesh position={FOREARM_MID} rotation={[FOREARM_ANGLE, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, FOREARM_LEN, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Wrist roll joint cap */}
      <mesh position={WRIST_POS} rotation={[FOREARM_ANGLE, 0, 0]} castShadow>
        <cylinderGeometry args={[0.095, 0.095, 0.16, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Wrist pitch/yaw housing */}
      <mesh position={WRIST_HOUSING_POS} castShadow>
        <boxGeometry args={[0.2, 0.16, 0.24]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* Gripper mounting block */}
      <mesh position={GRIPPER_BLOCK_POS} castShadow>
        <boxGeometry args={[0.22, 0.14, 0.14]} />
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* Gripper stub fingers, visible gap between them */}
      <mesh position={[-0.08, WRIST_POS[1], FINGER_Z]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.16]} />
        <meshStandardMaterial color="#111318" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.08, WRIST_POS[1], FINGER_Z]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.16]} />
        <meshStandardMaterial color="#111318" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}
