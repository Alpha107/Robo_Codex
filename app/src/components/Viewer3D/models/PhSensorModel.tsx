import { PcbBoard, headerPositions } from './parts';

const BOARD_W = 0.4;
const BOARD_D = 0.3;
const BOARD_H = 0.05;
const TOP = BOARD_H / 2;

// Interface PCB sits on the left; the probe stands off to the right, connected by a wire —
// same "two parts, one model" pattern as a load-cell + amplifier board.
const PROBE_X = 0.55;
const PROBE_TOP_Y = 0.9;

export const PH_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['VCC', 'GND', 'PO'], -0.1, 0.1, -BOARD_D / 2 + 0.03, TOP + 0.02),
};

export default function PhSensorModel() {
  return (
    <group>
      {/* Interface board */}
      <group position={[-0.15, 0, 0]}>
        <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#1a6b47" />

        {/* BNC connector mount */}
        <mesh position={[0, TOP + 0.05, -0.08]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.1, 20]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, TOP + 0.1, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#111318" />
        </mesh>
      </group>

      {/* Thin connecting wire from the BNC mount to the probe base */}
      <mesh position={[0.15, 0.12, -0.08]} rotation={[0, 0, Math.PI / 2.4]}>
        <cylinderGeometry args={[0.012, 0.012, 0.65, 8]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.6} />
      </mesh>

      {/* Probe body — long thin rod */}
      <mesh position={[PROBE_X, PROBE_TOP_Y / 2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, PROBE_TOP_Y, 20]} />
        <meshStandardMaterial color="#e8eaee" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Probe cap at top */}
      <mesh position={[PROBE_X, PROBE_TOP_Y + 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.06, 20]} />
        <meshStandardMaterial color="#3a3f4a" roughness={0.5} />
      </mesh>

      {/* Glass bulb tip at the bottom of the probe */}
      <mesh position={[PROBE_X, 0.02, 0]} castShadow>
        <sphereGeometry args={[0.055, 20, 16]} />
        <meshStandardMaterial
          color="#cfe8ff"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}
