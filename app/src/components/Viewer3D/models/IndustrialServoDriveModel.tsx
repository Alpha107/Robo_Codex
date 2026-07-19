import { headerPositions, headerPositionsZ, Led } from './parts';

const ENC_W = 1.0;
const ENC_H = 1.6;
const ENC_D = 0.65;
const FRONT_Z = ENC_D / 2;
const RIGHT_X = ENC_W / 2;

const mainsPins = ['L1', 'L2', 'L3', 'PE'];
const brakePins = ['P', 'B'];
const cn1Pins = ['PULSE_IN', 'SERVO_ON', 'ALARM_OUT', 'BRAKE_OUT', 'STO1', 'STO2', 'ANALOG_CMD'];
const motorPins = ['MOTOR_U', 'MOTOR_V', 'MOTOR_W', 'MOTOR_PE'];

export const INDUSTRIAL_SERVO_DRIVE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(mainsPins, -0.42, 0.42, FRONT_Z + 0.05, 0.15),
  ...headerPositions(brakePins, -0.15, 0.15, FRONT_Z + 0.05, 0.35),
  ...headerPositions(cn1Pins, -0.4, 0.4, FRONT_Z + 0.05, 0.85),
  RS485: [-0.3, 1.1, FRONT_Z + 0.05],
  ...headerPositionsZ(motorPins, -0.15, 0.15, RIGHT_X + 0.02, 0.5),
  ENCODER: [0.62, 0.5, 0.28],
};

export default function IndustrialServoDriveModel() {
  return (
    <group>
      {/* Drive enclosure (metal case, not a bare PCB) */}
      <mesh position={[0, ENC_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[ENC_W, ENC_H, ENC_D]} />
        <meshStandardMaterial color="#3a3d42" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cooling vent ridges on top */}
      {[-0.3, -0.1, 0.1, 0.3].map((x) => (
        <mesh key={x} position={[x, ENC_H + 0.01, 0]} castShadow>
          <boxGeometry args={[0.06, 0.02, ENC_D - 0.1]} />
          <meshStandardMaterial color="#25272b" roughness={0.6} />
        </mesh>
      ))}

      {/* Status LED window */}
      <Led position={[0.35, 1.1, FRONT_Z + 0.005]} color="#39d353" size={[0.07, 0.05, 0.02]} />
      <Led position={[0.35, 1.0, FRONT_Z + 0.005]} color="#e8901f" size={[0.07, 0.05, 0.02]} />

      {/* Mains + PE screw terminal block */}
      <mesh position={[0, 0.15, FRONT_Z + 0.03]} castShadow>
        <boxGeometry args={[1.0, 0.16, 0.08]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Regen brake resistor terminal block */}
      <mesh position={[0, 0.35, FRONT_Z + 0.03]} castShadow>
        <boxGeometry args={[0.4, 0.12, 0.07]} />
        <meshStandardMaterial color="#c0392b" roughness={0.5} />
      </mesh>

      {/* CN1 control/I-O connector */}
      <mesh position={[0, 0.85, FRONT_Z + 0.03]} castShadow>
        <boxGeometry args={[0.95, 0.16, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* RS-485 tuning/comms connector */}
      <mesh position={[-0.3, 1.1, FRONT_Z + 0.02]} castShadow>
        <boxGeometry args={[0.16, 0.1, 0.06]} />
        <meshStandardMaterial color="#3d4148" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Motor phase + ground terminal block (right edge, cable to motor) */}
      <mesh position={[RIGHT_X + 0.01, 0.5, 0]} castShadow>
        <boxGeometry args={[0.05, 0.16, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>

      {/* Mounting bracket linking drive enclosure to motor */}
      <mesh position={[0.62, 0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.08]} />
        <meshStandardMaterial color="#4a4e55" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Encoder connector on the motor's cable end */}
      <mesh position={[0.62, 0.5, 0.28]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* AC servo motor body (cylindrical, matched-set component) */}
      <mesh position={[1.0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 24]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Motor cooling fins */}
      {[-0.15, -0.05, 0.05, 0.15].map((x) => (
        <mesh key={x} position={[1.0 + x, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.235, 0.235, 0.03, 24]} />
          <meshStandardMaterial color="#6b6f76" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
      {/* Output shaft */}
      <mesh position={[1.4, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}
