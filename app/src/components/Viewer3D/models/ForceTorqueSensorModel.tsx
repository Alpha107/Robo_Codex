import { MountingHole } from './parts';

const FLANGE_RADIUS = 0.36;
const FLANGE_HEIGHT = 0.055;
const DRUM_RADIUS = 0.27;
const DRUM_HEIGHT = 0.3;
const HALF_DRUM = DRUM_HEIGHT / 2;
const TOP_FLANGE_Y = HALF_DRUM + FLANGE_HEIGHT / 2;
const BOTTOM_FLANGE_Y = -HALF_DRUM - FLANGE_HEIGHT / 2;
const BOLT_CIRCLE_R = 0.29;
const BOLT_COUNT = 6;

function boltCircle(radius: number, count: number): [number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius] as [number, number];
  });
}

const boltPositions = boltCircle(BOLT_CIRCLE_R, BOLT_COUNT);

// Connector nub protrudes radially from the drum housing.
const CONNECTOR_Z = DRUM_RADIUS + 0.07;
const CONNECTOR_FACE_Z = DRUM_RADIUS + 0.14;

export const FORCE_TORQUE_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'V+': [-0.06, 0.045, CONNECTOR_FACE_Z],
  'V-': [0, 0.045, CONNECTOR_FACE_Z],
  RS485_A: [0.06, 0.045, CONNECTOR_FACE_Z],
  RS485_B: [-0.06, -0.045, CONNECTOR_FACE_Z],
  SYNC: [0, -0.045, CONNECTOR_FACE_Z],
  SHIELD: [0.06, -0.045, CONNECTOR_FACE_Z],
};

export default function ForceTorqueSensorModel() {
  return (
    <group>
      {/* Top flange (tool-side) */}
      <mesh position={[0, TOP_FLANGE_Y, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[FLANGE_RADIUS, FLANGE_RADIUS, FLANGE_HEIGHT, 32]} />
        <meshStandardMaterial color="#b8bcc2" metalness={0.75} roughness={0.3} />
      </mesh>
      {boltPositions.map(([x, z], i) => (
        <MountingHole key={`top-${i}`} position={[x, TOP_FLANGE_Y + FLANGE_HEIGHT / 2 + 0.001, z]} radius={0.028} />
      ))}

      {/* Bottom flange (robot-wrist-side) */}
      <mesh position={[0, BOTTOM_FLANGE_Y, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[FLANGE_RADIUS, FLANGE_RADIUS, FLANGE_HEIGHT, 32]} />
        <meshStandardMaterial color="#b8bcc2" metalness={0.75} roughness={0.3} />
      </mesh>
      {boltPositions.map(([x, z], i) => (
        <MountingHole key={`bot-${i}`} position={[x, BOTTOM_FLANGE_Y - FLANGE_HEIGHT / 2 - 0.001, z]} radius={0.028} />
      ))}

      {/* Central drum housing the strain-gauge structure */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[DRUM_RADIUS, DRUM_RADIUS, DRUM_HEIGHT, 32]} />
        <meshStandardMaterial color="#3a4046" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Thin decorative rib line around the drum */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[DRUM_RADIUS + 0.002, DRUM_RADIUS + 0.002, 0.02, 32]} />
        <meshStandardMaterial color="#20242a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Connector nub */}
      <mesh position={[0, 0, CONNECTOR_Z]} castShadow>
        <boxGeometry args={[0.2, 0.14, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, CONNECTOR_FACE_Z - 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 20]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
