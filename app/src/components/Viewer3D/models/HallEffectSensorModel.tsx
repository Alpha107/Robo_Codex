import { headerPositions } from './parts';

const BODY_W = 0.16;
const BODY_H = 0.35;

export const HALL_EFFECT_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'OUT'],
  -0.05,
  0.05,
  0,
  -BODY_H / 2 - 0.1,
);

export default function HallEffectSensorModel() {
  return (
    <group>
      {/* TO-92 style transistor package */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[BODY_W / 1.8, BODY_W / 1.8, BODY_H, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} side={2} />
      </mesh>
      <mesh position={[-0.001, 0.05, 0]} castShadow>
        <boxGeometry args={[0.02, BODY_H, BODY_W]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* 3 legs */}
      {[-0.05, 0, 0.05].map((x) => (
        <mesh key={x} position={[x, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
