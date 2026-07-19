import { headerPositions } from './parts';

const BASE_R = 0.5;
const BASE_H = 0.14;
const STACK_R = 0.4;
const STACK_H = 0.55;
const HEAD_R = 0.34;
const HEAD_H = 0.3;

const BASE_Y = -0.4;
const STACK_Y = BASE_Y + BASE_H / 2 + STACK_H / 2;
const HEAD_Y = STACK_Y + STACK_H / 2 + HEAD_H / 2 + 0.02;

export const LIDAR_3D_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['Power+', 'Power-/GND', 'Ethernet', 'GPS/PPS Sync'],
  -0.28,
  0.28,
  -BASE_R - 0.05,
  BASE_Y + 0.05,
);

export default function Lidar3dModel() {
  // Vertical column of small laser channel windows on the head — signals a
  // multi-channel stack rather than a single 2D scan slit.
  const channelYs = [-0.1, -0.04, 0.02, 0.08, 0.14];

  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, BASE_Y, 0]} castShadow>
        <cylinderGeometry args={[BASE_R, BASE_R, BASE_H, 32]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} />
      </mesh>

      {/* Stationary electronics stack (much taller than a 2D LiDAR's drum) */}
      <mesh position={[0, STACK_Y, 0]} castShadow>
        <cylinderGeometry args={[STACK_R, STACK_R * 1.05, STACK_H, 32]} />
        <meshStandardMaterial color="#2a2c30" roughness={0.45} metalness={0.2} />
      </mesh>
      {/* Cooling ridges on the stack */}
      {[STACK_Y - 0.15, STACK_Y, STACK_Y + 0.15].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[STACK_R + 0.015, STACK_R + 0.015, 0.03, 32]} />
          <meshStandardMaterial color="#111318" roughness={0.6} />
        </mesh>
      ))}

      {/* Spinning multi-channel head, tilted slightly to show a second scan plane */}
      <group position={[0, HEAD_Y, 0]} rotation={[0.09, 0, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[HEAD_R, HEAD_R, HEAD_H, 32]} />
          <meshStandardMaterial color="#e8e8ec" roughness={0.3} />
        </mesh>
        {/* Vertical stack of laser channel windows (front) */}
        {channelYs.map((y) => (
          <mesh key={y} position={[0, y, HEAD_R - 0.008]} castShadow>
            <boxGeometry args={[0.09, 0.025, 0.016]} />
            <meshStandardMaterial color="#0a0a0c" roughness={0.2} />
          </mesh>
        ))}
        {/* Top cap */}
        <mesh position={[0, HEAD_H / 2 + 0.012, 0]} castShadow>
          <cylinderGeometry args={[HEAD_R - 0.02, HEAD_R - 0.02, 0.024, 32]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Small dome on top hinting at additional upward-tilted channels */}
        <mesh position={[0, HEAD_H / 2 + 0.05, 0]} castShadow>
          <sphereGeometry args={[0.09, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3a3d44" roughness={0.35} metalness={0.3} />
        </mesh>
      </group>

      {/* Cable/interconnect bundle at back of base */}
      <mesh position={[0, BASE_Y, -BASE_R - 0.04]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.1]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Mounting holes on base */}
      {[
        [BASE_R - 0.08, BASE_R - 0.08],
        [BASE_R - 0.08, -(BASE_R - 0.08)],
        [-(BASE_R - 0.08), BASE_R - 0.08],
        [-(BASE_R - 0.08), -(BASE_R - 0.08)],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, BASE_Y + BASE_H / 2 + 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.025, 0.04, 16]} />
          <meshStandardMaterial color="#05050a" />
        </mesh>
      ))}
    </group>
  );
}
