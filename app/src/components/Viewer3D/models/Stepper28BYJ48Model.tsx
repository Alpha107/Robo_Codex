import { headerPositions } from './parts';

const MOTOR_R = 0.35;
const MOTOR_LEN = 0.4;

const driverPins = ['IN1', 'IN2', 'IN3', 'IN4', 'Driver VCC', 'Driver GND'];
const DRIVER_X = 0.75;
const DRIVER_Z = 0.28;

export const STEPPER_28BYJ48_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  driverPins,
  DRIVER_X - 0.35,
  DRIVER_X + 0.35,
  DRIVER_Z + 0.03,
  0.13,
);

export default function Stepper28BYJ48Model() {
  return (
    <group>
      {/* Motor body cylinder */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[MOTOR_R, MOTOR_R, MOTOR_LEN, 24]} />
        <meshStandardMaterial color="#3a4046" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* White front cap with shaft */}
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[MOTOR_R - 0.05, MOTOR_R - 0.05, 0.06, 24]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.5} />
      </mesh>
      <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.2, 12]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ULN2003 driver board */}
      <mesh position={[DRIVER_X, -0.05, 0]} castShadow>
        <boxGeometry args={[0.7, 0.03, 0.55]} />
        <meshStandardMaterial color="#1560bd" roughness={0.5} />
      </mesh>
      <mesh position={[DRIVER_X, -0.01, -0.05]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.15]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>
      <mesh position={[DRIVER_X, -0.01, DRIVER_Z]} castShadow>
        <boxGeometry args={[0.55, 0.05, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
