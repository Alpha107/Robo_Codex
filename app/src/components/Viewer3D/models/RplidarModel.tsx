import { headerPositions } from './parts';

const BASE_R = 0.45;
const BASE_H = 0.12;
const DRUM_R = 0.38;
const DRUM_H = 0.22;

export const RPLIDAR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['Motor+', 'Motor-', 'TX', 'RX', 'VCC', 'GND'],
  -0.25,
  0.25,
  -BASE_R - 0.05,
  0.28,
);

export default function RplidarModel() {
  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[BASE_R, BASE_R, BASE_H, 32]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} />
      </mesh>

      {/* Spinning drum */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[DRUM_R, DRUM_R, DRUM_H, 32]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.35} />
      </mesh>
      {/* Laser window slit */}
      <mesh position={[0, 0.05, DRUM_R - 0.01]} castShadow>
        <boxGeometry args={[0.1, DRUM_H - 0.04, 0.02]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.2} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.05 + DRUM_H / 2 + 0.01, 0]} castShadow>
        <cylinderGeometry args={[DRUM_R - 0.02, DRUM_R - 0.02, 0.02, 32]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cable connector at back of base */}
      <mesh position={[0, -0.15, -BASE_R - 0.03]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
