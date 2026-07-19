import { PcbBoard, headerPositions, headerPositionsZ, MetalCanModule, Led } from './parts';

const WIDTH = 1.7;
const DEPTH = 1.15;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const powerPins = ['VBUS+', 'VBUS-', 'BRAKE_RES'];
const phasePins = ['PHASE_U', 'PHASE_V', 'PHASE_W'];
const sensorPins = ['HALL_A', 'HALL_B', 'HALL_C', 'ENC_A', 'ENC_B', 'ENC_Z', 'SENSOR_5V', 'SENSOR_GND'];
const controlPins = ['CAN_H', 'CAN_L', 'STEP', 'DIR', 'ENABLE', 'TEMP_SENSE'];

const LEFT_X = -WIDTH / 2 + 0.08;
const RIGHT_X = WIDTH / 2 - 0.08;
const FRONT_Z = -DEPTH / 2 + 0.06;
const BACK_Z = DEPTH / 2 - 0.06;
const PIN_Y = TOP + 0.16;

export const FOC_BLDC_SERVO_DRIVER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(powerPins, -0.35, 0.35, LEFT_X, PIN_Y),
  ...headerPositionsZ(phasePins, -0.3, 0.3, RIGHT_X, PIN_Y),
  ...headerPositions(sensorPins, -0.7, 0.7, FRONT_Z, PIN_Y),
  ...headerPositions(controlPins, -0.5, 0.5, BACK_Z, PIN_Y),
};

export default function FocBldcServoDriverModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#161a30" />

      {/* Central heatsink block over the FET bridge */}
      <mesh position={[0, TOP + 0.13, 0.05]} castShadow>
        <boxGeometry args={[0.55, 0.26, 0.5]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.75} roughness={0.3} />
      </mesh>
      {/* Heatsink fins */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((z) => (
        <mesh key={z} position={[0, TOP + 0.27, 0.05 + z]} castShadow>
          <boxGeometry args={[0.5, 0.04, 0.04]} />
          <meshStandardMaterial color="#c3c8ce" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* Gate driver / current-sense modules flanking the heatsink */}
      <MetalCanModule position={[-0.42, TOP + 0.08, 0.15]} size={[0.22, 0.14, 0.18]} />
      <MetalCanModule position={[0.42, TOP + 0.08, 0.15]} size={[0.22, 0.14, 0.18]} />

      {/* Power / brake-resistor terminal block (left edge) */}
      <mesh position={[LEFT_X + 0.02, TOP + 0.07, 0]} castShadow>
        <boxGeometry args={[0.16, 0.14, 0.78]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Motor phase terminal block (right edge) */}
      <mesh position={[RIGHT_X - 0.02, TOP + 0.07, 0]} castShadow>
        <boxGeometry args={[0.16, 0.14, 0.66]} />
        <meshStandardMaterial color="#c0392b" roughness={0.5} />
      </mesh>

      {/* Hall/encoder sensor header housing (front edge) */}
      <mesh position={[0, TOP + 0.08, FRONT_Z]} castShadow>
        <boxGeometry args={[1.55, 0.12, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Control/CAN header housing (back edge) */}
      <mesh position={[-0.05, TOP + 0.08, BACK_Z]} castShadow>
        <boxGeometry args={[1.2, 0.12, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
      {/* CAN connector block, raised over its two pins */}
      <mesh position={[-0.42, TOP + 0.1, BACK_Z]} castShadow>
        <boxGeometry args={[0.3, 0.18, 0.2]} />
        <meshStandardMaterial color="#3d4148" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Status LED */}
      <Led position={[0.65, TOP + 0.04, -0.32]} color="#39d353" />
    </group>
  );
}
