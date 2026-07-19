const BOARD_W = 0.5;
const BOARD_D = 0.5;
const BOARD_H = 0.04;
const TOP = BOARD_H / 2;

export const PI_CAMERA_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'CSI Connector': [0, TOP + 0.06, -BOARD_D / 2 - 0.1],
};

export default function PiCameraModuleModel() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BOARD_W, BOARD_H, BOARD_D]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.5} />
      </mesh>

      {/* Lens holder */}
      <mesh position={[0, TOP + 0.06, 0.05]} castShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.12, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      <mesh position={[0, TOP + 0.12, 0.05]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
        <meshStandardMaterial color="#0a1a2e" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Ribbon cable connector */}
      <mesh position={[0, TOP + 0.03, -BOARD_D / 2 - 0.08]} castShadow>
        <boxGeometry args={[0.32, 0.06, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>
      <mesh position={[0, TOP + 0.005, -BOARD_D / 2 - 0.2]} castShadow>
        <boxGeometry args={[0.28, 0.01, 0.25]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.6} />
      </mesh>

      {/* Corner mounting holes */}
      {[
        [BOARD_W / 2 - 0.05, BOARD_D / 2 - 0.05],
        [BOARD_W / 2 - 0.05, -(BOARD_D / 2 - 0.05)],
        [-(BOARD_W / 2 - 0.05), BOARD_D / 2 - 0.05],
        [-(BOARD_W / 2 - 0.05), -(BOARD_D / 2 - 0.05)],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, TOP + 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.03, 16]} />
          <meshStandardMaterial color="#0a0a0c" />
        </mesh>
      ))}
    </group>
  );
}
